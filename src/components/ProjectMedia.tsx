"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/content";

// One media slot per project: a silent looping clip when there is one, otherwise the screenshot.
export function ProjectMedia({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const clip = video.current;
    if (!clip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) clip.play().catch(() => {});
      else clip.pause();
    });
    observer.observe(clip);
    return () => observer.disconnect();
  }, []);

  if (project.video) return <video ref={video} className={className} src={project.video} poster={project.poster ?? project.preview?.src} muted loop playsInline preload="metadata" aria-label={`${project.title} preview`} data-no-sparks />;
  if (project.preview) return <Image className={className} src={project.preview.src} alt={`${project.title} preview`} width={project.preview.width} height={project.preview.height} sizes={sizes} />;
  return null;
}
