import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Gallery } from "@/components/Gallery";
import { gallery } from "@/data/content";

export const metadata: Metadata = { title: "Gallery", description: "Photography." };

export default function GalleryPage() {
  return <div>
    <PageHeader title="gallery" issue="issue no.01 · things worth keeping" />
    <Gallery images={gallery} />
  </div>;
}
