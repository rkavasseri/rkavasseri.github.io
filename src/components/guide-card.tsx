import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { GuideMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

export function GuideCard({ guide, index = 0 }: { guide: GuideMeta; index?: number }) {
  return <Link href={`/guides/${guide.slug}`} className="group flex min-h-[390px] flex-col justify-between border-b border-r border-border p-6 transition-colors hover:bg-foreground hover:text-background focus-visible:z-10 focus-visible:bg-foreground focus-visible:text-background">
    <div><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest"><span>Guide / 0{index + 1}</span><ArrowUpRight size={18} /></div><p className="mt-14 font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-background group-focus-visible:text-background"><time dateTime={guide.date}>{formatDate(guide.date)}</time> · {guide.readTime} min</p><h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.035em]">{guide.title}</h3><p className="mt-4 line-clamp-4 leading-7 text-muted-foreground group-hover:text-background group-focus-visible:text-background">{guide.description}</p></div>
    <div className="mt-10 flex flex-wrap gap-2">{guide.tags.map(tag => <span key={tag} className="border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider group-hover:border-background group-focus-visible:border-background">{tag}</span>)}</div>
  </Link>;
}
