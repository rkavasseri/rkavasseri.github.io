import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";

import {
  GitHubIcon,
  LinkedInIcon,
  OrcidIcon,
} from "@/components/brand-icons";
import { NewsletterButton } from "@/components/newsletter-button";
import {
  isPlaceholderLink,
  newsletters,
  siteConfig,
  socialLinks,
} from "@/lib/constants";

const iconLinks = [
  { href: socialLinks.github, label: "GitHub", icon: GitHubIcon },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: socialLinks.scholar, label: "Google Scholar", icon: GraduationCap },
  { href: socialLinks.orcid, label: "ORCID", icon: OrcidIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail },
].filter(({ href }) => !isPlaceholderLink(href));

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 border-x border-border px-5 py-8 sm:flex-row sm:items-center lg:px-10">
        <p className="text-sm text-muted-foreground">
          Newsletters on machine learning, systems, and shipping software —{" "}
          <Link
            href="/writing"
            className="font-medium text-foreground underline underline-offset-4"
          >
            {newsletters.map((n) => n.name).join(" and ")}
          </Link>
          .
        </p>
        <NewsletterButton variant="outline" size="sm" compact />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 border-x border-t border-border px-5 py-8 sm:flex-row sm:items-center lg:px-10">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with{" "}
          <Link
            href="https://nextjs.org"
            className="underline underline-offset-4 hover:text-foreground"
            target="_blank"
            rel="noreferrer noopener"
          >
            Next.js
          </Link>
          .
        </p>

        <div className="flex items-center gap-1">
          {iconLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
