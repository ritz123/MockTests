"use client";

import { Clock3, ListChecks, Sparkles, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Catalog, CatalogEntry } from "../lib/schema";
import { clearSession, loadSession, type Session } from "../lib/session";
import { HOME_TRUST_POINTS, contentUpdatedLabel } from "../lib/seo";
import { AdSlot } from "./AdSlot";
import { FaqList } from "./FaqList";
import { HomeQuickLinks } from "./HomeQuickLinks";

type HomePageProps = {
  catalog: Catalog;
};

export function HomePage({ catalog }: HomePageProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  function startTest(entry: CatalogEntry) {
    const current = loadSession();
    if (current?.status === "in-progress" && current.testId === entry.id) {
      router.push(`/exam/${entry.id}`);
      return;
    }
    if (current?.status === "in-progress" && current.testId !== entry.id) {
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
    session?.status === "in-progress"
      ? catalog.tests.find((entry) => entry.id === session.testId)
      : undefined;

  const totalQuestions = catalog.tests.reduce((sum, entry) => sum + entry.questionCount, 0);

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
      <main className="home">
        <section className="hero" aria-labelledby="home-hero-title">
          <div className="hero-panel">
            <div className="hero-main">
              <p className="eyebrow">Free online mock tests</p>
              <h1 id="home-hero-title">
                Free aptitude mock tests for tech interviews, placements and hackathons
              </h1>
              <p className="lede">
                Take timed multiple-choice papers covering logical reasoning, quantitative aptitude,
                computer science, puzzles, algorithms, and hackathon practicals. Every new attempt
                gives you a fresh set of questions — no login, no payment.
              </p>

              <ul className="hero-trust" aria-label="Why practise here">
                {HOME_TRUST_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

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
                    <strong>{catalog.tests.length}</strong>
                    <span>mock papers</span>
                  </span>
                </li>
                <li>
                  <span className="hero-stat-icon" aria-hidden="true">
                    <Timer size={20} />
                  </span>
                  <span className="hero-stat-copy">
                    <strong>{totalQuestions}</strong>
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

        <section className="seo-papers" aria-labelledby="home-papers-title">
          <h2 id="home-papers-title">Choose your mock test</h2>
          <p className="seo-intro-copy">
            Everything is free — pick a paper and start. Each new attempt draws a different mix from
            the question bank.
          </p>
          <ul className="paper-grid">
            {catalog.tests.map((entry) => (
              <li key={entry.id}>
                <article className="paper-card">
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
                  <button type="button" className="button" onClick={() => startTest(entry)}>
                    {actionLabel(entry)}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <p className="content-freshness">{contentUpdatedLabel()} · Every paper is free to start</p>

        <HomeQuickLinks />

        <FaqList id="home-faq" />
      </main>
      <AdSlot slotName="home-bottom" />
    </div>
  );
}
