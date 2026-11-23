import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ChevronLeft } from "lucide-react";

import { BenchStatusChip } from "@/components/bench-status";
import { mdxComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format";
import { getBenchProject, getBenchSlugs } from "@/lib/livebench";
import { rehypeRawCode } from "@/lib/rehype-raw-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "plaintext",
};

interface BenchPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getBenchSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BenchPageProps): Metadata {
  const project = getBenchProject(params.slug);
  if (!project) return {};
  return { title: project.title, description: project.question };
}

export default function BenchProjectPage({ params }: BenchPageProps) {
  const project = getBenchProject(params.slug);
  if (!project) notFound();

  const related = project.related
    .map((slug) => getBenchProject(slug))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="container max-w-6xl py-10 md:py-14">
      <Link href="/livebench" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ChevronLeft className="h-4 w-4" />
        Back to Livebench
      </Link>

      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="order-2 min-w-0 lg:order-1">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <BenchStatusChip status={project.status} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{project.area}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{project.question}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              {project.started ? <><span>Started {formatDate(project.started)}</span><span aria-hidden>·</span></> : null}
              <span>Updated {formatDate(project.updated)}</span>
            </div>

            <dl className="mt-8 grid border-l border-t border-border text-sm leading-6 sm:grid-cols-3">
              <div className="border-b border-r border-border p-4">
                <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Latest gate</dt>
                <dd className="mt-2"><span className="font-semibold">{project.lastGate.name}.</span> {project.lastGate.result}</dd>
              </div>
              <div className="border-b border-r border-border p-4">
                <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Not claimed</dt>
                <dd className="mt-2">{project.notClaimed}</dd>
              </div>
              <div className="border-b border-r border-border p-4">
                <dt className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Next</dt>
                <dd className="mt-2">{project.next}</dd>
              </div>
            </dl>
            <Separator className="mt-10" />
          </header>

          <div className="max-w-3xl">
            <MDXRemote
              source={project.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypeRawCode, [rehypePrettyCode, prettyCodeOptions]],
                },
              }}
            />
          </div>

          {related.length > 0 ? (
            <>
              <Separator className="my-12" />
              <nav aria-label="Related bench projects" className="grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <Link key={item.slug} href={`/livebench/${item.slug}`} className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-accent/50">
                    <span className="text-xs text-muted-foreground">Related on the bench</span>
                    <span className="mt-1 block font-medium leading-snug group-hover:text-primary">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </>
          ) : null}
        </article>

        <aside className="order-1 lg:order-2">
          <TableOfContents entries={project.toc} />
        </aside>
      </div>
    </div>
  );
}
