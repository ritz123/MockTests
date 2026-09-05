import Link from "next/link";
import { HOME_QUICK_LINKS } from "../lib/pagesContent";

export function HomeQuickLinks() {
  return (
    <section className="home-quick-links" aria-labelledby="home-quick-links-title">
      <h2 id="home-quick-links-title">Resources</h2>
      <ul className="quick-links-grid">
        {HOME_QUICK_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="quick-link-card">
              <span className="quick-link-title">{link.title}</span>
              <span className="quick-link-description">{link.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
