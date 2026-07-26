import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { getAllGuides } from "@/lib/mdx";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/guides",
    "/writing",
    "/projects",
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

  return [...routes, ...guides];
}
