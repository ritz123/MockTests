import type { Metadata } from "next";
import { AboutPage } from "../../components/AboutPage";
import { ABOUT_DESCRIPTION, ABOUT_TITLE } from "../../lib/pagesContent";
import { SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: [...SITE_KEYWORDS, "about aptitude practice", "free interview mock tests"],
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: `${ABOUT_TITLE} | ${SITE_NAME}`,
    description: ABOUT_DESCRIPTION,
    url: absoluteUrl("/about/"),
    type: "website",
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
