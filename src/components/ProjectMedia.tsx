import Image from "next/image";
import type { Project } from "@/data/content";

// One media slot per project: the screenshot.
export function ProjectMedia({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  if (project.preview) return <Image className={className} src={project.preview.src} alt={`${project.title} preview`} width={project.preview.width} height={project.preview.height} sizes={sizes} />;
  return null;
}
