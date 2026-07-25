import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GuideCard } from "@/components/guide-card";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { getAllGuides } from "@/lib/mdx";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const featuredGuides = getAllGuides().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <HeroSection />

      <section className="container max-w-6xl py-12 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Featured Guides
            </h2>
            <p className="mt-2 text-muted-foreground">
              Long-form technical writing on infrastructure and applied ML.
            </p>
          </div>
          <Link
            href="/guides"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            All guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container max-w-6xl py-12 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Selected Projects
              </h2>
              <p className="mt-2 text-muted-foreground">
                Research software and tooling, mostly open source.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              All projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
