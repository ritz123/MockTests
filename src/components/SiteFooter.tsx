import { SITE_NAME } from "../lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer-copy">
        © {year} {SITE_NAME}. All rights reserved.
      </p>
      <p className="site-footer-note">
        Unofficial practice mocks for interview preparation. Not affiliated with any employer.
      </p>
    </footer>
  );
}
