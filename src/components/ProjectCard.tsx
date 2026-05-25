import type { Project } from "@/data/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group py-10 border-t border-[var(--border)] grid gap-6 md:grid-cols-[1fr_2fr]">
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--muted)] uppercase tracking-wider">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <p className="text-lg text-[var(--foreground)] leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              Live demo →
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
