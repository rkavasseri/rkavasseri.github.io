import type { Metadata } from "next";
import Link from "next/link";
import { FileDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cvPath, hasCv, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — background, research interests, and academic history.`,
};

/** Education and early professional experience, most recent first. */
const timeline = [
  {
    period: "1998 – 2002",
    title: "Ph.D., Electrical Engineering",
    institution: "Washington State University, Pullman, WA",
  },
  {
    period: "1996 – 1998",
    title: "M.Sc., Electrical Engineering",
    institution: "Indian Institute of Science, Bangalore, India",
  },
  {
    period: "1995 – 1996",
    title: "Research Engineer",
    institution: "GE, Bangalore, India",
  },
  {
    period: "1991 – 1995",
    title: "B.S., Electrical Engineering",
    institution:
      "Visvesvaraya National Institute of Technology, Nagpur, India",
  },
];

const researchInterests = [
  "Foundational models and model architecture",
  "AI for science and physics-informed learning",
  "Retrieval, agents, and research intelligence",
  "Production AI systems and deployment",
  "Research computing and institutional AI adoption",
  "Systems theory, controls, and scientific computing",
];

const skills = [
  {
    group: "Languages",
    items: ["Python", "C/C++", "MATLAB", "Julia", "TypeScript", "Bash"],
  },
  {
    group: "Scientific Computing",
    items: ["NumPy", "SciPy", "PETSc", "MPI", "OpenMP", "Dask"],
  },
  {
    group: "Machine Learning",
    items: ["PyTorch", "scikit-learn", "XGBoost", "JAX"],
  },
  {
    group: "Infrastructure",
    items: ["Linux", "Slurm", "Docker", "Apptainer", "Git"],
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <header>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h1>
        <p className="mt-3 text-base font-medium text-primary">
          Associate Dean / Professor
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {siteConfig.department}
          <br />
          {siteConfig.college} · {siteConfig.institution}
        </p>
      </header>

      <Separator className="my-10" />

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Biography</h2>
        <div className="mt-4 space-y-5 leading-7 text-muted-foreground">
          <p>
            I am Associate Dean and Professor in the{" "}
            {siteConfig.department} at {siteConfig.institution}, where my work
            now spans foundational model architecture, AI for scientific
            discovery, retrieval and agentic systems, and production AI. I work
            across the full stack: from the structure of a model and the evidence
            behind an experiment to the software and infrastructure required for
            deployment.
          </p>
          <p>
            Systems theory, controls, signal processing, and scientific
            computing remain the intellectual foundation of that work. They
            provide a durable way to reason about structure, dynamics,
            uncertainty, and constraint—whether the system is a physical process,
            a coordinated set of language models, or an institutional research
            workflow.
          </p>
          <p>
            I care about what happens after analysis leaves the notebook: how
            data moves, how models are evaluated, how people use the resulting
            system, and which assumptions survive production. In academic
            leadership, the same perspective shapes my work on research
            computing and responsible institutional AI adoption. This site
            documents both the research and the engineering needed to sustain it.
          </p>
        </div>
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-xl font-semibold tracking-tight">
          Research Interests
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {researchInterests.map((interest) => (
            <li
              key={interest}
              className="flex items-start gap-2 leading-7 text-muted-foreground"
            >
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <Separator className="my-10" />

      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Education &amp; Early Career
          </h2>
          {hasCv ? (
            <Button asChild variant="outline" size="sm">
              <a href={cvPath} download>
                <FileDown className="h-4 w-4" />
                Full CV
              </a>
            </Button>
          ) : null}
        </div>

        <ol className="mt-6 space-y-6 border-l border-border pl-6">
          {timeline.map((entry) => (
            <li key={`${entry.period}-${entry.title}`} className="relative">
              <span
                className="absolute -left-[1.6875rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-border"
                aria-hidden
              />
              <p className="font-mono text-xs text-muted-foreground">
                {entry.period}
              </p>
              <h3 className="mt-1 font-medium text-foreground">
                {entry.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {entry.institution}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Separator className="my-10" />

      <section>
        <h2 className="text-xl font-semibold tracking-tight">
          Tools &amp; Technologies
        </h2>
        <div className="mt-6 space-y-5">
          {skills.map(({ group, items }) => (
            <div key={group}>
              <h3 className="mb-2.5 text-sm font-medium text-foreground">
                {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-10" />

      <p className="text-muted-foreground">
        For collaboration or speaking enquiries, see the{" "}
        <Link
          href="/contact"
          className="text-primary underline underline-offset-4"
        >
          contact page
        </Link>
        .
      </p>
    </div>
  );
}
