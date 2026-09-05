import Link from "next/link";
import { HOW_IT_WORKS_DESCRIPTION, HOW_IT_WORKS_STEPS, HOW_IT_WORKS_TITLE } from "../lib/pagesContent";
import { SitePageShell } from "./SitePageShell";

export function HowItWorksPage() {
  return (
    <SitePageShell>
      <article className="content-article">
        <p className="eyebrow">Getting started</p>
        <h1>{HOW_IT_WORKS_TITLE}</h1>
        <p className="lede">{HOW_IT_WORKS_DESCRIPTION}</p>

        <ol className="howto-steps">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.name} className="howto-step">
              <p className="howto-step-index">Step {index + 1}</p>
              <h2>{step.name}</h2>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="content-cta">
          Ready to practise? <Link href="/">Browse mock papers on the home page</Link> or see the{" "}
          <Link href="/mock-tests/">full test catalog</Link>.
        </p>
      </article>
    </SitePageShell>
  );
}
