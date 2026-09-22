"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/content";

export function ProjectCard({ project }: { project: Project }) {
  const [failedVideo, setFailedVideo] = useState<string | null>(null);
  return (
    <article className="project-feature space-y-4">
      {project.preview && <Image className="project-screenshot" src={project.preview.src} alt={`${project.title} homepage preview`} width={project.preview.width} height={project.preview.height} sizes="(max-width: 760px) 90vw, 920px" />}
      <h2 className="display-type text-4xl">{project.title}</h2>
      <p className="leading-relaxed">{project.description}</p>
      <ul className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      {project.walkthrough && <div data-no-sparks>
        <p className="text-sm">watch walkthrough</p>
        {failedVideo === project.walkthrough ? <p role="status">the recording couldn&rsquo;t load. <a className="underline" href={project.walkthrough}>open the video directly</a></p> : <video key={project.walkthrough} className="project-video" src={project.walkthrough} controls playsInline preload="none" poster={project.poster} aria-label={`${project.title} walkthrough`} onError={() => setFailedVideo(project.walkthrough!)}>your browser doesn&rsquo;t support this video.</video>}
      </div>}
      <div className="flex flex-wrap gap-6">
        {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer noopener">visit live site →</a>}
        {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer noopener">source code →</a>}
      </div>
    </article>
  );
}
