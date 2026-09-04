"use client";

import { Clock3, ListChecks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Catalog, CatalogEntry } from "../lib/schema";
import { loadSession } from "../lib/session";
import { loadCatalog } from "../lib/tests";

export function HomePage() {
  const router = useRouter();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    void loadCatalog().then((result) => {
      setLoading(false);
      if (!result.ok) {
        setCatalog(null);
        setError(result.error);
        return;
      }
      setCatalog(result.value);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function startTest(entry: CatalogEntry) {
    const session = loadSession();
    if (session?.status === "in-progress" && session.testId !== entry.id) {
      const ok = window.confirm("Start this test? Your current attempt will be discarded.");
      if (!ok) return;
    }
    router.push(`/exam/${entry.id}`);
  }

  return (
    <div className="page">
      <header className="topbar">
        <Link href="/" className="brand">
          <ListChecks size={22} aria-hidden="true" />
          Aptitude Practice
        </Link>
      </header>

      <main className="home">
        <section className="hero">
          <p className="eyebrow">Unofficial interview mocks</p>
          <h1>Practice timed papers for Google-style and hackathon interviews</h1>
          <p className="lede">
            Multiple-choice screens covering logical reasoning, quantitative aptitude, computer
            science, puzzles, algorithms, and hackathon practicals. Not affiliated with Google.
          </p>
        </section>

        {loading ? <p className="status">Loading papers…</p> : null}
        {error ? (
          <div className="banner error" role="alert">
            <p>{error}</p>
            <button type="button" className="button" onClick={refresh}>
              Retry
            </button>
          </div>
        ) : null}

        {catalog ? (
          <ul className="paper-grid">
            {catalog.tests.map((entry) => (
              <li key={entry.id}>
                <article className="paper-card">
                  <h2>{entry.title}</h2>
                  <p className="meta">
                    <span>
                      <Clock3 size={16} aria-hidden="true" />
                      {entry.durationMinutes} min
                    </span>
                    <span>{entry.questionCount} questions</span>
                  </p>
                  <button type="button" className="button" onClick={() => startTest(entry)}>
                    Start
                  </button>
                </article>
              </li>
            ))}
          </ul>
        ) : null}

        <section className="howto">
          <h2>Add a paper later</h2>
          <ol>
            <li>
              Copy <code>public/tests/_template.json</code> to a new file in the same folder.
            </li>
            <li>Fill in the title, duration, and multiple-choice questions.</li>
            <li>
              Register the file in <code>public/tests/index.json</code>.
            </li>
            <li>Refresh this page.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
