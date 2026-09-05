"use client";

import { Clock3, ListChecks } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Catalog, CatalogEntry } from "../lib/schema";
import { clearSession, loadSession, type Session } from "../lib/session";
import { loadCatalog } from "../lib/tests";
import { ThemePicker } from "./ThemePicker";

export function HomePage() {
  const router = useRouter();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    setSession(loadSession());
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
    if (session?.status === "in-progress" && session.testId === entry.id) {
      router.push(`/exam/${entry.id}`);
      return;
    }
    if (session?.status === "in-progress" && session.testId !== entry.id) {
      const ok = window.confirm("Start this test? Your current attempt will be discarded.");
      if (!ok) return;
    }
    clearSession();
    router.push(`/exam/${entry.id}`);
  }

  function actionLabel(entry: CatalogEntry): string {
    if (session?.status === "in-progress" && session.testId === entry.id) {
      return "Resume";
    }
    if (session?.status === "completed" && session.testId === entry.id) {
      return "New attempt";
    }
    return "Start";
  }

  return (
    <div className="page">
      <header className="topbar">
        <Link href="/" className="brand">
          <ListChecks size={22} aria-hidden="true" />
          Aptitude Practice
        </Link>
        <ThemePicker />
      </header>

      <main className="home">
        <section className="hero">
          <p className="eyebrow">Unofficial interview mocks</p>
          <h1>Practice timed papers for tech interviews and hackathons</h1>
          <p className="lede">
            Multiple-choice screens covering logical reasoning, quantitative aptitude, computer
            science, puzzles, algorithms, and hackathon practicals.
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
                    {actionLabel(entry)}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
}
