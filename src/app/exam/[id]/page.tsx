import type { Metadata } from "next";
import { ExamPage } from "../../../components/ExamPage";
import { getCatalogEntry } from "../../../lib/catalog";
import { listCatalogIds } from "../../../lib/catalogIds";
import { absoluteUrl } from "../../../lib/site";

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

  const description = `Practice ${entry.title}: ${entry.durationMinutes}-minute timed mock with ${entry.questionCount} multiple-choice questions.`;

  return {
    title: entry.title,
    description,
    alternates: {
      canonical: `/exam/${id}/`,
    },
    openGraph: {
      title: entry.title,
      description,
      url: absoluteUrl(`/exam/${id}/`),
      type: "website",
    },
  };
}

export default function ExamRoute() {
  return <ExamPage />;
}
