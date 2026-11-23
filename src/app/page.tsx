import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { GuideCard } from "@/components/guide-card";
import { TeachingSection } from "@/components/teaching-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
import { BenchStatusChip } from "@/components/bench-status";
import { getAllBenchProjects } from "@/lib/livebench";
import { getAllGuides } from "@/lib/mdx";
import { productionProjects, researchProjects } from "@/lib/projects";

const foundations: { title: string; body: string; href?: string }[] = [
  { title: "Wide-area resilient protection (WARP)", body: "NSF-funded project (PI). Used synchronized grid measurements and Lyapunov-like energy functions to distinguish real disturbances from protection-relay misoperations.", href: "https://www.nsf.gov/awardsearch/showAward?AWD_ID=1544621" },
  { title: "Static voltage stability", body: "Reformulated the AC power-flow equations as a polynomial system and used Gröbner-basis elimination to derive closed-form voltage sensitivity factors ordinarily computed numerically." },
  { title: "Wind control for oscillation damping", body: "Co-PI. Studied wind-generator controls for damping inter-area oscillations between generator groups across an interconnected grid." },
  { title: "Stability and protection", body: "Ph.D. on power system stabilizer design; U.S. patent on eliminating the anti-aliasing filter in digital relays; IEEE PES General Meeting Best Paper (2014); Editor, IEEE Transactions on Sustainable Energy." },
];

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="grid gap-6 lg:grid-cols-12"><p className="font-mono text-[10px] uppercase tracking-[.2em] lg:col-span-3">{label}</p><div className="lg:col-span-9"><h2 className="max-w-4xl text-4xl font-semibold leading-[.95] tracking-[-.04em] sm:text-6xl">{title}</h2>{description && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>}</div></div>;
}

export default function HomePage() {
  const featuredGuides = getAllGuides().slice(0, 3);
  const bench = getAllBenchProjects();

  return <>
    <HeroSection />
    <TeachingSection />

    <section className="bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading label="Current research / 02" title="New architectures. Scientific questions." description="Current work on AI safety through a control-theory lens, verifiable AI for science, and physics-informed remote sensing." />
        <div className="mt-14 border-b border-neutral-300 dark:border-neutral-700">
          {researchProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
        <Link href="/projects" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:underline-offset-4">View all projects <ArrowRight size={16} /></Link>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
      <SectionHeading label="Livebench / open kitchen" title="Research in the open, gates and all." description="Active projects with their questions, gates decided in advance, results, failures, and what each one does not claim." />
      <div className="mt-14 grid border-l border-t border-border md:grid-cols-2 xl:grid-cols-3">
        {bench.map((project) => <Link key={project.slug} href={`/livebench/${project.slug}`} className="group flex flex-col justify-between gap-6 border-b border-r border-border p-6 transition-colors hover:bg-accent/50 lg:p-8"><div><BenchStatusChip status={project.status} /><h3 className="mt-5 text-2xl font-semibold tracking-[-.03em] group-hover:underline group-hover:underline-offset-4">{project.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{project.question}</p></div><p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{project.area}</p></Link>)}
      </div>
      <Link href="/livebench" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:underline-offset-4">Open the livebench <ArrowRight size={16} /></Link>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
      <SectionHeading label="Systems in practice / 03" title="Research that runs in the world." description="Production systems for research intelligence, agentic academic workflows, and experiential semantic retrieval." />
      <div className="mt-14 border-b border-border">
        {productionProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + researchProjects.length} />)}
      </div>
    </section>

    <section className="bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading label="Foundations / 04" title="Control and power systems." description="Before AI, my work was on keeping power grids stable and well protected, where “usually right” isn’t good enough. You design for the worst case, prove stability, and don’t deploy what you can’t observe." />
        <ul className="mt-14 grid border-l border-t border-neutral-300 dark:border-neutral-700 md:grid-cols-2">
          {foundations.map((item) => <li key={item.title} className="border-b border-r border-neutral-300 p-6 dark:border-neutral-700 lg:p-8"><h3 className="text-xl font-semibold tracking-[-.02em]">{item.href ? <a href={item.href} target="_blank" rel="noreferrer noopener" className="hover:underline hover:underline-offset-4">{item.title}</a> : item.title}</h3><p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">{item.body}</p></li>)}
        </ul>
      </div>
    </section>

    <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
      <SectionHeading label="Technical writing / 05" title="Notes from the workbench." description="Practical, long-form guides on infrastructure, machine learning, and the engineering required to make research operational." />
      <div className="mt-14 grid border-l border-t border-border md:grid-cols-3">
        {featuredGuides.map((guide, index) => <GuideCard key={guide.slug} guide={guide} index={index} />)}
      </div>
      <Link href="/guides" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:underline hover:underline-offset-4">All technical guides <ArrowRight size={16} /></Link>
    </section>

    <section className="bg-foreground text-background">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-7"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-neutral-500">Working philosophy / 06</p><h2 className="mt-7 text-5xl font-semibold leading-[.92] tracking-[-.05em] sm:text-7xl">Theory earns its keep<br /><span className="text-neutral-500">when it ships.</span></h2></div>
        <div className="flex flex-col justify-between lg:col-span-5"><p className="max-w-lg text-lg leading-8 text-neutral-400">The most interesting problems cross boundaries: models and infrastructure, research and product, clean abstractions and messy operational reality.</p><Link href="/about" className="mt-10 flex items-center justify-between border-t border-neutral-700 pt-5 font-mono text-[10px] uppercase tracking-[.18em] hover:text-neutral-400">More about my work <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>

    <section className="noise-lines mx-auto max-w-[1440px] px-5 py-24 text-center lg:px-10 lg:py-36">
      <p className="font-mono text-[10px] uppercase tracking-[.2em]">Collaboration / open</p>
      <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[.92] tracking-[-.05em] sm:text-8xl">Bring me a problem worth solving.</h2>
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">AI safety, foundational models, scientific AI, production systems, or institutional infrastructure that needs both research depth and engineering follow-through.</p>
      <Link href="/contact" className="tech-button mt-9 bg-foreground text-background">Start a conversation <ArrowUpRight size={17} /></Link>
    </section>
  </>;
}
