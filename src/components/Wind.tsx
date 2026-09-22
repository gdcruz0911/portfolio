"use client";

import { usePathname } from "next/navigation";

// Faint wind strokes and a few leaves drifting behind the inner pages. Home has the furin instead.
const GUSTS = [
  { top: "18%", duration: 48, delay: -10 },
  { top: "46%", duration: 62, delay: -38 },
  { top: "74%", duration: 55, delay: -22 },
];
const LEAVES = [
  { top: "24%", duration: 38, delay: -6 },
  { top: "58%", duration: 52, delay: -30 },
  { top: "80%", duration: 44, delay: -18 },
];

export function Wind() {
  if (usePathname() === "/") return null;
  return <div className="wind" aria-hidden>
    {GUSTS.map((gust) => <svg key={gust.top} viewBox="0 0 420 60" style={{ top: gust.top, animationDuration: `${gust.duration}s`, animationDelay: `${gust.delay}s` }}>
      <path d="M4 40 C 90 30, 170 44, 250 32 S 350 18, 372 30 C 392 42, 378 60, 362 50 C 350 42, 362 30, 374 34" />
      <path d="M60 52 C 130 46, 200 54, 280 46" />
    </svg>)}
    {LEAVES.map((leaf) => <span key={leaf.top} className="leaf" style={{ top: leaf.top, animationDuration: `${leaf.duration}s`, animationDelay: `${leaf.delay}s` }}>
      <svg viewBox="0 0 24 14"><path d="M1 7 C 6 0, 17 0, 23 7 C 17 14, 6 14, 1 7 Z M3 7 H 20" /></svg>
    </span>)}
  </div>;
}
