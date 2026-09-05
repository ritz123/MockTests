export const SITE_NAME = "Aptitude Practice";

export const SITE_AUTHOR = "Biplab Sarkar";

export const SITE_DESCRIPTION =
  "Free timed multiple-choice mock tests for tech interviews and hackathons. Practice logical reasoning, quantitative aptitude, computer science, puzzles, algorithms, and practical skills.";

export const SITE_KEYWORDS = [
  "aptitude practice",
  "mock test",
  "tech interview",
  "hackathon",
  "logical reasoning",
  "quantitative aptitude",
  "computer science quiz",
  "coding interview prep",
];

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return "http://localhost:3000";
}

function withTrailingSlash(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteUrl(path: string): string {
  const root = getSiteUrl();
  const normalized = withTrailingSlash(path);
  if (normalized === "/") return `${root}/`;
  return `${root}${normalized}`;
}
