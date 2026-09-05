import type { MetadataRoute } from "next";
import { loadCatalogFromDisk } from "../lib/catalog";
import { absoluteUrl } from "../lib/site";

export const dynamic = "force-static";

const SITEMAP_CHANGE_FREQUENCY = "weekly" as const;

function sitemapLastModified(): string {
  return new Date().toISOString().slice(0, 10);
}

function sitemapEntry(
  path: string,
  priority: number,
  lastModified: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: SITEMAP_CHANGE_FREQUENCY,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const catalog = loadCatalogFromDisk();
  const lastModified = sitemapLastModified();

  return [
    sitemapEntry("/MockTests/", 1, lastModified),
    sitemapEntry("/MockTests/about/", 0.8, lastModified),
    sitemapEntry("/MockTests/how-it-works/", 0.8, lastModified),
    sitemapEntry("/MockTests/mock-tests/", 0.9, lastModified),
    sitemapEntry("/MockTests/faq/", 0.8, lastModified),
    sitemapEntry("/MockTests/interview-prep-guide/", 0.9, lastModified),
    ...catalog.tests.map((entry) => sitemapEntry(`/MockTests/exam/${entry.id}/`, 0.8, lastModified)),
  ];
}
