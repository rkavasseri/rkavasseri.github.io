"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TocEntry } from "@/lib/mdx";
import { cn } from "@/lib/utils";

/** Tracks which heading is currently in view. */
function useActiveHeading(entries: TocEntry[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (entries.length === 0) return;

    const elements = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
          return;
        }

        // Nothing in the band — keep the last heading scrolled past active.
        const above = elements.filter(
          (el) => el.getBoundingClientRect().top < 100
        );
        if (above.length > 0) {
          setActiveId(above[above.length - 1].id);
        }
      },
      // Band just below the sticky header, so the active item tracks reading
      // position rather than flipping at the very top of the viewport.
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [entries]);

  return activeId;
}

interface TocLinksProps {
  entries: TocEntry[];
  activeId: string | null;
  onNavigate?: () => void;
}

function TocLinks({ entries, activeId, onNavigate }: TocLinksProps) {
  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    // Honour prefers-reduced-motion — scrollIntoView ignores the CSS override.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
    // Move keyboard focus to the heading, not just the viewport.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    // Keep the URL shareable without letting the browser jump.
    window.history.replaceState(null, "", `#${id}`);
    onNavigate?.();
  }

  return (
    <ul className="space-y-2.5 text-sm">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className={cn(entry.depth === 3 && "ml-4")}
        >
          <a
            href={`#${entry.id}`}
            onClick={(event) => handleClick(event, entry.id)}
            aria-current={activeId === entry.id ? "location" : undefined}
            className={cn(
              "block leading-snug transition-colors hover:text-foreground",
              activeId === entry.id
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const activeId = useActiveHeading(entries);

  if (entries.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsed above the article. */}
      <Accordion
        type="single"
        collapsible
        className="rounded-lg border border-border px-4 lg:hidden"
      >
        <AccordionItem value="toc" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            On this page
          </AccordionTrigger>
          <AccordionContent>
            <TocLinks entries={entries} activeId={activeId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Desktop: sticky sidebar. */}
      <nav
        aria-label="Table of contents"
        className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block"
      >
        <p className="mb-4 text-sm font-semibold text-foreground">
          On this page
        </p>
        <TocLinks entries={entries} activeId={activeId} />
      </nav>
    </>
  );
}
