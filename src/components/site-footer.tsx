import Link from "next/link";
import { Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { siteConfig, socialLinks } from "@/lib/constants";

const iconLinks = [
  { href: socialLinks.github, label: "GitHub", icon: GitHubIcon },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
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
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
