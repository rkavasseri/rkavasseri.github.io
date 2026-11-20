import type { Metadata } from "next";

import { GuideList } from "@/components/guide-list";
import { getAllGuides, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides on GPU machine learning, numerical precision, and research computing.",
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
          Practical guides on GPU machine learning and research computing,
          with worked examples, engineering trade-offs, and experiments you can
          adapt to your own hardware.
        </p>
      </header>

      <GuideList guides={guides} tags={tags} />
    </div>
  );
}
