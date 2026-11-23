import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { getAllBenchProjects } from "@/lib/livebench";
import { getAllGuides } from "@/lib/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/guides",
    "/writing",
    "/projects",
    "/livebench",
    "/about",
    "/contact",
  ].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const guides = getAllGuides().map((guide) => ({
    url: `${siteConfig.url}/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const bench = getAllBenchProjects().map((project) => ({
    url: `${siteConfig.url}/livebench/${project.slug}`,
    lastModified: new Date(project.updated),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...guides, ...bench];
}
