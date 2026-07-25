import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research software, simulation tooling, and machine learning systems for power grid analysis.",
};

export default function ProjectsPage() {
  return (
    <div className="container max-w-6xl py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Software from research work — simulation tooling, data pipelines, and
          models. Most of it is open source; papers are linked where they exist.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
