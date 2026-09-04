import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <main className="narrow status">
        <h1>Page not found</h1>
        <p className="muted">That paper or page does not exist.</p>
        <Link href="/" className="button">
          Back to papers
        </Link>
      </main>
    </div>
  );
}
