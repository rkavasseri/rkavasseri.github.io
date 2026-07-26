import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";

import { GitHubIcon, LinkedInIcon, OrcidIcon } from "@/components/brand-icons";
import { CopyEmail } from "@/components/copy-email";
import { NewsletterButton } from "@/components/newsletter-button";
import { Separator } from "@/components/ui/separator";
import {
  isPlaceholderLink,
  newsletter,
  siteConfig,
  socialLinks,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — email and academic profiles.`,
};

const profiles = [
  { label: "GitHub", href: socialLinks.github, icon: GitHubIcon },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedInIcon },
  { label: "Google Scholar", href: socialLinks.scholar, icon: GraduationCap },
  { label: "ORCID", href: socialLinks.orcid, icon: OrcidIcon },
].filter((profile) => !isPlaceholderLink(profile.href));

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-12 md:py-20">
      <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-muted-foreground">
          The fastest way to reach me is email. I read everything, though
          replies to unsolicited enquiries can take a while.
        </p>
      </header>

      <Separator className="my-10" />

      <section>
        <h2 className="mb-3 text-sm font-medium text-foreground">Email</h2>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="truncate font-mono text-sm text-primary underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
          <CopyEmail email={siteConfig.email} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium text-foreground">Newsletter</h2>
        <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted-foreground">
            <span className="font-medium text-foreground">
              {newsletter.name}
            </span>{" "}
            — occasional writing on machine learning and the systems that run
            it.
          </p>
          <NewsletterButton variant="outline" size="sm" compact />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium text-foreground">Profiles</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {profiles.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="flex-1 text-sm font-medium">{label}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium text-foreground">Office</h2>
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <address className="text-sm not-italic leading-6 text-muted-foreground">
            {siteConfig.department}
            <br />
            {siteConfig.college}
            <br />
            {siteConfig.institution}
            <br />
            {siteConfig.office}
          </address>
        </div>
      </section>
    </div>
  );
}
