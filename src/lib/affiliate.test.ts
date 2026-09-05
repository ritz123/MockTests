import { afterEach, describe, expect, it, vi } from "vitest";
import { amazonAffiliateUrl, toAdProducts } from "./affiliate";

describe("amazonAffiliateUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a plain product URL when no tag is set", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "");
    expect(amazonAffiliateUrl("9352534026")).toBe("https://www.amazon.in/dp/9352534026");
  });

  it("appends the associate tag when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "mocktests-21");
    expect(amazonAffiliateUrl("9352534026")).toBe("https://www.amazon.in/dp/9352534026?tag=mocktests-21");
  });
});

describe("toAdProducts", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("maps books to ad product links", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "");
    const products = toAdProducts([
      {
        asin: "9352534026",
        title: "Quantitative Aptitude",
        image: "https://example.com/book.jpg",
        price: "₹500",
      },
    ]);

    expect(products).toEqual([
      {
        url: "https://www.amazon.in/dp/9352534026",
        title: "Quantitative Aptitude",
        image: "https://example.com/book.jpg",
        price: "₹500",
      },
    ]);
  });
});
