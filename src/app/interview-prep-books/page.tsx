import type { Metadata } from "next";
import { InterviewPrepBooksPage } from "../../components/InterviewPrepBooksPage";
import { INTERVIEW_PREP_BOOKS_DESCRIPTION, INTERVIEW_PREP_BOOKS_TITLE } from "../../lib/pagesContent";
import { SITE_KEYWORDS } from "../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: INTERVIEW_PREP_BOOKS_TITLE,
  description: INTERVIEW_PREP_BOOKS_DESCRIPTION,
  keywords: [
    ...SITE_KEYWORDS,
    "interview preparation books",
    "coding interview books",
    "aptitude books",
    "job interview books India",
  ],
  alternates: {
    canonical: "/interview-prep-books/",
  },
  openGraph: {
    title: `${INTERVIEW_PREP_BOOKS_TITLE} | ${SITE_NAME}`,
    description: INTERVIEW_PREP_BOOKS_DESCRIPTION,
    url: absoluteUrl("/interview-prep-books/"),
    type: "website",
  },
};

export default function InterviewPrepBooksRoute() {
  return <InterviewPrepBooksPage />;
}
