import Link from "next/link";
import { loadCatalogFromDisk } from "../lib/catalog";
import { GUIDE_SECTIONS, INTERVIEW_PREP_GUIDE_DESCRIPTION, INTERVIEW_PREP_GUIDE_TITLE } from "../lib/interviewGuide";
import { SITE_AUTHOR, SITE_EMAIL } from "../lib/site";
import { SitePageShell } from "./SitePageShell";

export function InterviewPrepGuidePage() {
  const catalog = loadCatalogFromDisk();

  return (
    <SitePageShell mainClassName="guide">
      <article className="content-article guide-article">
        <p className="eyebrow">Interview preparation</p>
        <h1>{INTERVIEW_PREP_GUIDE_TITLE}</h1>
        <p className="lede">{INTERVIEW_PREP_GUIDE_DESCRIPTION}</p>

        {GUIDE_SECTIONS.map((section) => (
          <section key={section.id} className="guide-section" aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="guide-section" aria-labelledby="guide-mocks">
          <h2 id="guide-mocks">Practice with free timed mocks</h2>
          <p>
            Use the papers below to simulate real screening rounds. Each test runs in the browser with a
            countdown timer and a full answer review when you finish.
          </p>
          <p>
            <Link href="/mock-tests/">View the full mock test catalog</Link>
          </p>
          <ul className="seo-paper-links">
            {catalog.tests.map((entry) => (
              <li key={entry.id}>
                <Link href={`/exam/${entry.id}/`}>
                  {entry.title} — {entry.durationMinutes} min, {entry.questionCount} questions
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="guide-byline">
          Written by {SITE_AUTHOR}. Questions or feedback:{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
        </p>
      </article>
    </SitePageShell>
  );
}
