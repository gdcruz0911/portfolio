"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { GalleryImage } from "@/data/content";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const viewerOpen = activeIdx !== null;

  useEffect(() => {
    if (!viewerOpen) return;
    const viewer = dialog.current;
    const previousOverflow = document.body.style.overflow;
    viewer?.showModal();
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActiveIdx((index) => index === null ? null : (index + direction + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      viewer?.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerOpen, images.length]);

  function browse(direction: number) {
    const strip = rail.current;
    if (!strip) return;
    const cards = Array.from(strip.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - strip.scrollLeft) < Math.abs(cards[best].offsetLeft - strip.scrollLeft) ? index : best, 0);
    const next = Math.max(0, Math.min(cards.length - 1, nearest + direction));
    strip.scrollTo({ left: cards[next].offsetLeft, behavior: reduceMotion ? "instant" : "smooth" });
  }

  const active = activeIdx === null ? null : images[activeIdx];
  if (!images.length) return <p className="py-16">photos coming soon.</p>;

  return <section className="photo-archive" aria-label="photo gallery">
    <div className="gallery-controls">
      <span>{images.length} photographs</span>
      <div>
        <button type="button" onClick={() => browse(-1)} aria-label="previous photos">←</button>
        <button type="button" onClick={() => browse(1)} aria-label="next photos">→</button>
      </div>
    </div>
    <div ref={rail} className="photo-strip" aria-label="photographs">
      {images.map((image, index) => <button key={image.src} type="button" className="photo-print" onClick={() => setActiveIdx(index)} aria-label={`open photo ${index + 1}: ${image.alt}`}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 75vw, 350px" priority={index === 0} />
      </button>)}
    </div>
    <dialog ref={dialog} className="gallery-dialog" aria-label="photo viewer" onCancel={() => setActiveIdx(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveIdx(null); }}>
      {active && <div className="photo-viewer">
        <div className="viewer-controls">
          <button type="button" onClick={() => setActiveIdx(null)}>close</button>
          <span aria-live="polite">{activeIdx! + 1} / {images.length}</span>
          <button type="button" aria-label="previous photo" onClick={() => setActiveIdx((activeIdx! - 1 + images.length) % images.length)}>←</button>
          <button type="button" aria-label="next photo" onClick={() => setActiveIdx((activeIdx! + 1) % images.length)}>→</button>
        </div>
        <Image src={active.src} alt={active.alt} width={active.width} height={active.height} sizes="90vw" className="viewer-image" />
      </div>}
    </dialog>
  </section>;
}
