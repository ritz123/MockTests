import { ArrowLeft, Check, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import type { Paper } from "../lib/schema";
import { scoreAttempt } from "../lib/scoring";
import {
  loadSession,
  saveSession,
  startSession,
  type CompletedSession,
} from "../lib/session";
import { loadCatalog, loadPaper } from "../lib/tests";
import { formatMmSs, optionLabel } from "../lib/time";

export function ResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [session, setSession] = useState<CompletedSession | null>(null);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const stored = loadSession();
    if (!stored || stored.status !== "completed" || stored.testId !== id) {
      setMissing(true);
      return;
    }
    setSession(stored);

    async function load() {
      const catalogResult = await loadCatalog();
      if (!catalogResult.ok) {
        setError(catalogResult.error);
        return;
      }
      const entry = catalogResult.value.tests.find((item) => item.id === id);
      if (!entry) {
        setError("This paper is not in the catalog.");
        return;
      }
      const paperResult = await loadPaper(entry.file);
      if (!paperResult.ok) {
        setError(paperResult.error);
        return;
      }
      setPaper(paperResult.value);
    }

    void load();
  }, [id]);

  if (missing) {
    return <Navigate to="/" replace />;
  }

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
        <p className="status">Loading results…</p>
      </div>
    );
  }

  const score = scoreAttempt(paper, session.answers);
  const used = Math.max(0, session.submittedAt - session.startedAt);

  function retake() {
    if (!paper) return;
    saveSession(startSession(paper.id, paper.durationMinutes, Date.now()));
    void navigate(`/exam/${paper.id}`);
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
            {session.autoSubmitted ? " · Submitted automatically when time ran out" : " · Submitted by you"}
          </p>
          <div className="exam-actions">
            <Link to="/" className="button secondary">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to papers
            </Link>
            <button type="button" className="button" onClick={retake}>
              <RotateCcw size={18} aria-hidden="true" />
              Retake this paper
            </button>
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
                        key={option}
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
