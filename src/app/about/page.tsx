import type { Metadata } from "next";
import Link from "next/link";
import { FileDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cvPath, siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — background, research interests, and academic history.`,
};

// TODO: replace placeholder education history with real entries.
const education = [
  {
    period: "0000 – 0000",
    degree: "Ph.D., Electrical Engineering",
    institution: "[Institution]",
    detail: "Dissertation on nonlinear dynamics in power networks.",
  },
  {
    period: "0000 – 0000",
    degree: "M.S., Electrical Engineering",
    institution: "[Institution]",
    detail: "Focus on control systems and numerical methods.",
  },
  {
    period: "0000 – 0000",
    degree: "B.Tech., Electrical Engineering",
    institution: "[Institution]",
    detail: "",
  },
];

const researchInterests = [
  "Power system dynamics and stability",
  "Nonlinear systems and bifurcation analysis",
  "Machine learning for grid telemetry",
  "High-performance scientific computing",
  "Renewable integration and forecasting",
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
          {siteConfig.title}, {siteConfig.department}
        </p>
        <p className="text-sm text-muted-foreground">
          {siteConfig.institution}
        </p>
      </header>

      <Separator className="my-10" />

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Biography</h2>
        <div className="mt-4 space-y-5 leading-7 text-muted-foreground">
          <p>
            {/* TODO: replace with real biography. */}
            I am {siteConfig.title} at {siteConfig.institution}, where my work
            centers on the dynamics and stability of large electric power
            networks. Much of it sits at the boundary between classical systems
            theory and modern computational practice — questions that are well
            posed analytically but only become answerable at scale with careful
            numerical work.
          </p>
          <p>
            My group builds simulation tools and data-driven models for grid
            operation, with a recent emphasis on how renewable generation
            changes the assumptions underpinning conventional stability
            analysis. Alongside research, I hold an administrative appointment
            as Associate Dean.
          </p>
          <p>
            I write technical guides because the infrastructure knowledge that
            research computing depends on is rarely written down in a form that
            is useful to the next person who needs it.
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
          <h2 className="text-xl font-semibold tracking-tight">Education</h2>
          <Button asChild variant="outline" size="sm">
            <a href={cvPath} download>
              <FileDown className="h-4 w-4" />
              Full CV
            </a>
          </Button>
        </div>

        <ol className="mt-6 space-y-6 border-l border-border pl-6">
          {education.map((entry) => (
            <li key={entry.degree} className="relative">
              <span
                className="absolute -left-[1.6875rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-border"
                aria-hidden
              />
              <p className="font-mono text-xs text-muted-foreground">
                {entry.period}
              </p>
              <h3 className="mt-1 font-medium text-foreground">
                {entry.degree}
              </h3>
              <p className="text-sm text-muted-foreground">
                {entry.institution}
              </p>
              {entry.detail ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {entry.detail}
                </p>
              ) : null}
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
