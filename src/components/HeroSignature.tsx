import signature from "@/data/signature.json";

// "gabriel" in the exact Caveat glyphs, revealed by a pen-shaped mask so it can be
// written stroke by stroke during the intro. Outside the intro the mask is fully drawn.
// Regenerate the data with scripts/signature-path.py.
const WRITE_MS = 1500;
const LIFT_MS = 40; // a pause between strokes, as a pen lifts
const START_MS = 150;

const total = signature.strokes.reduce((sum, stroke) => sum + stroke.length, 0);
const pace = (WRITE_MS - LIFT_MS * signature.strokes.length) / total;
let at = START_MS;
const timed = signature.strokes.map((stroke) => {
  const dur = stroke.length * pace;
  const timing = { d: stroke.d, delay: at, dur };
  at += dur + LIFT_MS;
  return timing;
});
export const SIGNATURE_WRITTEN_MS = Math.round(at);

export function HeroSignature() {
  const [x, y, w, h] = signature.viewBox.split(" ").map(Number);
  return <h1 className="signature hero-signature">
    <span className="sr-only">gabriel</span>
    <svg viewBox={signature.viewBox} aria-hidden style={{ width: `${signature.widthEm}em`, height: `${signature.heightEm}em` }}>
      <defs>
        <mask id="signature-ink" maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
          <g fill="none" stroke="#fff" strokeWidth={signature.penWidth * 1.6} strokeLinecap="round" strokeLinejoin="round">
            {timed.map((stroke) => <path key={stroke.d} className="pen" pathLength={1} d={stroke.d} style={{ animationDelay: `${stroke.delay}ms`, animationDuration: `${stroke.dur}ms` }} />)}
          </g>
          {/* Settles the word so any sliver the pen missed is filled once writing ends. */}
          <rect className="settle" x={x} y={y} width={w} height={h} fill="#fff" style={{ animationDelay: `${SIGNATURE_WRITTEN_MS}ms` }} />
        </mask>
      </defs>
      <path d={signature.outline} fill="currentColor" mask="url(#signature-ink)" />
    </svg>
  </h1>;
}
