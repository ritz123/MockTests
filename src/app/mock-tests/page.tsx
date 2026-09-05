import type { Metadata } from "next";
import { MockTestsPage } from "../../components/MockTestsPage";
import { loadCatalogFromDisk } from "../../lib/catalog";
import { MOCK_TESTS_DESCRIPTION, MOCK_TESTS_TITLE } from "../../lib/pagesContent";
import { buildMockTestsJsonLd, SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: MOCK_TESTS_TITLE,
  description: MOCK_TESTS_DESCRIPTION,
  keywords: [...SITE_KEYWORDS, "aptitude test list", "mock test catalog"],
  alternates: {
    canonical: "/mock-tests/",
  },
  openGraph: {
    title: `${MOCK_TESTS_TITLE} | ${SITE_NAME}`,
    description: MOCK_TESTS_DESCRIPTION,
    url: absoluteUrl("/mock-tests/"),
    type: "website",
  },
};

export default function MockTestsRoute() {
  const catalog = loadCatalogFromDisk();
  const mockTestsJsonLd = buildMockTestsJsonLd(catalog.tests);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mockTestsJsonLd) }}
      />
      <MockTestsPage />
    </>
  );
}
