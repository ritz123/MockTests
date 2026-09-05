import Link from "next/link";
import { SITE_AUTHOR, SITE_EMAIL } from "../lib/site";

const FOOTER_LINKS = [
  { href: "/about/", label: "About" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/mock-tests/", label: "Mock tests" },
  { href: "/faq/", label: "FAQ" },
  { href: "/interview-prep-guide/", label: "Prep guide" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <nav className="site-footer-nav" aria-label="Site">
        {FOOTER_LINKS.map((link) => (
          <Link key={link.href} className="site-footer-link" href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <p className="site-footer-copy">© {year} {SITE_AUTHOR}</p>
      <p className="site-footer-email">
        <a className="site-footer-link" href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
      </p>

      <p className="site-footer-fine-print">
        Unofficial practice mocks — not affiliated with any employer. As an Amazon Associate, we earn
        from qualifying purchases.
      </p>
    </footer>
  );
}
