"use client";

import { Clock3, ListChecks, Sparkles, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Catalog, CatalogEntry } from "../lib/schema";
import { clearSession, loadSession, type Session } from "../lib/session";
import { loadCatalog } from "../lib/tests";
import { AdSlot } from "./AdSlot";
import { HomeQuickLinks } from "./HomeQuickLinks";

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

  const inProgressEntry =
    session?.status === "in-progress" && catalog
      ? catalog.tests.find((entry) => entry.id === session.testId)
      : undefined;

  const totalQuestions = catalog?.tests.reduce((sum, entry) => sum + entry.questionCount, 0) ?? 0;

  const topics = [
    "Logical reasoning",
    "Quantitative aptitude",
    "Computer science",
    "Puzzles",
    "Algorithms",
    "Hackathon practicals",
  ];

  return (
    <div className="page">
      <HomeQuickLinks />

      <main className="home">
        <section className="hero" aria-labelledby="home-hero-title">
          <div className="hero-panel">
            <div className="hero-main">
              <p className="eyebrow">Unofficial interview mocks</p>
              <h1 id="home-hero-title">Practice timed papers for tech interviews and hackathons</h1>
              <p className="lede">
                Multiple-choice screens covering logical reasoning, quantitative aptitude, computer
                science, puzzles, algorithms, and hackathon practicals. Every new attempt gives you a
                fresh set of questions.
              </p>

              <ul className="hero-topics" aria-label="Topics covered">
                {topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>

              {inProgressEntry ? (
                <div className="hero-resume">
                  <p>
                    <Sparkles size={16} aria-hidden="true" />
                    You have an in-progress attempt on <strong>{inProgressEntry.title}</strong>.
                  </p>
                  <button
                    type="button"
                    className="button"
                    onClick={() => router.push(`/exam/${inProgressEntry.id}`)}
                  >
                    Resume now
                  </button>
                </div>
              ) : null}
            </div>

            <aside className="hero-aside" aria-label="Practice overview">
              <ul className="hero-stats">
                <li>
                  <span className="hero-stat-icon" aria-hidden="true">
                    <ListChecks size={20} />
                  </span>
                  <span className="hero-stat-copy">
                    <strong>{catalog ? catalog.tests.length : "—"}</strong>
                    <span>mock papers</span>
                  </span>
                </li>
                <li>
                  <span className="hero-stat-icon" aria-hidden="true">
                    <Timer size={20} />
                  </span>
                  <span className="hero-stat-copy">
                    <strong>{catalog ? totalQuestions : "—"}</strong>
                    <span>practice questions</span>
                  </span>
                </li>
                <li>
                  <span className="hero-stat-icon" aria-hidden="true">
                    <Clock3 size={20} />
                  </span>
                  <span className="hero-stat-copy">
                    <strong>Timed</strong>
                    <span>with instant review</span>
                  </span>
                </li>
              </ul>
            </aside>
          </div>
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
                  <button type="button" className="button" onClick={() => startTest(entry)}>
                    {actionLabel(entry)}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
      <AdSlot slotName="home-bottom" />
    </div>
  );
}
