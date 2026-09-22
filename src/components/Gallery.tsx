"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/data/content";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
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

  const active = activeIdx === null ? null : images[activeIdx];
  if (!images.length) return <p className="py-16">photos coming soon.</p>;

  return <section className="photo-archive" aria-label="photo gallery">
    <div className="gallery-controls">
      <span>{images.length} photographs</span>
    </div>
    <div className="anthology-grid" aria-label="photographs">
      {images.map((image, index) => <button key={image.src} type="button" className="photo-print" onClick={() => setActiveIdx(index)} aria-label={`open photo ${index + 1}: ${image.alt}`}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 32vw" priority={index === 0} />
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
