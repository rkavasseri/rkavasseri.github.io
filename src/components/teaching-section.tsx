import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const entries = [
  {
    title: "AI Engineering at SDSU",
    description: "I helped launch SDSU’s AI Engineering program and drafted undergraduate learning objectives and a four-year curriculum. In the proposed retrieval lab, students test how changing the source documents changes a model’s answer.",
    href: "https://www.sdstate.edu/mccomish-electrical-engineering-computer-science/artificial-intelligence-engineering-program",
    label: "AI Engineering degree programs",
  },
  {
    title: "Teaching AI across sectors",
    description: "I organized and emceed Innovate AI 2026 for more than 250 participants, moderated the healthcare AI panels, and convened the industry and defense panels. I also presented on AI architectures in Sanford Lab’s multi-speaker AI Across Education session.",
    href: "https://indico.sanfordlab.org/event/188/contributions/3164/",
    label: "AI Across Education workshop program",
  },
  {
    title: "Faculty research development",
    description: "I lead grant-writing workshops and have mentored faculty who went on to earn NSF CAREER awards. I also built an open-source cost estimator so researchers can budget GPU time by experiment phase using their campus rates.",
    href: "https://github.com/rkavasseri/hpc-cost-estimator",
    label: "HPC cost estimator source code",
  },
];

export function TeachingSection() {
  return (
    <section className="border-b border-foreground" aria-labelledby="teaching-heading">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] lg:col-span-3">Teaching and leadership / 01</p>
          <h2 id="teaching-heading" className="max-w-4xl text-4xl font-semibold leading-[.95] tracking-[-.04em] sm:text-6xl lg:col-span-9">Teaching and university leadership</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {entries.map((entry) => (
            <article key={entry.title} className="flex flex-col border-t border-border pt-6">
              <h3 className="text-2xl font-semibold tracking-tight">{entry.title}</h3>
              <p className="mb-6 mt-4 leading-7 text-muted-foreground">{entry.description}</p>
              <a href={entry.href} className="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold underline underline-offset-4">
                {entry.label} <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-10 border-t border-border pt-6 leading-7 text-muted-foreground">
          A sample of my technical instruction:{" "}
          <Link href="/guides/precision-data-format" className="font-medium text-foreground underline underline-offset-4">
            Numerical Precision &amp; Data Formats for GPU Machine Learning
          </Link>.
        </p>
      </div>
    </section>
  );
}
