import * as React from "react";

/**
 * Wraps h3 children in a numbered vertical timeline. Numbering is handled by
 * a CSS counter so steps can be added or reordered in MDX without renumbering.
 */
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 ml-4 border-l border-border pl-8 [counter-reset:step] [&>h3]:mt-8 [&>h3:first-child]:mt-0">
      <div className="[&>h3]:relative [&>h3]:text-base [&>h3]:font-semibold [&>h3]:before:absolute [&>h3]:before:-left-[2.85rem] [&>h3]:before:flex [&>h3]:before:h-8 [&>h3]:before:w-8 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border [&>h3]:before:border-border [&>h3]:before:bg-muted [&>h3]:before:text-sm [&>h3]:before:font-medium [&>h3]:before:text-foreground [&>h3]:before:[counter-increment:step] [&>h3]:before:[content:counter(step)]">
        {children}
      </div>
    </div>
  );
}
