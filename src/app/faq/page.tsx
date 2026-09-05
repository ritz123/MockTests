import type { Metadata } from "next";
import { FaqPage } from "../../components/FaqPage";
import { FAQ_PAGE_DESCRIPTION, FAQ_PAGE_TITLE } from "../../lib/pagesContent";
import { buildFaqJsonLd, SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: FAQ_PAGE_TITLE,
  description: FAQ_PAGE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS, "aptitude test FAQ", "mock test questions"],
  alternates: {
    canonical: "/faq/",
  },
  openGraph: {
    title: `${FAQ_PAGE_TITLE} | ${SITE_NAME}`,
    description: FAQ_PAGE_DESCRIPTION,
    url: absoluteUrl("/faq/"),
    type: "website",
  },
};

export default function FaqRoute() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqPage />
    </>
  );
}
