import { SITE_AUTHOR } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer-copy">
        © {year} {SITE_AUTHOR}. All rights reserved.
      </p>
      <p className="site-footer-note">
        Unofficial practice mocks for interview preparation. Not affiliated with any employer.
      </p>
      <p className="site-footer-note">
        As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </footer>
  );
}
