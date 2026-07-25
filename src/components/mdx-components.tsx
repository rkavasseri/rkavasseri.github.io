import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { ArrowUpRight } from "lucide-react";

import { Callout } from "@/components/callout";
import { CopyButton } from "@/components/copy-button";
import { Steps } from "@/components/steps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={cn(
        "mt-12 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h4
      className={cn(
        "mt-6 scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-5", className)}
      {...props}
    />
  ),
  a: ({ className, href = "", children, ...props }: AnchorProps) => {
    const isExternal = /^https?:\/\//.test(href);
    const linkClass = cn(
      "font-normal text-primary underline underline-offset-4 hover:text-primary/80",
      className
    );

    if (isExternal) {
      return (
        <a
          href={href}
          className={cn(linkClass, "inline-flex items-center gap-0.5")}
          target="_blank"
          rel="noreferrer noopener"
          {...props}
        >
          {children}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      );
    }

    return (
      <Link href={href} className={linkClass} {...props}>
        {children}
      </Link>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "my-5 ml-6 list-disc space-y-2 text-muted-foreground marker:text-muted-foreground/50",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "my-5 ml-6 list-decimal space-y-2 text-muted-foreground marker:text-muted-foreground/70",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-lg border-l-2 border-primary bg-muted/50 py-3 pl-6 pr-4 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-border" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <Table className={className} {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableHeader className="bg-muted/50" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableBody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <TableHead {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <TableCell {...props} />
  ),
  img: ({ className, alt = "", src }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-8">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt}
        width={1200}
        height={630}
        className={cn("rounded-lg border border-border", className)}
      />
      {alt ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Blocks are highlighted by rehype-pretty-code and carry a data-theme
    // attribute; anything without one is inline code.
    const isHighlighted = "data-theme" in props || className?.includes("language-");

    if (isHighlighted) {
      return <code className={className} {...props} />;
    }

    return (
      <code
        className={cn(
          "relative rounded border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
          className
        )}
        {...props}
      />
    );
  },
  pre: ({
    className,
    children,
    raw,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & { raw?: string }) => (
    <div className="group relative my-6">
      {raw ? <CopyButton value={raw} /> : null}
      <pre
        className={cn(
          "max-h-[42rem] overflow-x-auto rounded-lg border border-border bg-muted/40 py-4 font-mono text-sm leading-6 dark:bg-muted/20",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  ),
  figure: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { "data-rehype-pretty-code-figure"?: string }) => {
    // rehype-pretty-code wraps blocks in <figure>; strip default figure margin
    // so the <pre> spacing above governs.
    if ("data-rehype-pretty-code-figure" in props) {
      return <figure className={cn("relative", className)} {...props} />;
    }
    return <figure className={className} {...props} />;
  },
  figcaption: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & { "data-rehype-pretty-code-title"?: string }) => (
    <figcaption
      className={cn(
        "-mb-2 rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  Callout,
  Steps,
};
