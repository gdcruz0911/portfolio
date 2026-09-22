import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects.",
};

export default function ProjectsPage() {
  return <div>
    <PageHeader title="projects" />
    {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
  </div>;
}
