import { ResultsPage } from "../../../components/ResultsPage";
import { listCatalogIds } from "../../../lib/catalogIds";

export function generateStaticParams() {
  return listCatalogIds().map((id) => ({ id }));
}

export default function ResultsRoute() {
  return <ResultsPage />;
}
