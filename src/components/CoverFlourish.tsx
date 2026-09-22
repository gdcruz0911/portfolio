"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CoverFlourish() {
  const [bloom, setBloom] = useState(false);
  const reduced = useReducedMotion();
  return <button className="cover-flourish" type="button" aria-label="bloom the ink flower" aria-pressed={bloom} onClick={() => setBloom(!bloom)}>
    <motion.svg viewBox="0 0 240 240" aria-hidden="true" initial={false} animate={{ rotate: reduced ? 0 : bloom ? 35 : 0 }} transition={{ duration: reduced ? 0 : .65 }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {[0, 60, 120, 180, 240, 300].map((angle) => <motion.ellipse key={angle} cx="120" cy="79" rx={bloom ? 22 : 12} ry="43" transform={`rotate(${angle} 120 120)`} initial={false} animate={{ opacity: bloom ? 1 : .7 }} transition={{ duration: reduced ? 0 : .3 }} />)}
        <circle cx="120" cy="120" r="6" fill="currentColor" />
        <path d="M120 127 Q152 182 109 217 M137 172 Q184 155 161 190 Q144 193 137 172 M127 193 Q85 163 99 201 Q113 207 127 193" />
      </g>
      {bloom && <g fill="currentColor"><circle cx="40" cy="65" r="3"/><circle cx="191" cy="47" r="3"/><path d="m192 137 3 10 10 3-10 3-3 10-3-10-10-3 10-3z" /></g>}
    </motion.svg>
    <span className="signature">{bloom ? "a little more alive" : "a little room to bloom"}</span>
  </button>;
}

export function CoverReveal({ children }: { children: ReactNode }) {
  const cover = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("cover-seen")) return;
      sessionStorage.setItem("cover-seen", "true");
    } catch { /* The reveal still works when session storage is unavailable. */ }
    const animations = Array.from(cover.current?.children ?? []).map((element) =>
      element.animate([{ opacity: .3, translate: "0 16px" }, { opacity: 1, translate: "0 0" }], { duration: 850, easing: "ease-out" }));
    return () => animations.forEach((animation) => animation.cancel());
  }, []);
  return <div ref={cover} className="cover-layout">{children}</div>;
}
