import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects.",
};

const ACCENT = "#1763a0";

export default function WorkPage() {
  return (
    <div
      className="pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <PageHeader eyebrow="Selected work" title="Work" accent={ACCENT}>
        a handful of things i&rsquo;ve built, from school projects to weekend
        experiments.
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
