export const SITE_NAME = "Aptitude Practice";

export const SITE_AUTHOR = "Biplab Sarkar";

export const SITE_EMAIL = "sarkarbiplab@gmail.com";

export const GOOGLE_SITE_VERIFICATION = "L7idfwiSDQIrJ-_bCSbmyFOVscDEEa6vjZNWfPE1FAc";

export function getGoogleSiteVerification(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return fromEnv || GOOGLE_SITE_VERIFICATION;
}

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
