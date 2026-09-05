"use client";

import { ListChecks } from "lucide-react";
import Link from "next/link";
import { SITE_NAV_LINKS } from "../lib/siteNav";
import { SITE_NAME } from "../lib/site";
import { ThemePicker } from "./ThemePicker";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <ListChecks size={22} aria-hidden="true" />
          {SITE_NAME}
        </Link>

        <nav className="site-header-nav" aria-label="Site">
          {SITE_NAV_LINKS.map((link) => (
            <Link key={link.href} className="site-header-link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemePicker />
      </div>
    </header>
  );
}
