import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";

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
      {project.image ? (
        <div className="relative aspect-[16/9] border-b border-border bg-muted">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          className="flex aspect-[16/9] items-center justify-center border-b border-border bg-gradient-to-br from-muted to-accent"
          aria-hidden
        >
          <span className="font-mono text-3xl font-semibold text-muted-foreground/40">
            {project.title
              .split(" ")
              .slice(0, 3)
              .map((word) => word[0])
              .join("")}
          </span>
        </div>
      )}

      <CardHeader className="flex-none">
        <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <CardDescription className="leading-6">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {project.links ? (
        <CardFooter className="flex-none gap-4">
          {linkMeta.map(({ key, label, icon: Icon }) => {
            const href = project.links?.[key];
            if (!href) return null;
            return (
              <Link
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </CardFooter>
      ) : null}
    </Card>
  );
}
