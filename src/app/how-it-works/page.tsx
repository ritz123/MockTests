import type { Metadata } from "next";
import { HowItWorksPage } from "../../components/HowItWorksPage";
import { HOW_IT_WORKS_DESCRIPTION, HOW_IT_WORKS_TITLE } from "../../lib/pagesContent";
import { buildHowToJsonLd, SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: HOW_IT_WORKS_TITLE,
  description: HOW_IT_WORKS_DESCRIPTION,
  keywords: [...SITE_KEYWORDS, "how to take mock test", "timed aptitude test steps"],
  alternates: {
    canonical: "/how-it-works/",
  },
  openGraph: {
    title: `${HOW_IT_WORKS_TITLE} | ${SITE_NAME}`,
    description: HOW_IT_WORKS_DESCRIPTION,
    url: absoluteUrl("/how-it-works/"),
    type: "website",
  },
};

export default function HowItWorksRoute() {
  const howToJsonLd = buildHowToJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <HowItWorksPage />
    </>
  );
}
