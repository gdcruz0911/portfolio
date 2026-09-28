import { ProjectMedia } from "@/components/ProjectMedia";
import { projectSlug, type Project } from "@/data/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={projectSlug(project)} className="project-feature">
      <ProjectMedia project={project} className="project-media" sizes="(max-width: 760px) 90vw, 1040px" />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <ul className="mono">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-links">
        {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer noopener">visit live site →</a>}
        {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer noopener">source code →</a>}
      </div>
    </article>
  );
}
