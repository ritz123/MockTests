import Link from "next/link";
import { ABOUT_DESCRIPTION, ABOUT_INTRO, ABOUT_TITLE } from "../lib/pagesContent";
import { SITE_AUTHOR, SITE_EMAIL } from "../lib/site";
import { SitePageShell } from "./SitePageShell";

export function AboutPage() {
  return (
    <SitePageShell>
      <article className="content-article">
        <p className="eyebrow">About</p>
        <h1>{ABOUT_TITLE}</h1>
        <p className="lede">{ABOUT_DESCRIPTION}</p>

        {ABOUT_INTRO.map((paragraph) => (
          <p key={paragraph} className="content-paragraph">{paragraph}</p>
        ))}

        <section className="content-section" aria-labelledby="about-more">
          <h2 id="about-more">Learn more</h2>
          <ul className="seo-paper-links">
            <li>
              <Link href="/how-it-works/">How it works</Link>
            </li>
            <li>
              <Link href="/mock-tests/">All mock tests</Link>
            </li>
            <li>
              <Link href="/faq/">Frequently asked questions</Link>
            </li>
            <li>
              <Link href="/interview-prep-guide/">Interview prep guide</Link>
            </li>
          </ul>
        </section>

        <p className="guide-byline">
          {SITE_AUTHOR} · <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
        </p>
      </article>
    </SitePageShell>
  );
}
