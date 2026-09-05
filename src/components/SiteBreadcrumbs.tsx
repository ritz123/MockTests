import Link from "next/link";

export type Crumb = {
  href?: string;
  label: string;
};

type SiteBreadcrumbsProps = {
  items: Crumb[];
};

export function SiteBreadcrumbs({ items }: SiteBreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {item.href && !last ? <Link href={item.href}>{item.label}</Link> : item.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
