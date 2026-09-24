"""Build the hero signature's outline and pen strokes for the handwriting intro.

The browser draws "gabriel" in Caveat; this recreates those exact glyphs as one SVG
outline, then traces a centerline through each letter so a mask can "write" it.

    python scripts/signature-path.py <caveat.woff2> > src/data/signature.json

Needs numpy, scikit-image, fonttools, brotli and uharfbuzz (a throwaway venv is fine).
Rerun it if the signature changes, e.g. when a hand-drawn SVG replaces Caveat.
"""
import json
import sys

import numpy as np
import uharfbuzz as hb
from fontTools.pens.basePen import BasePen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from scipy.ndimage import distance_transform_edt, label
from skimage.draw import polygon as fill_polygon
from skimage.measure import approximate_polygon
from skimage.morphology import skeletonize

TEXT, WEIGHT, SCALE = "gabriel", 400, 1.0  # SCALE: raster pixels per font unit


class FlattenPen(BasePen):
    """Collects each contour as a list of points, sampling curves."""

    def __init__(self, glyphset):
        super().__init__(glyphset)
        self.contours, self.cur = [], []

    def _moveTo(self, p):
        self.cur = [p]

    def _lineTo(self, p):
        self.cur.append(p)

    def _curveToOne(self, a, b, c):
        p0 = self.cur[-1]
        for t in np.linspace(0, 1, 12)[1:]:
            self.cur.append(tuple((1 - t) ** 3 * np.array(p0) + 3 * (1 - t) ** 2 * t * np.array(a) + 3 * (1 - t) * t ** 2 * np.array(b) + t ** 3 * np.array(c)))

    def _qCurveToOne(self, a, b):
        p0 = self.cur[-1]
        for t in np.linspace(0, 1, 10)[1:]:
            self.cur.append(tuple((1 - t) ** 2 * np.array(p0) + 2 * (1 - t) * t * np.array(a) + t ** 2 * np.array(b)))

    def _closePath(self):
        self.contours.append(self.cur)
        self.cur = []

    _endPath = _closePath


def main(font_path):
    font = instantiateVariableFont(TTFont(font_path), {"wght": WEIGHT}) if "fvar" in TTFont(font_path) else TTFont(font_path)
    font.flavor = None  # HarfBuzz reads plain TrueType, not WOFF2
    font.save("/tmp/_signature.ttf")
    blob = hb.Blob.from_file_path("/tmp/_signature.ttf")
    hb_font = hb.Font(hb.Face(blob))
    buf = hb.Buffer()
    buf.add_str(TEXT)
    buf.guess_segment_properties()
    hb.shape(hb_font, buf, {"calt": True, "liga": True, "kern": True})

    glyph_order, glyphset = font.getGlyphOrder(), font.getGlyphSet()
    ascent, descent = font["hhea"].ascent, font["hhea"].descent
    upm = font["head"].unitsPerEm
    height = ascent - descent

    outline_pen = SVGPathPen(glyphset)
    glyphs, x = [], 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = glyph_order[info.codepoint]
        # Font units are y-up; SVG is y-down with the top of the line box at 0.
        transform = (1, 0, 0, -1, x + pos.x_offset, ascent - pos.y_offset)
        glyphset[name].draw(TransformPen(outline_pen, transform))
        flat = FlattenPen(glyphset)
        glyphset[name].draw(TransformPen(flat, transform))
        glyphs.append(flat.contours)
        x += pos.x_advance
    width = x

    points = np.array([p for contours in glyphs for contour in contours for p in contour])
    left, top = np.floor(points.min(axis=0) - 20)
    right, bottom = np.ceil(points.max(axis=0) + 20)
    left, top = min(left, 0), min(top, 0)
    right, bottom = max(right, width), max(bottom, height)

    # Rasterize with the nonzero rule so overlapping contours stay filled.
    # The canvas spans the ink, which can lean past the last letter's advance.
    w, h = int(right * SCALE) + 4, int(bottom * SCALE) + 4
    strokes, pen_width = [], 0
    for contours in glyphs:
        winding = np.zeros((h, w), int)
        for contour in contours:
            pts = np.array(contour) * SCALE
            area = np.sum(pts[:-1, 0] * pts[1:, 1] - pts[1:, 0] * pts[:-1, 1])
            rr, cc = fill_polygon(pts[:, 1], pts[:, 0], (h, w))
            winding[rr, cc] += 1 if area > 0 else -1
        ink = winding != 0
        if not ink.any():
            continue
        # Stroke thickness ~ twice the largest distance from ink to its edge.
        pen_width = max(pen_width, 2.2 * distance_transform_edt(ink).max() / SCALE)
        skeleton = skeletonize(ink)
        parts, count = label(skeleton, structure=np.ones((3, 3)))
        letter = [line for part in range(1, count + 1) for line in trace(parts == part)]
        # Within a letter: the body top-down first; dots and junction scraps last.
        letter.sort(key=lambda line: (line["length"] < 60 / SCALE, line["top"]))
        strokes += letter
    out = {
        "viewBox": f"{left:.0f} {top:.0f} {right - left:.0f} {bottom - top:.0f}",
        "leftEm": round(left / upm, 4),
        "topEm": round(top / upm, 4),
        "widthEm": round((right - left) / upm, 4),
        "heightEm": round((bottom - top) / upm, 4),
        "outline": outline_pen.getCommands(),
        "penWidth": round(pen_width),
        "strokes": [{"d": s["d"], "length": s["length"]} for s in strokes if s["length"] > 8 / SCALE],
    }
    json.dump(out, sys.stdout, indent=1)


def trace(skeleton):
    """Walks a skeleton from its top-left end, splitting into polylines at dead ends."""
    pts = {tuple(p) for p in np.argwhere(skeleton)}
    near = lambda p: [(p[0] + dy, p[1] + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if (dy or dx) and (p[0] + dy, p[1] + dx) in pts]
    ends = [p for p in pts if len(near(p)) == 1] or list(pts)
    start = min(ends, key=lambda p: p[0] + p[1])  # writing starts near the top-left
    seen, lines, stack = set(), [], [(start, None)]
    line = []
    while stack:
        p, parent = stack.pop()
        if p in seen:
            continue
        if line and parent != line[-1]:
            lines.append(line)
            line = [parent] if parent else []
        seen.add(p)
        line.append(p)
        nxt = [q for q in near(p) if q not in seen]
        # Continue straight-ish first: push the best continuation last.
        stack += [(q, p) for q in nxt]
    if line:
        lines.append(line)
    result = []
    for line in lines:
        if len(line) < 2:
            continue
        simple = approximate_polygon(np.array(line, float), tolerance=1.0) / SCALE
        if simple[0][0] > simple[-1][0]:
            simple = simple[::-1]  # pens move downward: start each stroke at its top end
        d = "M" + " L".join(f"{c:.0f} {r:.0f}" for r, c in simple)
        length = float(np.sum(np.hypot(*np.diff(simple, axis=0).T)))
        result.append({"d": d, "length": round(length), "top": float(simple[:, 0].min())})
    return result


if __name__ == "__main__":
    main(sys.argv[1])
