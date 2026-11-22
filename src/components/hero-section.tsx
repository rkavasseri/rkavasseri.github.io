import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import { cvPath, hasCv, siteConfig, socialLinks } from "@/lib/constants";

const disciplines = [
  "AI Safety & Verification",
  "Foundational AI",
  "AI for Science",
  "Production AI",
  "Research Infrastructure",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-foreground">
      <div className="technical-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1440px] px-5 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col justify-between border-x border-foreground bg-background/95 px-5 py-8 sm:px-10 lg:col-span-9 lg:py-12">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.2em]">
            <span className="flex items-center gap-3"><i className="h-2 w-2 bg-foreground" /> Researcher · Engineer · Academic leader</span>
            <span className="hidden sm:block">Brookings / South Dakota</span>
          </div>

          <div className="py-16 lg:py-20">
            <p className="mb-6 font-mono text-[10px] font-medium uppercase tracking-[.22em] sm:text-xs">
              Full-Stack Academic AI
            </p>
            <h1 className="max-w-5xl text-[clamp(3.75rem,9.2vw,8.75rem)] font-semibold leading-[.84] tracking-[-.065em]">
              Rajesh<br />Kavasseri<span aria-hidden>.</span>
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-8 md:text-2xl">
              I build AI systems for researchers and teach people how to use and evaluate them. At South Dakota State University, I’m a professor of electrical engineering, Associate Dean for Research, and Co-Executive Director of the Center for AI Innovation and Emergent Technologies. I helped launch SDSU’s AI Engineering program and lead the Science Commons pilot through the center. Trained in control engineering for electric power systems, I’m now working on what it would take to make AI safe the way engineered systems are: by guarantee, not by average-case testing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="tech-button bg-foreground text-background">
                Explore the work <ArrowRight size={17} />
              </Link>
              {hasCv ? (
                <a href={cvPath} download className="tech-button border border-foreground bg-background">
                  Download CV <ArrowDown size={17} />
                </a>
              ) : (
                <Link href="/about" className="tech-button border border-foreground bg-background">
                  About me
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-5 font-mono text-[10px] uppercase tracking-wider">
            <span>Scroll to explore</span><ArrowDown size={16} />
          </div>
        </div>

        <aside className="relative hidden overflow-hidden border-r border-neutral-950 bg-neutral-950 text-white dark:border-neutral-700 lg:col-span-3 lg:flex lg:flex-col lg:justify-between lg:p-8">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[.16em] text-neutral-400">
            <span>Profile / 001</span><span className="flex items-center gap-2 text-white"><i className="status-pulse h-1.5 w-1.5 bg-white" /> Active</span>
          </div>
          <div className="my-8">
            <div className="relative aspect-[4/5] overflow-hidden border border-neutral-700 grayscale">
              <Image src="/images/rk_pp.jpg" alt={`${siteConfig.name}, ${siteConfig.title}`} fill priority sizes="25vw" className="object-cover object-[50%_35%]" />
              <div className="scan-lines absolute inset-0" aria-hidden />
              <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-widest">RK / faculty profile</span>
            </div>
            <div className="mt-5 border border-neutral-700 font-mono text-[9px] uppercase tracking-wider">
              {disciplines.map((item, index) => <div key={item} className="flex justify-between border-b border-neutral-700 px-3 py-3 last:border-0"><span className="text-neutral-400">0{index + 1} — {item}</span><span>+</span></div>)}
            </div>
          </div>
          <a href={socialLinks.scholar} target="_blank" rel="noreferrer noopener" className="flex items-center justify-between border-t border-neutral-700 pt-4 font-mono text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white">
            Publications <ArrowUpRight size={14} />
          </a>
        </aside>
      </div>
    </section>
  );
}
