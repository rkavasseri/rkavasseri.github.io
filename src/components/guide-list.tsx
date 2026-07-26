"use client";

import * as React from "react";

import { GuideCard } from "@/components/guide-card";
import { Badge } from "@/components/ui/badge";
import type { GuideMeta } from "@/lib/mdx";

interface GuideListProps {
  guides: GuideMeta[];
  tags: string[];
}

export function GuideList({ guides, tags }: GuideListProps) {
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const visible = activeTag
    ? guides.filter((guide) => guide.tags.includes(activeTag))
    : guides;

  return (
    <>
      {tags.length > 0 ? (
        <div
          className="mb-10 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter guides by tag"
        >
          <button
            type="button"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Badge
              variant={activeTag === null ? "default" : "secondary"}
              className="cursor-pointer transition-colors"
            >
              All guides
            </Badge>
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Badge
                variant={activeTag === tag ? "default" : "secondary"}
                className="cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      ) : null}

      {/* Announce result count when the filter changes (WCAG 4.1.3). */}
      <p aria-live="polite" className="sr-only">
        {activeTag
          ? `${visible.length} guide${visible.length === 1 ? "" : "s"} tagged ${activeTag}.`
          : `Showing all ${visible.length} guides.`}
      </p>

      {visible.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6">
          {visible.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No guides match that tag yet.</p>
      )}
    </>
  );
}
