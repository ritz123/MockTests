import Link from "next/link";
import { Clock3 } from "lucide-react";
import { loadCatalogFromDisk } from "../lib/catalog";
import { getExamBlurb } from "../lib/examBlurbs";
import { MOCK_TESTS_DESCRIPTION, MOCK_TESTS_TITLE } from "../lib/pagesContent";
import { SitePageShell } from "./SitePageShell";

export function MockTestsPage() {
  const catalog = loadCatalogFromDisk();

  return (
    <SitePageShell>
      <article className="content-article">
        <p className="eyebrow">Catalog</p>
        <h1>{MOCK_TESTS_TITLE}</h1>
        <p className="lede">{MOCK_TESTS_DESCRIPTION}</p>

        <ul className="mock-test-catalog">
          {catalog.tests.map((entry) => {
            const blurb = getExamBlurb(entry);
            return (
              <li key={entry.id}>
                <article className="mock-test-card">
                  <h2>
                    <Link href={`/exam/${entry.id}/`}>{entry.title}</Link>
                  </h2>
                  <p className="meta">
                    <span>
                      <Clock3 size={16} aria-hidden="true" />
                      {entry.durationMinutes} min
                    </span>
                    <span>{entry.questionCount} questions</span>
                  </p>
                  <p className="mock-test-summary">{blurb.summary}</p>
                  <Link href={`/exam/${entry.id}/`} className="button secondary mock-test-link">
                    Start mock test
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </article>
    </SitePageShell>
  );
}
