import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects.",
};

const ACCENT = "#1763a0";

export default function ProjectsPage() {
  return (
    <div
      className="pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <PageHeader eyebrow="learning by making" title="projects" accent={ACCENT}>
        things i&rsquo;m building and what i&rsquo;m learning along the way.
      </PageHeader>

      {projects.length === 0 ? (
        <div className="border-t border-[var(--border)] py-24 text-center">
          <p className="text-[var(--muted)]">
            projects coming soon.
          </p>
        </div>
      ) : (
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
