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
          <button type="button" onClick={() => setActiveTag(null)}>
            <Badge
              variant={activeTag === null ? "default" : "secondary"}
              className="cursor-pointer transition-colors"
            >
              All
            </Badge>
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
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

      {visible.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
