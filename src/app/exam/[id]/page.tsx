import { ExamPage } from "../../../components/ExamPage";
import { listCatalogIds } from "../../../lib/catalogIds";

export function generateStaticParams() {
  return listCatalogIds().map((id) => ({ id }));
}

export default function ExamRoute() {
  return <ExamPage />;
}
