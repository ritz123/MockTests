import { SITE_AUTHOR, SITE_EMAIL } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
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
