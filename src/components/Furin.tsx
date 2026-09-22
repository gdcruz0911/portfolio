"use client";

import { useRef } from "react";

// A glass wind chime that sways on its own and swings harder when clicked.
export function Furin() {
  const chime = useRef<HTMLButtonElement>(null);
  function ring() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    chime.current?.querySelector("svg")?.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(14deg)" }, { transform: "rotate(-10deg)" }, { transform: "rotate(5deg)" }, { transform: "rotate(0)" }],
      { duration: 1400, easing: "ease-out" },
    );
  }
  return <button ref={chime} type="button" className="furin" aria-label="ring the wind chime" onClick={ring}>
    <svg viewBox="0 0 120 260" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: "50% 0" }}>
      <path d="M60 0 V22" />
      <circle cx="60" cy="24" r="3" />
      <path d="M28 74 C 26 40, 40 27, 60 27 C 80 27, 94 40, 92 74" />
      <path d="M26 74 C 40 79, 80 79, 94 74" />
      <path d="M36 52 q 6 -6 12 0 t 12 0 t 12 0 t 12 0" />
      <path d="M40 63 q 5 -4 10 0 t 10 0 t 10 0 t 10 0" opacity=".6" />
      <g className="tanzaku">
        <path d="M60 27 V150" />
        <circle cx="60" cy="86" r="4" fill="currentColor" />
        <rect x="47" y="150" width="26" height="88" rx="2" />
        <path d="M53 168 h14 M53 178 h9" opacity=".5" />
      </g>
    </svg>
  </button>;
}
