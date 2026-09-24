"use client";

import { useRef } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";
// When the swing turns, the clapper strikes the glass rim: right, left, then right again, softer each time.
const STRIKES = [{ at: 300, x: 93, side: 1, size: 1 }, { at: 650, x: 27, side: -1, size: .8 }, { at: 1000, x: 93, side: 1, size: .55 }];

// A tiny glint of rays bursting outward from the rim, drawn inside the bell so it swings with it.
function glint(svg: SVGSVGElement, x: number, side: number, size: number) {
  const burst = document.createElementNS(SVG_NS, "g");
  burst.setAttribute("class", "glint");
  for (const angle of [-50, -15, 20, 55]) {
    const rad = ((side > 0 ? angle : 180 - angle) * Math.PI) / 180;
    const ray = document.createElementNS(SVG_NS, "line");
    ray.setAttribute("x1", `${Math.cos(rad) * 5}`);
    ray.setAttribute("y1", `${Math.sin(rad) * 5}`);
    ray.setAttribute("x2", `${Math.cos(rad) * 15}`);
    ray.setAttribute("y2", `${Math.sin(rad) * 15}`);
    burst.append(ray);
  }
  svg.append(burst);
  burst.animate(
    [{ opacity: 1, transform: `translate(${x}px, 72px) scale(${.4 * size})` }, { opacity: 0, transform: `translate(${x}px, 72px) scale(${1.3 * size})` }],
    { duration: 450, easing: "ease-out" },
  ).onfinish = () => burst.remove();
}

// A glass wind chime that sways on its own and swings harder when clicked.
export function Furin() {
  const chime = useRef<HTMLButtonElement>(null);
  function ring() {
    const svg = chime.current?.querySelector("svg");
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    svg.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(14deg)" }, { transform: "rotate(-10deg)" }, { transform: "rotate(5deg)" }, { transform: "rotate(0)" }],
      { duration: 1400, easing: "ease-out" },
    );
    for (const strike of STRIKES) setTimeout(() => glint(svg, strike.x, strike.side, strike.size), strike.at);
  }
  return <button ref={chime} type="button" className="furin" aria-label="ring the wind chime" onClick={ring}>
    <svg viewBox="0 0 120 260" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: "50% 0" }}>
      <path pathLength={1} d="M60 0 V22" />
      <circle pathLength={1} cx="60" cy="24" r="3" />
      <path pathLength={1} d="M28 74 C 26 40, 40 27, 60 27 C 80 27, 94 40, 92 74" />
      <path pathLength={1} d="M26 74 C 40 79, 80 79, 94 74" />
      <path pathLength={1} d="M36 52 q 6 -6 12 0 t 12 0 t 12 0 t 12 0" />
      <path pathLength={1} d="M40 63 q 5 -4 10 0 t 10 0 t 10 0 t 10 0" opacity=".6" />
      <g className="tanzaku">
        <path pathLength={1} d="M60 27 V150" />
        <circle pathLength={1} cx="60" cy="86" r="4" fill="currentColor" />
        <rect pathLength={1} x="47" y="150" width="26" height="88" rx="2" />
        <path pathLength={1} d="M53 168 h14 M53 178 h9" opacity=".5" />
      </g>
    </svg>
  </button>;
}
