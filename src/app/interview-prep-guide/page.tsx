import type { Metadata } from "next";
import { InterviewPrepGuidePage } from "../../components/InterviewPrepGuidePage";
import {
  INTERVIEW_PREP_GUIDE_DESCRIPTION,
  INTERVIEW_PREP_GUIDE_TITLE,
  buildGuideJsonLd,
} from "../../lib/interviewGuide";
import { SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: INTERVIEW_PREP_GUIDE_TITLE,
  description: INTERVIEW_PREP_GUIDE_DESCRIPTION,
  keywords: [
    ...SITE_KEYWORDS,
    "interview preparation guide",
    "aptitude preparation plan",
    "campus placement aptitude",
    "software engineer interview tips",
  ],
  alternates: {
    canonical: "/interview-prep-guide/",
  },
  openGraph: {
    title: `${INTERVIEW_PREP_GUIDE_TITLE} | ${SITE_NAME}`,
    description: INTERVIEW_PREP_GUIDE_DESCRIPTION,
    url: absoluteUrl("/interview-prep-guide/"),
    type: "article",
  },
};

export default function InterviewPrepGuideRoute() {
  const guideJsonLd = buildGuideJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />
      <InterviewPrepGuidePage />
    </>
  );
}
