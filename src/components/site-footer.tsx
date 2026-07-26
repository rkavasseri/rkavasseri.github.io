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
  newsletter,
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
    <footer className="border-t border-border">
      <div className="container flex max-w-6xl flex-col items-center justify-between gap-3 border-b border-border py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {newsletter.name}
          </span>{" "}
          — writing on machine learning and the systems that run it.
        </p>
        <NewsletterButton variant="outline" size="sm" compact />
      </div>

      <div className="container flex max-w-6xl flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
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
