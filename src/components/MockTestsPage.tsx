import Link from "next/link";
import { Clock3 } from "lucide-react";
import { loadCatalogFromDisk } from "../lib/catalog";
import { groupTestsByCategory } from "../lib/categories";
import { getExamBlurb } from "../lib/examBlurbs";
import { MOCK_TESTS_DESCRIPTION, MOCK_TESTS_TITLE } from "../lib/pagesContent";
import type { CatalogEntry } from "../lib/schema";
import { HOME_TRUST_POINTS, contentUpdatedLabel } from "../lib/seo";
import { FaqList } from "./FaqList";
import { SiteBreadcrumbs } from "./SiteBreadcrumbs";
import { SitePageShell } from "./SitePageShell";

function CatalogTestCard({ entry }: { entry: CatalogEntry }) {
  const blurb = getExamBlurb(entry);
  return (
    <article className="mock-test-card">
      <h3>
        <Link href={`/exam/${entry.id}/`}>{entry.title}</Link>
      </h3>
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
  );
}

export function MockTestsPage() {
  const catalog = loadCatalogFromDisk();
  const groups = groupTestsByCategory(catalog.tests);
  const ungrouped = catalog.tests.filter((entry) => !entry.assembly);

  return (
    <SitePageShell>
      <article className="content-article mock-tests-article">
        <SiteBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: "Mock tests" },
          ]}
        />
        <p className="eyebrow">Catalog</p>
        <h1>{MOCK_TESTS_TITLE}</h1>
        <p className="lede">{MOCK_TESTS_DESCRIPTION}</p>

        <ul className="hero-trust" aria-label="Catalog highlights">
          {HOME_TRUST_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <p className="content-freshness">
          {catalog.tests.length} free tests · {contentUpdatedLabel()}
        </p>

        {groups.map((group) => (
          <section
            key={group.category}
            className="catalog-group"
            aria-labelledby={`catalog-${group.category}`}
          >
            <h2 id={`catalog-${group.category}`}>{group.heading}</h2>
            <p className="catalog-group-pitch">{group.pitch}</p>
            <ul className="mock-test-catalog">
              {group.tests.map((entry) => (
                <li key={entry.id}>
                  <CatalogTestCard entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        {ungrouped.length > 0 ? (
          <section className="catalog-group" aria-labelledby="catalog-other">
            <h2 id="catalog-other">More papers</h2>
            <ul className="mock-test-catalog">
              {ungrouped.map((entry) => (
                <li key={entry.id}>
                  <CatalogTestCard entry={entry} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <FaqList id="catalog-faq" />
      </article>
    </SitePageShell>
  );
}
