import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, FileText, Lock } from "lucide-react";
import { GitHubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/projects";

const links = [{ key: "github", label: "Code", icon: GitHubIcon }, { key: "maritime", label: "Maritime SAR", icon: ExternalLink }, { key: "demo", label: "Launch", icon: ExternalLink }, { key: "paper", label: "Paper", icon: FileText }] as const;

export function ProjectCard({ project, index = 0, showDetails = false }: { project: Project; index?: number; showDetails?: boolean }) {
  return <article id={showDetails ? project.anchor : undefined} className="group grid border-t border-neutral-300 py-8 dark:border-neutral-700 md:grid-cols-12 md:gap-6">
    <div className="mb-5 md:col-span-2 md:mb-0"><span className="font-mono text-[10px] uppercase tracking-widest">SYS—0{index + 1}</span></div>
    <div className="md:col-span-3"><div className="project-grid relative aspect-[4/3] overflow-hidden border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"><span className="absolute right-4 top-4 font-mono text-[9px] font-medium uppercase tracking-widest">{project.status || "Operational"}</span><span className="absolute bottom-4 left-4 text-6xl font-semibold tracking-[-.06em]">0{index + 1}</span><div className="absolute bottom-4 left-4 right-4 h-px bg-current" /><div className="absolute bottom-4 left-[38%] h-1/2 w-px bg-current" /></div></div>
    <div className="mt-6 md:col-span-5 md:mt-0"><p className="font-mono text-[9px] font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-300">{project.category}</p><h3 className="mt-3 text-3xl font-semibold tracking-[-.035em]">{project.title}</h3><p className="mt-4 max-w-xl leading-7 text-neutral-600 dark:text-neutral-300">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.tech.map(t => <span key={t} className="border border-neutral-300 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider dark:border-neutral-600">{t}</span>)}</div></div>
    <div className="mt-7 flex flex-wrap items-start gap-4 md:col-span-2 md:mt-0 md:justify-end">{links.map(({ key, label, icon: Icon }) => { const href = project.links?.[key]; return href ? <Link key={key} href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><Icon className="h-4 w-4" />{project.linkLabels?.[key] ?? label}</Link> : null; })}{project.status && !project.links?.github ? <span className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"><Lock size={14} />{project.status}</span> : null}<Link href={project.anchor ? `/projects#${project.anchor}` : "/projects"} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" aria-label={`Details about ${project.title}`}>Details <ArrowRight size={15} /></Link></div>
    {showDetails && project.diagram ? (
      <figure className="mt-8 min-w-0 md:col-span-10 md:col-start-3">
        <a href={project.diagram.src} target="_blank" rel="noreferrer noopener" className="block border border-border bg-white" aria-label={`Open full-size ${project.title} workflow diagram`}>
          <Image src={project.diagram.src} alt={project.diagram.alt} width={project.diagram.width} height={project.diagram.height} sizes="(max-width: 767px) 100vw, 83vw" className="h-auto w-full" />
        </a>
        <figcaption className="mt-4 text-sm leading-6 text-muted-foreground">{project.diagram.caption}</figcaption>
        <a href={project.diagram.src} target="_blank" rel="noreferrer noopener" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Open full-size workflow diagram <ExternalLink size={14} aria-hidden /></a>
        <details className="mt-4 text-sm leading-6 text-muted-foreground">
          <summary className="cursor-pointer font-medium text-foreground">Workflow text summary</summary>
          <p className="mt-3 max-w-3xl">{project.diagram.summary}</p>
        </details>
      </figure>
    ) : null}
  </article>;
}
