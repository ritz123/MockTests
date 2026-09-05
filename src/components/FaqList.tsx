import { HOME_FAQ } from "../lib/seo";

type FaqListProps = {
  id?: string;
  title?: string;
  heading?: boolean;
};

export function FaqList({
  id = "faq",
  title = "Frequently asked questions",
  heading = true,
}: FaqListProps) {
  return (
    <section className="seo-faq" aria-labelledby={heading ? `${id}-title` : undefined} aria-label={heading ? undefined : title}>
      {heading ? <h2 id={`${id}-title`}>{title}</h2> : null}
      <dl className="faq-list">
        {HOME_FAQ.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
