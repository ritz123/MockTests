import { FAQ_PAGE_DESCRIPTION, FAQ_PAGE_TITLE } from "../lib/pagesContent";
import { FaqList } from "./FaqList";
import { SiteBreadcrumbs } from "./SiteBreadcrumbs";
import { SitePageShell } from "./SitePageShell";

export function FaqPage() {
  return (
    <SitePageShell>
      <article className="content-article">
        <SiteBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: "FAQ" },
          ]}
        />
        <p className="eyebrow">Help</p>
        <h1>{FAQ_PAGE_TITLE}</h1>
        <p className="lede">{FAQ_PAGE_DESCRIPTION}</p>
        <FaqList heading={false} />
      </article>
    </SitePageShell>
  );
}
