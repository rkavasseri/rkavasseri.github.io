import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { slugify, type TocEntry } from "@/lib/mdx";

const LIVEBENCH_DIR = path.join(process.cwd(), "content", "livebench");

export type BenchStatus =
  | "Active"
  | "Paused"
  | "Pre-registered"
  | "Findings recorded"
  | "Gate failed"
  | "Gate passed";

export interface BenchGate {
  date: string;
  name: string;
  result: string;
}

export interface BenchMeta {
  slug: string;
  title: string;
  question: string;
  summary: string;
  status: BenchStatus;
  area: string;
  started: string;
  updated: string;
  order: number;
  lastGate: BenchGate;
  notClaimed: string;
  next: string;
  tags: string[];
  related: string[];
  draft: boolean;
}

export interface BenchProject extends BenchMeta {
  content: string;
  toc: TocEntry[];
}

function extractToc(content: string): TocEntry[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const seen = new Map<string, number>();
  return Array.from(withoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm), (match) => {
    const text = match[2].replace(/[*_`]/g, "").trim();
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return { depth: match[1].length, text, id: count === 0 ? base : `${base}-${count}` };
  });
}

function readProject(slug: string): BenchProject | null {
  const filePath = path.join(LIVEBENCH_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const gate = (data.lastGate ?? {}) as Record<string, unknown>;
  return {
    slug,
    title: String(data.title ?? slug),
    question: String(data.question ?? ""),
    summary: String(data.summary ?? ""),
    status: String(data.status ?? "Active") as BenchStatus,
    area: String(data.area ?? ""),
    started: String(data.started ?? ""),
    updated: String(data.updated ?? ""),
    order: Number(data.order ?? 99),
    lastGate: { date: String(gate.date ?? ""), name: String(gate.name ?? ""), result: String(gate.result ?? "") },
    notClaimed: String(data.notClaimed ?? ""),
    next: String(data.next ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    draft: Boolean(data.draft ?? false) || content.trim().length === 0,
    content,
    toc: extractToc(content),
  };
}

export function getBenchSlugs(): string[] {
  if (!fs.existsSync(LIVEBENCH_DIR)) return [];
  return fs
    .readdirSync(LIVEBENCH_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => {
      const project = readProject(slug);
      return project !== null && !project.draft;
    });
}

export function getBenchProject(slug: string): BenchProject | null {
  const project = readProject(slug);
  return project && !project.draft ? project : null;
}

/** Published projects, by declared order. */
export function getAllBenchProjects(): BenchMeta[] {
  return getBenchSlugs()
    .map((slug) => readProject(slug))
    .filter((project): project is BenchProject => project !== null)
    .map(({ content: _content, toc: _toc, ...meta }) => meta)
    .sort((a, b) => a.order - b.order);
}
