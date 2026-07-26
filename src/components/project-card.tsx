import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText, Lock } from "lucide-react";

import { GitHubIcon } from "@/components/brand-icons";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/projects";

const linkMeta = [
  { key: "github", label: "Code", icon: GitHubIcon },
  { key: "demo", label: "Demo", icon: ExternalLink },
  { key: "paper", label: "Paper", icon: FileText },
] as const;

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      {/* Only render a media band when there's an actual image — an empty
          16:9 placeholder ate ~40% of the card height for no information. */}
      {project.image ? (
        <div className="relative aspect-[16/9] border-b border-border bg-muted">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : null}

      <CardHeader className="flex-none space-y-0 p-5 pb-3">
        <CardTitle className="text-base leading-snug">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-5 pt-0">
        <CardDescription className="line-clamp-5 text-sm leading-6">
          {project.description}
        </CardDescription>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {project.links || project.status ? (
        <CardFooter className="flex-none items-center gap-4 border-t border-border/60 p-5 py-3">
          {linkMeta.map(({ key, label, icon: Icon }) => {
            const href = project.links?.[key];
            if (!href) return null;
            const linkLabel = project.linkLabels?.[key] ?? label;
            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-4 w-4" />
                {linkLabel}
              </Link>
            );
          })}
          {project.status ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden />
              {project.status}
            </span>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
