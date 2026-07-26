import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cvPath, hasCv, siteConfig } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative border-b border-border">
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
              I work at the intersection of systems theory, networks, signal
              processing, and machine learning. What I enjoy most is carrying
              that work past the paper — deploying it, breaking it under real
              load, and living with the full-stack production build. This site
              collects technical guides, projects, and writing for people who
              like building the same way.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/guides">
                  Read Guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/writing">
                  Read the Newsletters
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {hasCv ? (
                <Button asChild variant="outline" size="lg">
                  <a href={cvPath} download>
                    <FileDown className="h-4 w-4" />
                    View CV
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          {/* Placeholder tile until a real photo lands in public/images. */}
          <div
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-border bg-muted md:h-32 md:w-32"
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
