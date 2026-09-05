import type { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Timed Mock Tests for Tech Interviews & Hackathons",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Timed Mock Tests for Tech Interviews & Hackathons | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: absoluteUrl("/"),
  inLanguage: "en-US",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePage />
    </>
  );
}
