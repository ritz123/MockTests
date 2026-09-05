"use client";

import { AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { routeParam } from "../lib/route";
import type { CatalogEntry, Paper } from "../lib/schema";
import {
  clearSession,
  completeSession,
  loadSession,
  saveSession,
  startSession,
  type InProgressSession,
} from "../lib/session";
import { loadCatalog, loadTestPaper } from "../lib/tests";
import { formatMmSs, isWarning, optionLabel, remainingMs } from "../lib/time";
import { ThemePicker } from "./ThemePicker";
import { AdSlot } from "./AdSlot";

type ExamPageProps = {
  title?: string;
};

function ExamDocumentTitle({ title }: { title?: string }) {
  if (!title) return null;
  return <h1 className="exam-document-title">{title}</h1>;
}

export function ExamPage({ title }: ExamPageProps) {
  const id = routeParam(useParams().id);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [session, setSession] = useState<InProgressSession | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const submitting = useRef(false);
  const sessionRef = useRef<InProgressSession | null>(null);

  const persist = useCallback((next: InProgressSession) => {
    sessionRef.current = next;
    setSession(next);
    saveSession(next);
  }, []);

  const finishTest = useCallback(
    (autoSubmitted: boolean) => {
      const open = sessionRef.current;
      if (!open || submitting.current || !id) return;
      submitting.current = true;
      const done = completeSession(open, Date.now(), autoSubmitted);
      saveSession(done);
      router.replace(`/results/${id}`);
    },
    [id, router],
  );

  const skipTest = useCallback(() => {
    const open = sessionRef.current;
    const hasAnswers = open && Object.keys(open.answers).length > 0;
    if (hasAnswers) {
      const ok = window.confirm("Skip this test? Your answers will be discarded.");
      if (!ok) return;
    }
    submitting.current = true;
    sessionRef.current = null;
    clearSession();
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function boot() {
      const catalogResult = await loadCatalog();
      if (cancelled) return;
      if (!catalogResult.ok) {
        setError(catalogResult.error);
        return;
      }
      const entry: CatalogEntry | undefined = catalogResult.value.tests.find((item) => item.id === id);
      if (!entry) {
        setError("This paper is not in the catalog.");
        return;
      }
      const paperResult = await loadTestPaper(entry);
      if (cancelled) return;
      if (!paperResult.ok) {
        setError(paperResult.error);
        return;
      }
      if (paperResult.value.id !== id) {
        setError("This paper’s id does not match the catalog entry.");
        return;
      }
      const loaded = paperResult.value;
      setPaper(loaded);

      const existing = loadSession();
      if (existing?.status === "completed" && existing.testId === id) {
        router.replace(`/results/${id}`);
        return;
      }
      if (existing?.status === "in-progress" && existing.testId === id) {
        if (remainingMs(existing.endsAt, Date.now()) === 0) {
          submitting.current = true;
          saveSession(completeSession(existing, Date.now(), true));
          router.replace(`/results/${id}`);
          return;
        }
        setPaper(existing.paper);
        persist(existing);
        return;
      }
      persist(startSession(loaded.id, loaded, Date.now()));
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [id, persist, router]);

  useEffect(() => {
    if (!session) return;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      const open = sessionRef.current;
      if (!open) return;
      if (remainingMs(open.endsAt, current) === 0) {
        finishTest(true);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [session, finishTest]);

  if (error) {
    return (
      <div className="page">
        <main className="narrow">
          <ExamDocumentTitle title={title} />
          <div className="banner error" role="alert">
            <p>{error}</p>
            <Link href="/" className="button secondary">
              Back to papers
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!paper || !session) {
    return (
      <div className="page">
        <ExamDocumentTitle title={title} />
        <p className="status">Loading exam…</p>
      </div>
    );
  }

  const question = paper.questions[session.currentIndex];
  if (!question) {
    return (
      <div className="page">
        <ExamDocumentTitle title={title ?? paper.title} />
        <p className="status">This paper has no questions.</p>
      </div>
    );
  }

  const remaining = remainingMs(session.endsAt, now);
  const warning = isWarning(remaining);
  const answeredCount = paper.questions.filter((item) => session.answers[item.id] !== undefined).length;
  const selected = session.answers[question.id];
  const questionCount = paper.questions.length;
  const openSession = session;

  function goTo(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), questionCount - 1);
    persist({ ...openSession, currentIndex: nextIndex });
  }

  function choose(optionIndex: number) {
    persist({
      ...openSession,
      answers: { ...openSession.answers, [question.id]: optionIndex },
    });
  }

  return (
    <div className="page exam-page">
      <header className="exam-header">
        <div className="exam-header-start">
          <button type="button" className="button secondary" onClick={skipTest}>
            <ArrowLeft size={18} aria-hidden="true" />
            Skip test
          </button>
          <div>
            <ExamDocumentTitle title={title ?? paper.title} />
            <p className="progress">
              Answered {answeredCount} / {paper.questions.length}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className={warning ? "timer warning" : "timer"} aria-live="polite">
            {warning ? <AlertTriangle size={18} aria-hidden="true" /> : <Clock3 size={18} aria-hidden="true" />}
            <span className="timer-value">{formatMmSs(remaining)}</span>
            {warning ? <span className="timer-label">Time running out</span> : <span className="timer-label">Time left</span>}
          </div>
          <ThemePicker />
        </div>
      </header>

      <div className="exam-layout">
        <nav className="question-map" aria-label="Question map">
          {paper.questions.map((item, index) => {
            const answered = session.answers[item.id] !== undefined;
            return (
              <button
                key={item.id}
                type="button"
                className={`map-btn${answered ? " answered" : ""}${index === session.currentIndex ? " current" : ""}`}
                aria-current={index === session.currentIndex ? "true" : undefined}
                aria-label={`Question ${index + 1}, ${answered ? "answered" : "unanswered"}`}
                onClick={() => goTo(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </nav>

        <section className="question-panel">
          <p className="q-index">
            Question {session.currentIndex + 1} of {paper.questions.length}
            {question.difficulty ? (
              <span className={`difficulty-tag ${question.difficulty}`}> · {question.difficulty}</span>
            ) : null}
          </p>
          <h2 className="prompt">{question.prompt}</h2>
          <div role="radiogroup" aria-label="Answer choices" className="options">
            {question.options.map((option, index) => (
              <label key={`${question.id}-${index}`} className={selected === index ? "option selected" : "option"}>
                <input
                  type="radio"
                  name="answer"
                  checked={selected === index}
                  onChange={() => choose(index)}
                />
                <span className="letter">{optionLabel(index)}</span>
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className="exam-actions">
            <button
              type="button"
              className="button secondary"
              disabled={session.currentIndex === 0}
              onClick={() => goTo(session.currentIndex - 1)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Previous
            </button>
            {session.currentIndex === paper.questions.length - 1 ? (
              <button type="button" className="button" onClick={() => finishTest(false)}>
                View results
              </button>
            ) : (
              <button type="button" className="button secondary" onClick={() => goTo(session.currentIndex + 1)}>
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            )}
          </div>
            <AdSlot slotName="exam-below-question" />
        </section>
      </div>
    </div>
  );
}
