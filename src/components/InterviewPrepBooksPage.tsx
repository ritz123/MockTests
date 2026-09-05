import { INTERVIEW_PREP_BOOKS_DESCRIPTION, INTERVIEW_PREP_BOOKS_TITLE } from "../lib/pagesContent";
import { InterviewPrepBooks } from "./InterviewPrepBooks";
import { SiteBreadcrumbs } from "./SiteBreadcrumbs";
import { SitePageShell } from "./SitePageShell";

export function InterviewPrepBooksPage() {
  return (
    <SitePageShell>
      <article className="content-article">
        <SiteBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: "Interview prep books" },
          ]}
        />
        <p className="eyebrow">Resources</p>
        <h1>{INTERVIEW_PREP_BOOKS_TITLE}</h1>
        <p className="lede">{INTERVIEW_PREP_BOOKS_DESCRIPTION}</p>
        <InterviewPrepBooks heading="All recommended books" lede="" />
      </article>
    </SitePageShell>
  );
}
