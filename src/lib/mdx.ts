import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface GuideFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  draft: boolean;
}

export interface TocEntry {
  /** Heading depth: 2 for h2, 3 for h3. */
  depth: number;
  text: string;
  id: string;
}

export interface GuideMeta extends GuideFrontmatter {
  slug: string;
  readTime: number;
}

export interface Guide extends GuideMeta {
  content: string;
  toc: TocEntry[];
}

const WORDS_PER_MINUTE = 200;

/** Mirrors github-slugger's behaviour closely enough for our heading text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function readTimeFrom(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Pull h2/h3 headings for the table of contents. Fenced code blocks are
 * stripped first so that shell comments like `## install` aren't mistaken
 * for headings.
 */
function extractToc(content: string): TocEntry[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const headings = withoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm);
  const seen = new Map<string, number>();

  return Array.from(headings, (match) => {
    const depth = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const base = slugify(text);

    // Disambiguate repeated headings the same way rehype-slug does.
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;

    return { depth, text, id };
  });
}

function parseFrontmatter(data: Record<string, unknown>): GuideFrontmatter {
  return {
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? ""),
    draft: Boolean(data.draft ?? false),
  };
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...parseFrontmatter(data),
    slug,
    readTime: readTimeFrom(content),
    content,
    toc: extractToc(content),
  };
}

/** All published guides, newest first. Drafts are excluded from the build. */
export function getAllGuides(): GuideMeta[] {
  return getGuideSlugs()
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== null && !guide.draft)
    .map(({ content: _content, toc: _toc, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Every tag in use, alphabetised — powers the guide index filter. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const guide of getAllGuides()) {
    for (const tag of guide.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}

/** Neighbouring guides for prev/next navigation. */
export function getAdjacentGuides(slug: string): {
  previous: GuideMeta | null;
  next: GuideMeta | null;
} {
  const guides = getAllGuides();
  const index = guides.findIndex((guide) => guide.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: guides[index + 1] ?? null,
    next: guides[index - 1] ?? null,
  };
}

export { formatDate } from "./format";
