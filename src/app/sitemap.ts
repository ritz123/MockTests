import type { MetadataRoute } from "next";
import { loadCatalogFromDisk } from "../lib/catalog";
import { absoluteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const catalog = loadCatalogFromDisk();
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...catalog.tests.map((entry) => ({
      url: absoluteUrl(`/exam/${entry.id}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
