"use client";

import { useRef } from "react";

// Four looping blades turning slowly in the breeze; a click gives it a big spin.
const BLADE = "M80 80 C 72 56, 76 26, 96 20 C 114 15, 116 42, 98 47 C 88 50, 84 41, 91 37";

export function Pinwheel() {
  const head = useRef<SVGGElement>(null);
  function spin() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    head.current?.animate([{ transform: "rotate(0)" }, { transform: "rotate(1080deg)" }], { duration: 2200, easing: "cubic-bezier(.2, .7, .3, 1)" });
  }
  return <button type="button" className="pinwheel" aria-label="spin the pinwheel" data-sparks="gold" onClick={spin}>
    <svg viewBox="0 0 160 230" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M80 86 C 82 140, 78 180, 84 226" />
      <g ref={head} className="pinwheel-head">
        <g className="pinwheel-blades">
          {[0, 90, 180, 270].map((angle) => <path key={angle} d={BLADE} transform={`rotate(${angle} 80 80)`} />)}
          <circle cx="80" cy="80" r="3.5" fill="currentColor" />
        </g>
      </g>
      <path d="M22 34 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="currentColor" stroke="none" />
      <path d="M140 118 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="currentColor" stroke="none" />
      <circle cx="136" cy="30" r="2" fill="currentColor" stroke="none" />
      <circle cx="144" cy="38" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="24" cy="132" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  </button>;
}
