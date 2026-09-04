import { AlertTriangle, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { CatalogEntry, Paper } from "../lib/schema";
import {
  completeSession,
  loadSession,
  saveSession,
  startSession,
  type InProgressSession,
} from "../lib/session";
import { loadCatalog, loadPaper } from "../lib/tests";
import { formatMmSs, isWarning, optionLabel, remainingMs } from "../lib/time";

export function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const submit = useCallback(
    (autoSubmitted: boolean) => {
      const open = sessionRef.current;
      if (!open || submitting.current || !id) return;
      if (!autoSubmitted) {
        const ok = window.confirm("Submit test? You cannot change answers after this.");
        if (!ok) return;
      }
      submitting.current = true;
      const done = completeSession(open, Date.now(), autoSubmitted);
      saveSession(done);
      void navigate(`/results/${id}`, { replace: true });
    },
    [id, navigate],
  );

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
      const paperResult = await loadPaper(entry.file);
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
        void navigate(`/results/${id}`, { replace: true });
        return;
      }
      if (existing?.status === "in-progress" && existing.testId === id) {
        if (remainingMs(existing.endsAt, Date.now()) === 0) {
          submitting.current = true;
          saveSession(completeSession(existing, Date.now(), true));
          void navigate(`/results/${id}`, { replace: true });
          return;
        }
        persist(existing);
        return;
      }
      persist(startSession(loaded.id, loaded.durationMinutes, Date.now()));
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [id, navigate, persist]);

  useEffect(() => {
    if (!session) return;
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      const open = sessionRef.current;
      if (!open) return;
      if (remainingMs(open.endsAt, current) === 0) {
        submit(true);
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [session, submit]);

  if (error) {
    return (
      <div className="page">
        <main className="narrow">
          <div className="banner error" role="alert">
            <p>{error}</p>
            <Link to="/" className="button secondary">
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
        <p className="status">Loading exam…</p>
      </div>
    );
  }

  const question = paper.questions[session.currentIndex];
  if (!question) {
    return (
      <div className="page">
        <p className="status">This paper has no questions.</p>
      </div>
    );
  }

  const remaining = remainingMs(session.endsAt, now);
  const warning = isWarning(remaining);
  const answeredCount = paper.questions.filter((item) => session.answers[item.id] !== undefined).length;
  const selected = session.answers[question.id];

  function goTo(index: number) {
    if (!session) return;
    const nextIndex = Math.min(Math.max(index, 0), paper.questions.length - 1);
    persist({ ...session, currentIndex: nextIndex });
  }

  function choose(optionIndex: number) {
    if (!session || !question) return;
    persist({
      ...session,
      answers: { ...session.answers, [question.id]: optionIndex },
    });
  }

  return (
    <div className="page exam-page">
      <header className="exam-header">
        <div>
          <p className="eyebrow">{paper.title}</p>
          <p className="progress">
            Answered {answeredCount} / {paper.questions.length}
          </p>
        </div>
        <div className={warning ? "timer warning" : "timer"} aria-live="polite">
          {warning ? <AlertTriangle size={18} aria-hidden="true" /> : <Clock3 size={18} aria-hidden="true" />}
          <span className="timer-value">{formatMmSs(remaining)}</span>
          {warning ? <span className="timer-label">Time running out</span> : <span className="timer-label">Time left</span>}
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
          </p>
          <h1 className="prompt">{question.prompt}</h1>
          <div role="radiogroup" aria-label="Answer choices" className="options">
            {question.options.map((option, index) => (
              <label key={option} className={selected === index ? "option selected" : "option"}>
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
            <button
              type="button"
              className="button secondary"
              disabled={session.currentIndex === paper.questions.length - 1}
              onClick={() => goTo(session.currentIndex + 1)}
            >
              Next
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="button danger" onClick={() => submit(false)}>
              Submit
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
