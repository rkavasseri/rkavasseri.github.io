import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BenchStatusChip } from "@/components/bench-status";
import { formatDate } from "@/lib/format";
import { getAllBenchProjects } from "@/lib/livebench";

export const metadata: Metadata = {
  title: "Livebench",
  description:
    "Research in the open, gates and all: active research projects by Rajesh Kavasseri, with the questions, pre-declared gates, results, failures, and what is not claimed.",
};

export default function LivebenchPage() {
  const projects = getAllBenchProjects();

  return (
    <div className="bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <header className="technical-grid border-b border-foreground">
        <div className="mx-auto grid max-w-[1440px] px-5 lg:grid-cols-12 lg:px-10">
          <div className="border-x border-foreground bg-white/95 px-5 py-16 dark:bg-neutral-950/95 sm:px-10 md:py-24 lg:col-span-9">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[.2em]">Livebench / research in the open</p>
            <h1 className="mt-8 text-[clamp(4rem,10vw,9rem)] font-semibold leading-[.84] tracking-[-.065em]">
              Gates<br />and all<span aria-hidden>.</span>
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-8">
              The active kitchen. Each project starts with a question and a set of gates decided before the
              results come in. Passed gates, failed gates, and the limits of every claim stay on the record.
            </p>
          </div>
          <aside className="hidden border-r border-neutral-950 bg-neutral-950 p-8 text-white dark:border-neutral-700 lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-neutral-400">Bench / {String(projects.length).padStart(2, "0")} projects</p>
            <p className="text-2xl font-semibold leading-tight">A failed gate is a result, not something to hide.</p>
            <p className="border-t border-neutral-700 pt-5 font-mono text-[9px] uppercase leading-5 tracking-wider text-neutral-400">Question / gate / result / not claimed</p>
          </aside>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="border-b border-border">
          {projects.map((project, index) => (
            <article key={project.slug} className="grid gap-6 border-t border-neutral-300 py-10 dark:border-neutral-700 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-widest">Bench—{String(index + 1).padStart(2, "0")}</span>
                <div className="mt-4"><BenchStatusChip status={project.status} /></div>
              </div>
              <div className="lg:col-span-6">
                <p className="font-mono text-[9px] font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-300">{project.area}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-.035em]">
                  <Link href={`/livebench/${project.slug}`} className="hover:underline hover:underline-offset-4">{project.title}</Link>
                </h2>
                <p className="mt-4 text-lg leading-8">{project.question}</p>
                <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">{project.summary}</p>
              </div>
              <dl className="grid gap-4 text-sm leading-6 lg:col-span-4">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">Latest gate · {formatDate(project.lastGate.date)}</dt>
                  <dd className="mt-1"><span className="font-semibold">{project.lastGate.name}.</span> {project.lastGate.result}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">Not claimed</dt>
                  <dd className="mt-1 text-neutral-600 dark:text-neutral-300">{project.notClaimed}</dd>
                </div>
                <Link href={`/livebench/${project.slug}`} className="inline-flex items-center gap-2 font-semibold hover:underline">Open the bench notes <ArrowRight size={15} /></Link>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
