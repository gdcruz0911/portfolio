"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/data/content";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight")
        setActiveIdx((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActiveIdx((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, images.length]);

  if (images.length === 0) {
    return (
      <div className="border-t border-[var(--border)] py-24 text-center">
        <p className="text-[var(--muted)]">
          Photos coming soon. Check back later.
        </p>
      </div>
    );
  }

  const active = activeIdx !== null ? images[activeIdx] : null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="group break-inside-avoid mb-4 last:mb-0"
          >
            <button
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`Open ${img.alt}`}
              className="relative block w-full overflow-hidden bg-[var(--border)]/30 cursor-zoom-in"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </button>
            {(img.tags?.length || img.caption) && (
              <figcaption className="mt-2 ml-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] sm:opacity-70 sm:group-hover:opacity-100 transition-opacity">
                {img.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
                {img.caption && (
                  <span className="normal-case tracking-normal text-xs italic">
                    {img.caption}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActiveIdx(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActiveIdx(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white text-sm"
            >
              Close ✕
            </button>
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>
            {active.caption && (
              <p className="absolute bottom-5 inset-x-0 text-center text-sm text-white/80">
                {active.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
