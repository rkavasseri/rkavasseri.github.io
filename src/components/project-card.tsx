import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, Lock } from "lucide-react";
import { GitHubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/projects";

const links = [{ key: "github", label: "Code", icon: GitHubIcon }, { key: "demo", label: "Launch", icon: ExternalLink }, { key: "paper", label: "Paper", icon: FileText }] as const;

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <article className="group grid border-t border-neutral-300 py-8 dark:border-neutral-700 md:grid-cols-12 md:gap-6">
    <div className="mb-5 md:col-span-2 md:mb-0"><span className="font-mono text-[10px] uppercase tracking-widest">SYS—0{index + 1}</span></div>
    <div className="md:col-span-3"><div className="project-grid relative aspect-[4/3] overflow-hidden border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"><span className="absolute right-4 top-4 font-mono text-[9px] font-medium uppercase tracking-widest">{project.status || "Operational"}</span><span className="absolute bottom-4 left-4 text-6xl font-semibold tracking-[-.06em]">0{index + 1}</span><div className="absolute bottom-4 left-4 right-4 h-px bg-current" /><div className="absolute bottom-4 left-[38%] h-1/2 w-px bg-current" /></div></div>
    <div className="mt-6 md:col-span-5 md:mt-0"><p className="font-mono text-[9px] font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-300">{project.category}</p><h3 className="mt-3 text-3xl font-semibold tracking-[-.035em]">{project.title}</h3><p className="mt-4 max-w-xl leading-7 text-neutral-600 dark:text-neutral-300">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.tech.map(t => <span key={t} className="border border-neutral-300 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider dark:border-neutral-600">{t}</span>)}</div></div>
    <div className="mt-7 flex flex-wrap items-start gap-4 md:col-span-2 md:mt-0 md:justify-end">{links.map(({ key, label, icon: Icon }) => { const href = project.links?.[key]; return href ? <Link key={key} href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><Icon className="h-4 w-4" />{project.linkLabels?.[key] ?? label}</Link> : null; })}{project.status && !project.links?.github ? <span className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"><Lock size={14} />{project.status}</span> : null}<Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Details <ArrowRight size={15} /></Link></div>
  </article>;
}
