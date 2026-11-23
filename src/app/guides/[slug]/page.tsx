import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

import { mdxComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  formatDate,
  getAdjacentGuides,
  getGuideBySlug,
  getGuideSlugs,
} from "@/lib/mdx";
import { rehypeRawCode } from "@/lib/rehype-raw-code";

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual themes: CSS variables let the .dark class swap palettes without a
  // second render pass.
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "plaintext",
};

interface GuidePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.draft) return {};

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      publishedTime: guide.date,
      authors: [guide.author],
      tags: [...guide.tags],
    },
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);
  if (!guide || guide.draft) notFound();

  const { previous, next } = getAdjacentGuides(guide.slug);

  return (
    <div className="container max-w-6xl py-10 md:py-14">
      <Link
        href="/guides"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Guides
      </Link>

      {/* TOC handles its own breakpoints: accordion here on mobile, sticky
          sidebar on desktop via the grid's second column. */}
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="order-2 min-w-0 lg:order-1">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {guide.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span>{guide.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={guide.date}>{formatDate(guide.date)}</time>
              <span aria-hidden>·</span>
              <span>{guide.readTime} min read</span>
            </div>

            {guide.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}

            <Separator className="mt-8" />
          </header>

          <div className="max-w-3xl">
            <MDXRemote
              source={guide.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeRawCode,
                    [rehypePrettyCode, prettyCodeOptions],
                  ],
                },
              }}
            />
          </div>

          {previous || next ? (
            <>
              <Separator className="my-12" />
              <nav
                className="grid gap-4 sm:grid-cols-2"
                aria-label="Guide navigation"
              >
                {previous ? (
                  <Link
                    href={`/guides/${previous.slug}`}
                    className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/50"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="h-3 w-3" />
                      Previous
                    </span>
                    <span className="mt-1 block font-medium leading-snug transition-colors group-hover:text-primary">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}

                {next ? (
                  <Link
                    href={`/guides/${next.slug}`}
                    className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-primary/40 hover:bg-accent/50 sm:col-start-2"
                  >
                    <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      Next
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="mt-1 block font-medium leading-snug transition-colors group-hover:text-primary">
                      {next.title}
                    </span>
                  </Link>
                ) : null}
              </nav>
            </>
          ) : null}
        </article>

        <aside className="order-1 lg:order-2">
          <TableOfContents entries={guide.toc} />
        </aside>
      </div>
    </div>
  );
}
