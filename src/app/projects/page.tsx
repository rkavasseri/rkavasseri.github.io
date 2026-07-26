import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research software and production systems spanning machine learning, networks, and applied AI.",
};

export default function ProjectsPage() {
  return (
    <div className="container max-w-6xl py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Work that made it out of the notebook — models, data pipelines, and
          the deployed systems around them. Code and papers are linked where
          they exist.
        </p>
      </header>

      {/* auto-fill keeps card width consistent whether there are 1 or 12 —
          they fill left to right instead of stretching across the row. */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
