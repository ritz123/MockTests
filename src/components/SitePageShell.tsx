import type { ReactNode } from "react";

type SitePageShellProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function SitePageShell({ children, mainClassName = "content-page" }: SitePageShellProps) {
  return (
    <div className="page">
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
