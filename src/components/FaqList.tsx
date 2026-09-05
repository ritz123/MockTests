import Link from "next/link";
import { HOME_FAQ } from "../lib/seo";

type FaqListProps = {
  id?: string;
  title?: string;
};

export function FaqList({ id = "faq", title = "Frequently asked questions" }: FaqListProps) {
  return (
    <section className="seo-faq" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
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
