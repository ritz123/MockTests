import { HOME_FAQ } from "../lib/seo";
import { FAQ_PAGE_DESCRIPTION, FAQ_PAGE_TITLE } from "../lib/pagesContent";
import { SitePageShell } from "./SitePageShell";

export function FaqPage() {
  return (
    <SitePageShell>
      <article className="content-article">
        <p className="eyebrow">Help</p>
        <h1>{FAQ_PAGE_TITLE}</h1>
        <p className="lede">{FAQ_PAGE_DESCRIPTION}</p>

        <dl className="faq-list">
          {HOME_FAQ.map((item) => (
            <div key={item.question} className="faq-item">
              <dt>{item.question}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </article>
    </SitePageShell>
  );
}
