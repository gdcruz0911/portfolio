"use client";

import { useEffect } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

// Little ink ticks burst from every pointer click. Elements marked
// data-sparks="gold" get a bigger gold burst; data-no-sparks opts out.
export function Sparks() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    function burst(event: MouseEvent) {
      const target = event.target as Element;
      if (event.detail === 0 || reduced.matches || target.closest("[data-no-sparks]")) return;
      const gold = !!target.closest('[data-sparks="gold"]');
      const spark = document.createElementNS(SVG_NS, "svg");
      spark.setAttribute("class", gold ? "spark is-gold" : "spark");
      spark.setAttribute("viewBox", "-20 -20 40 40");
      spark.setAttribute("aria-hidden", "true");
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      const rays = gold ? 10 : 7;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + Math.random() * .4;
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", `${Math.cos(angle) * 7}`);
        line.setAttribute("y1", `${Math.sin(angle) * 7}`);
        line.setAttribute("x2", `${Math.cos(angle) * 12}`);
        line.setAttribute("y2", `${Math.sin(angle) * 12}`);
        spark.append(line);
      }
      document.body.append(spark);
      spark.animate([{ opacity: 1, transform: "scale(.6)" }, { opacity: 0, transform: "scale(1.4)" }], { duration: 550, easing: "ease-out" }).onfinish = () => spark.remove();
    }
    document.addEventListener("click", burst);
    return () => document.removeEventListener("click", burst);
  }, []);
  return null;
}
