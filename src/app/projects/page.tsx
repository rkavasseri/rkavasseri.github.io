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
    <div className="bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <header className="technical-grid border-b border-foreground">
        <div className="mx-auto grid max-w-[1440px] px-5 lg:grid-cols-12 lg:px-10">
          <div className="border-x border-foreground bg-white/95 px-5 py-16 dark:bg-neutral-950/95 sm:px-10 md:py-24 lg:col-span-9">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[.2em]">
              Portfolio / Systems in practice
            </p>
            <h1 className="mt-8 text-[clamp(4rem,10vw,9rem)] font-semibold leading-[.84] tracking-[-.065em]">
              Selected<br />work<span aria-hidden>.</span>
            </h1>
          </div>
          <aside className="hidden border-r border-neutral-950 bg-neutral-950 p-8 text-white dark:border-neutral-700 lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-neutral-400">Index / {String(projects.length).padStart(2, "0")} systems</p>
            <p className="text-2xl font-semibold leading-tight">Research that left the notebook.</p>
            <p className="border-t border-neutral-700 pt-5 font-mono text-[9px] uppercase leading-5 tracking-wider text-neutral-400">Models / data pipelines / deployed infrastructure</p>
          </aside>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] lg:col-span-3">Project index / 01</p>
          <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300 lg:col-span-9">
            Models, data pipelines, and the production systems around them.
            Code, working products, and papers are linked where available.
          </p>
        </div>
        <div className="mt-14 border-b border-border">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
