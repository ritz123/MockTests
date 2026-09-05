import { ListChecks } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME } from "../lib/site";
import { ThemePicker } from "./ThemePicker";

type SitePageShellProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function SitePageShell({ children, mainClassName = "content-page" }: SitePageShellProps) {
  return (
    <div className="page">
      <header className="topbar">
        <Link href="/" className="brand">
          <ListChecks size={22} aria-hidden="true" />
          {SITE_NAME}
        </Link>
        <ThemePicker />
      </header>
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
