export const SITE_NAME = "Aptitude Practice";

export const SITE_AUTHOR = "Biplab Sarkar";

export const SITE_EMAIL = "sarkarbiplab@gmail.com";

export const GOOGLE_SITE_VERIFICATION = "L7idfwiSDQIrJ-_bCSbmyFOVscDEEa6vjZNWfPE1FAc";

/**
 * Google Tag Manager container installed on every page.
 *
 * This container (GTM-W6RLWLDZ) already sends hits to the GA4 measurement ID
 * G-279S33F9E5. Its published tag includes the initial page view, history-change
 * page views (so Next.js client navigations are counted), and the enhanced
 * measurement events configured in the container (scroll, outbound click,
 * download, site search, video, form).
 *
 * The site must load this container and must not also load gtag.js for
 * G-279S33F9E5. The Google tag and this container are the same destination;
 * a second snippet records every hit twice.
 */
export const GTM_CONTAINER_ID = "GTM-W6RLWLDZ";

export function getGoogleSiteVerification(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return fromEnv || GOOGLE_SITE_VERIFICATION;
}

export function getBingSiteVerification(): string {
  return process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() ?? "";
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
  if (normalized === "/") return normalized;
  if (/\.[a-z0-9]+$/i.test(normalized)) return normalized;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteUrl(path: string): string {
  const root = getSiteUrl();
  const normalized = withTrailingSlash(path);
  if (normalized === "/") return `${root}/`;
  return `${root}${normalized}`;
}
