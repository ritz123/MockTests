export type SiteNavLink = {
  href: string;
  label: string;
};

export const SITE_NAV_LINKS: SiteNavLink[] = [
  { href: "/about/", label: "About" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/mock-tests/", label: "Mock tests" },
  { href: "/faq/", label: "FAQ" },
  { href: "/interview-prep-guide/", label: "Prep guide" },
  { href: "/interview-prep-books/", label: "Prep books" },
];
