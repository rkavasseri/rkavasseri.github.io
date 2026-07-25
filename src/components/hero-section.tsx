import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cvPath, siteConfig } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Faint radial wash — restrained, not a SaaS gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.09),transparent_70%)]"
      />

      <div className="container max-w-6xl py-16 md:py-24">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-3 text-base font-medium text-primary">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I work on the reliability of large-scale power systems and the
              computational methods that make them tractable — from
              transient-stability solvers to machine learning on grid telemetry.
              This site collects technical guides, research projects, and
              writing aimed at people building the same kinds of systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/guides">
                  Read Guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={cvPath} download>
                  <FileDown className="h-4 w-4" />
                  View CV
                </a>
              </Button>
            </div>
          </div>

          {/* Placeholder tile until a real photo lands in public/images. */}
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-border bg-gradient-to-br from-muted to-accent shadow-sm md:h-32 md:w-32"
            aria-hidden
          >
            <span className="font-mono text-3xl font-semibold tracking-tight text-muted-foreground">
              RK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
