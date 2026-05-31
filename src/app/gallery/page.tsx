import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Gallery } from "@/components/Gallery";
import { gallery } from "@/data/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photography.",
};

const ACCENT = "#A8D5B5"; // muted mint

export default function GalleryPage() {
  return (
    <div
      className="pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <PageHeader eyebrow="Photography" title="Gallery" accent={ACCENT}>
        A scrapbook of frames from cafés, campus, and wherever else I&rsquo;ve
        been pointing a camera lately.
      </PageHeader>

      <Gallery images={gallery} />
    </div>
  );
}
