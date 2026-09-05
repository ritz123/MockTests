"use client";

import { ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { routeParam } from "../lib/route";
import type { Paper } from "../lib/schema";
import { scoreAttempt } from "../lib/scoring";
import {
  clearSession,
  loadSession,
  type CompletedSession,
} from "../lib/session";
import { formatMmSs, optionLabel } from "../lib/time";
import { ThemePicker } from "./ThemePicker";

export function ResultsPage() {
  const id = routeParam(useParams().id);
  const router = useRouter();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [session, setSession] = useState<CompletedSession | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const stored = loadSession();
    if (!stored || stored.status !== "completed" || stored.testId !== id) {
      setMissing(true);
      router.replace("/");
      return;
    }
    setSession(stored);
    setPaper(stored.paper);
  }, [id, router]);

  if (missing) {
    return (
      <div className="page">
        <p className="status">Returning to papers…</p>
      </div>
    );
  }

  if (!paper || !session) {
    return (
      <div className="page">
        <p className="status">Loading results…</p>
      </div>
    );
  }

  const score = scoreAttempt(paper, session.answers);
  const used = Math.max(0, session.submittedAt - session.startedAt);

  function newAttempt() {
    clearSession();
    router.push(`/exam/${id}`);
  }

  return (
    <div className="page">
      <main className="results">
        <header className="results-hero">
          <p className="eyebrow">{paper.title}</p>
          <h1>
            {score.correct} / {score.total}
          </h1>
          <p className="percent">{score.percent}%</p>
          <p className="meta-line">
            Time used {formatMmSs(used)}
            {session.autoSubmitted ? " · Time ran out" : null}
          </p>
          <div className="exam-actions">
            <Link href="/" className="button secondary">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to papers
            </Link>
            <button type="button" className="button" onClick={newAttempt}>
              <RotateCcw size={18} aria-hidden="true" />
              New attempt
            </button>
            <ThemePicker />
          </div>
        </header>

        <ol className="review-list">
          {paper.questions.map((question, index) => {
            const chosen = session.answers[question.id];
            const correct = chosen === question.correctIndex;
            return (
              <li key={question.id} className="review-card">
                <p className="q-index">Question {index + 1}</p>
                <h2 className="prompt">{question.prompt}</h2>
                <p className={correct ? "verdict correct" : "verdict incorrect"}>
                  {correct ? (
                    <>
                      <Check size={16} aria-hidden="true" /> Correct
                    </>
                  ) : (
                    <>
                      <X size={16} aria-hidden="true" /> Incorrect
                    </>
                  )}
                </p>
                <ul className="review-options">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.correctIndex;
                    const isChosen = chosen === optionIndex;
                    return (
                      <li
                        key={`${question.id}-${optionIndex}`}
                        className={`review-option${isCorrect ? " is-correct" : ""}${isChosen ? " is-chosen" : ""}`}
                      >
                        <span className="letter">{optionLabel(optionIndex)}</span>
                        <span>{option}</span>
                        {isCorrect ? <span className="tag">Correct answer</span> : null}
                        {isChosen ? <span className="tag">Your answer</span> : null}
                      </li>
                    );
                  })}
                </ul>
                {chosen === undefined ? <p className="muted">Not answered</p> : null}
                {question.explanation ? <p className="explanation">{question.explanation}</p> : null}
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
