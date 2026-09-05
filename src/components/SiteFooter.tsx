import Link from "next/link";
import { loadCatalogFromDisk } from "../lib/catalog";
import { SITE_NAV_LINKS } from "../lib/siteNav";
import { SITE_AUTHOR, SITE_EMAIL, SITE_NAME } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const catalog = loadCatalogFromDisk();

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <p className="site-footer-name">{SITE_NAME}</p>
          <p className="site-footer-tagline">
            Free aptitude mock tests for tech interviews, campus placements, and hackathons —
            timed MCQs with instant review.
          </p>
        </div>

        <div>
          <h2 className="site-footer-heading">Platform</h2>
          <ul className="site-footer-links">
            {SITE_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className="site-footer-link" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer-heading">Popular tests</h2>
          <ul className="site-footer-links">
            {catalog.tests.map((entry) => (
              <li key={entry.id}>
                <Link className="site-footer-link" href={`/exam/${entry.id}/`}>
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer-heading">Connect</h2>
          <p className="site-footer-email">
            <a className="site-footer-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>
          </p>
        </div>
      </div>

      <p className="site-footer-copy">
        © {year} {SITE_AUTHOR}
      </p>

      <p className="site-footer-fine-print">
        Unofficial practice mocks — not affiliated with any employer. As an Amazon Associate, we earn
        from qualifying purchases.
      </p>
    </footer>
  );
}
