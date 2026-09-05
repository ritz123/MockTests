import type { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import { loadCatalogFromDisk } from "../lib/catalog";
import { HOME_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, buildHomeJsonLd } from "../lib/seo";
import { SITE_NAME, absoluteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${HOME_TITLE} | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${HOME_TITLE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function Home() {
  const catalog = loadCatalogFromDisk();
  const homeJsonLd = buildHomeJsonLd(catalog.tests);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomePage catalog={catalog} />
    </>
  );
}
