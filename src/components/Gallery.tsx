import Image from "next/image";
import type { GalleryImage } from "@/data/content";

// Where each print lands on the strip: tilt (deg), vertical offset (vh), height (vh).
// Small heights keep the two low-res photos sharp.
const SCATTER = [
  { tilt: -3, y: 6, h: 54 },
  { tilt: 2.5, y: -7, h: 50 },
  { tilt: -1.5, y: 10, h: 38 },
  { tilt: 3, y: -3, h: 56 },
  { tilt: -2.5, y: 9, h: 34 },
  { tilt: 1.5, y: -6, h: 52 },
];

export function Gallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) return <p className="py-16">photos coming soon.</p>;
  return <section className="drift">
    <div className="drift-view" role="region" aria-label="photographs, scroll sideways" tabIndex={0}>
      <ul className="drift-track">
        {images.map((image, index) => {
          const spot = SCATTER[index % SCATTER.length];
          return <li key={image.src} className="print" style={{ "--tilt": `${spot.tilt}deg`, "--y": `${spot.y}vh`, "--h": `${spot.h}vh`, "--delay": `${index * -1.3}s` } as React.CSSProperties}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 60vw, 30vw" priority={index === 0} />
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
