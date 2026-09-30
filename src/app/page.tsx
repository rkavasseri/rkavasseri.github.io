import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { GuideCard } from "@/components/guide-card";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { getAllGuides } from "@/lib/mdx";
import { projects } from "@/lib/projects";

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="grid gap-6 lg:grid-cols-12"><p className="font-mono text-[10px] uppercase tracking-[.2em] lg:col-span-3">{label}</p><div className="lg:col-span-9"><h2 className="max-w-4xl text-4xl font-semibold leading-[.95] tracking-[-.04em] sm:text-6xl">{title}</h2>{description && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>}</div></div>;
}

export default function HomePage() {
  const featuredGuides = getAllGuides().slice(0, 3);
  const currentResearch = projects.slice(0, 3);
  const productionSystems = projects.slice(3, 6);

  return <>
    <HeroSection />

    <section className="bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading label="Current research / 01" title="New architectures. Scientific questions." description="Current work in sparse model coordination, physics-informed remote sensing, and experimentally grounded AI for scientific discovery." />
        <div className="mt-14 border-b border-neutral-300 dark:border-neutral-700">
          {currentResearch.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
        <Link href="/projects" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:underline-offset-4">View all projects <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
      <SectionHeading label="Systems in practice / 02" title="Research that runs in the world." description="Production systems for research intelligence, agentic academic workflows, and experiential semantic retrieval." />
      <div className="mt-14 border-b border-border">
        {productionSystems.map((project, index) => <ProjectCard key={project.title} project={project} index={index + 3} />)}
      </div>
    </section>

    <section className="border-y border-foreground">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
        <div className="technical-grid border-x border-foreground px-10 py-20 lg:col-span-7 lg:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[.2em]">Research leadership / 03</p>
          <h2 className="mt-7 max-w-3xl text-4xl font-semibold leading-[.95] tracking-[-.04em] sm:text-6xl">Build the conditions for ambitious work.</h2>
        </div>
        <div className="flex flex-col justify-between border-r border-foreground bg-foreground px-8 py-16 text-background lg:col-span-5 lg:p-12">
          <p className="max-w-lg text-lg leading-8 text-background">As Associate Dean and Professor, I work across disciplines to connect research questions with computing infrastructure, institutional strategy, and pathways from early experiments to sustained deployment.</p>
          <Link href="/about" className="mt-10 flex items-center justify-between border-t border-neutral-700 pt-5 font-mono text-[10px] uppercase tracking-[.18em] hover:text-neutral-400">Research and academic leadership <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
      <SectionHeading label="Technical writing / 04" title="Notes from the workbench." description="Practical, long-form guides on infrastructure, machine learning, and the engineering required to make research operational." />
      <div className="mt-14 grid border-l border-t border-border md:grid-cols-3">
        {featuredGuides.map((guide, index) => <GuideCard key={guide.slug} guide={guide} index={index} />)}
      </div>
      <Link href="/guides" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:underline-offset-4">All technical guides <ArrowRight size={16} /></Link>
    </section>

    <section className="bg-foreground text-background">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-7"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-neutral-500">Working philosophy / 05</p><h2 className="mt-7 text-5xl font-semibold leading-[.92] tracking-[-.05em] sm:text-7xl">Theory earns its keep<br /><span className="text-neutral-500">when it ships.</span></h2></div>
        <div className="flex flex-col justify-between lg:col-span-5"><p className="max-w-lg text-lg leading-8 text-neutral-400">The most interesting problems cross boundaries: models and infrastructure, research and product, clean abstractions and messy operational reality.</p><Link href="/about" className="mt-10 flex items-center justify-between border-t border-neutral-700 pt-5 font-mono text-[10px] uppercase tracking-[.18em] hover:text-neutral-400">More about my work <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>

    <section className="noise-lines mx-auto max-w-[1440px] px-5 py-24 text-center lg:px-10 lg:py-36">
      <p className="font-mono text-[10px] uppercase tracking-[.2em]">Collaboration / open</p>
      <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[.92] tracking-[-.05em] sm:text-8xl">Bring me a problem worth solving.</h2>
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Foundational models, scientific AI, production systems, or institutional infrastructure that needs both research depth and engineering follow-through.</p>
      <Link href="/contact" className="tech-button mt-9 bg-foreground text-background">Start a conversation <ArrowUpRight size={17} /></Link>
    </section>
  </>;
}
