import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Gallery } from "@/components/Gallery";
import { gallery } from "@/data/content";

export const metadata: Metadata = { title: "Gallery", description: "Photography." };

export default function GalleryPage() {
  return <div>
    <PageHeader eyebrow="a visual anthology" title="collected moments.">a few things that made me stop and look.</PageHeader>
    <Gallery images={gallery} />
  </div>;
}
