import type { Metadata } from "next";
import { ExamPage } from "../../../components/ExamPage";
import { ExamSeoBlurb } from "../../../components/ExamSeoBlurb";
import { getCatalogEntry } from "../../../lib/catalog";
import { listCatalogIds } from "../../../lib/catalogIds";
import { buildExamJsonLd, examKeywords, examMetaDescription, examMetadataTitle } from "../../../lib/seo";
import { SITE_NAME, absoluteUrl } from "../../../lib/site";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return listCatalogIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = getCatalogEntry(id);
  if (!entry) {
    return { title: "Exam" };
  }

  const description = examMetaDescription(entry);
  const keywords = examKeywords(entry);

  return {
    title: examMetadataTitle(entry),
    description,
    keywords,
    alternates: {
      canonical: `/exam/${id}/`,
    },
    openGraph: {
      title: `${examMetadataTitle(entry)} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/exam/${id}/`),
      type: "website",
    },
    twitter: {
      card: "summary",
      title: entry.title,
      description,
    },
  };
}

export default async function ExamRoute({ params }: PageProps) {
  const { id } = await params;
  const entry = getCatalogEntry(id);
  const examJsonLd = entry ? buildExamJsonLd(entry) : null;

  return (
    <>
      {examJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(examJsonLd) }}
        />
      ) : null}
      <ExamPage title={entry?.title} />
      {entry ? (
        <div className="page exam-seo">
          <ExamSeoBlurb entry={entry} />
        </div>
      ) : null}
    </>
  );
}
