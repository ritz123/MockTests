import type { Metadata } from "next";
import { ResultsPage } from "../../../components/ResultsPage";
import { getCatalogEntry } from "../../../lib/catalog";
import { listCatalogIds } from "../../../lib/catalogIds";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return listCatalogIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = getCatalogEntry(id);
  const title = entry ? `${entry.title} — Results` : "Results";

  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function ResultsRoute() {
  return <ResultsPage />;
}
