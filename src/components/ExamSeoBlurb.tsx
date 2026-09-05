import Link from "next/link";
import type { CatalogEntry } from "../lib/schema";
import { getExamBlurb } from "../lib/examBlurbs";

type ExamSeoBlurbProps = {
  entry: CatalogEntry;
};

export function ExamSeoBlurb({ entry }: ExamSeoBlurbProps) {
  const blurb = getExamBlurb(entry);

  return (
    <section className="exam-seo-blurb howto" aria-labelledby={`exam-blurb-${entry.id}`}>
      <h2 id={`exam-blurb-${entry.id}`}>About this mock test</h2>
      <p>{blurb.summary}</p>

      {blurb.topics.length > 0 ? (
        <>
          <h3>Topics covered</h3>
          <ul className="exam-blurb-list">
            {blurb.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </>
      ) : null}

      {blurb.tips.length > 0 ? (
        <>
          <h3>Quick tips</h3>
          <ul className="exam-blurb-list">
            {blurb.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </>
      ) : null}

      <p className="exam-blurb-meta">
        {entry.durationMinutes} minutes · {entry.questionCount} questions ·{" "}
        <Link href="/faq/">FAQ</Link>
      </p>
    </section>
  );
}
