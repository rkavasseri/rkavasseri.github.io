import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { LinkedInIcon, SubstackIcon } from "@/components/brand-icons";
import { GuideCard } from "@/components/guide-card";
import { NewsletterButton } from "@/components/newsletter-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  publishedNewsletters,
  siteConfig,
  socialLinks,
} from "@/lib/constants";
import { getAllGuides } from "@/lib/mdx";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Writing",
  description: `Newsletters and essays by ${siteConfig.name} — on machine learning, systems architecture, and the engineering behind deployed software.`,
};

export default function WritingPage() {
  const recentGuides = getAllGuides().slice(0, 2);

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Research notes, technical guides, and two newsletters on model
          architecture, scientific AI, production systems, and the infrastructure
          that connects them.
        </p>
      </header>

      <h2
        id="newsletters"
        className="mb-5 scroll-mt-24 text-xl font-semibold tracking-tight"
      >
        Newsletters
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {publishedNewsletters.map((publication) => {
          const Icon =
            publication.platform === "Substack" ? SubstackIcon : LinkedInIcon;

          return (
            <Card key={publication.name} className="flex flex-col">
              <CardHeader className="flex-none space-y-1.5 p-5 pb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {publication.platform}
                </div>
                <CardTitle className="text-base leading-snug">
                  {publication.name}
                </CardTitle>
                {publication.tagline ? (
                  <p className="text-sm italic text-muted-foreground">
                    {publication.tagline}
                  </p>
                ) : null}
              </CardHeader>

              <CardContent className="flex-1 p-5 pt-0">
                <CardDescription className="text-sm leading-6">
                  {publication.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="flex-none p-5 pt-0">
                <NewsletterButton
                  publication={publication}
                  variant="outline"
                  size="sm"
                  compact
                />
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            id="guides"
            className="scroll-mt-24 text-xl font-semibold tracking-tight"
          >
            Guides
          </h2>
          <Link
            href="/guides"
            className="inline-flex shrink-0 items-center gap-1 rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            All guides
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <p className="mb-6 leading-7 text-muted-foreground">
          Long-form technical walkthroughs hosted here — infrastructure, GPU
          clusters, and the practical details that rarely get written down.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {recentGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="research">
        <h2
          id="research"
          className="scroll-mt-24 text-xl font-semibold tracking-tight"
        >
          Current Research
        </h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {projects.slice(0, 3).map((project) => (
            <article key={project.title} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">{project.category}</p>
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/projects" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          View the full project index <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      <section className="mt-14">
        <h2
          id="publications"
          className="scroll-mt-24 text-xl font-semibold tracking-tight"
        >
          Publications
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Peer-reviewed work in power systems, nonlinear dynamics, and applied
          machine learning is listed on{" "}
          <a
            href={socialLinks.scholar}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-0.5 text-primary underline underline-offset-4"
          >
            Google Scholar
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>{" "}
          and{" "}
          <a
            href={socialLinks.orcid}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-0.5 text-primary underline underline-offset-4"
          >
            ORCID
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          .
        </p>
      </section>
    </div>
  );
}
