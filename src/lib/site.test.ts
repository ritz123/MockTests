import { afterEach, describe, expect, it, vi } from "vitest";
import { absoluteUrl } from "./site";

describe("absoluteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("keeps page paths trailing-slashed", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ritz123.github.io/MockTests");
    expect(absoluteUrl("/faq")).toBe("https://ritz123.github.io/MockTests/faq/");
  });

  it("does not add a trailing slash to file paths", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://ritz123.github.io/MockTests");
    expect(absoluteUrl("/sitemap.xml")).toBe("https://ritz123.github.io/MockTests/sitemap.xml");
    expect(absoluteUrl("/robots.txt")).toBe("https://ritz123.github.io/MockTests/robots.txt");
  });
});
