import type { Metadata } from "next";

import { GuideList } from "@/components/guide-list";
import { getAllGuides, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Long-form technical guides on high-performance computing, infrastructure, and applied machine learning.",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const tags = getAllTags();

  return (
    <div className="container max-w-6xl py-12 md:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Guides
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Technical write-ups on the infrastructure behind research computing —
          clusters, containers, and the machine learning workloads that run on
          them. Written for people doing the work.
        </p>
      </header>

      <GuideList guides={guides} tags={tags} />
    </div>
  );
}
