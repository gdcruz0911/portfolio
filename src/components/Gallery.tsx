"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/data/content";

// Where each print lands on the strip: tilt (deg), vertical offset (vh), height (vh).
// Small heights keep the two low-res photos sharp.
const SCATTER = [
  { tilt: -3, y: 4, h: 50 },
  { tilt: 2.5, y: -8, h: 46 },
  { tilt: -1.5, y: 8, h: 36 },
  { tilt: 3, y: -4, h: 52 },
  { tilt: -2.5, y: 7, h: 32 },
  { tilt: 1.5, y: -7, h: 48 },
];

// Scrolling down drifts the strip sideways. The offset eases toward the scroll
// position every frame, so wheel steps glide instead of jumping.
function useDrift() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const box = section.current, strip = track.current;
    if (!box || !strip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let overflow = 0, current = 0, frame = 0;
    const measure = () => {
      overflow = Math.max(0, strip.scrollWidth - window.innerWidth);
      box.style.height = `${overflow + window.innerHeight}px`;
    };
    const target = () => {
      const scrolled = -box.getBoundingClientRect().top;
      return Math.min(Math.max(scrolled, 0), overflow);
    };
    const tick = () => {
      const goal = target();
      current += (goal - current) * .12;
      if (Math.abs(goal - current) < .3) current = goal;
      strip.style.transform = `translate3d(${-current}px, 0, 0)`;
      frame = current === goal ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const resize = () => { measure(); wake(); };
    box.dataset.drift = "on";
    measure();
    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", resize);
      delete box.dataset.drift;
      box.style.height = strip.style.transform = "";
    };
  }, []);
  return { section, track };
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const { section, track } = useDrift();
  if (!images.length) return <p className="py-16">photos coming soon.</p>;
  return <section ref={section} className="drift">
    <div className="drift-view" role="region" aria-label="photographs, scroll sideways" tabIndex={0}>
      <ul ref={track} className="drift-track">
        {images.map((image, index) => {
          const spot = SCATTER[index % SCATTER.length];
          return <li key={image.src} className="print" style={{ "--tilt": `${spot.tilt}deg`, "--y": `${spot.y}vh`, "--h": `${spot.h}vh`, "--delay": `${index * -1.3}s` } as React.CSSProperties}>
            <figure>
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 60vw, 30vw" priority={index === 0} />
              <figcaption className="mono"><b>No.{String(index + 1).padStart(2, "0")}</b> {image.caption}</figcaption>
            </figure>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
