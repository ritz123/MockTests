import { afterEach, describe, expect, it, vi } from "vitest";
import {
  amazonAffiliateUrl,
  interviewPrepBooks,
  sponsoredBooks,
  toAdProducts,
} from "./affiliate";

describe("amazonAffiliateUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the default associate tag when env is empty", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "");
    expect(amazonAffiliateUrl("9352534026")).toBe(
      "https://www.amazon.in/dp/9352534026?tag=mocktestq-21",
    );
  });

  it("appends the associate tag when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "custom-tag-21");
    expect(amazonAffiliateUrl("9352534026")).toBe("https://www.amazon.in/dp/9352534026?tag=custom-tag-21");
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
        url: "https://www.amazon.in/dp/9352534026?tag=mocktestq-21",
        title: "Quantitative Aptitude",
        image: "https://example.com/book.jpg",
        price: "₹500",
      },
    ]);
  });
});

describe("interviewPrepBooks", () => {
  it("lists all recommended interview books", () => {
    expect(interviewPrepBooks).toHaveLength(10);
  });

  it("picks one sponsored book per category for compact ad slots", () => {
    expect(sponsoredBooks).toHaveLength(3);
    expect(sponsoredBooks.map((book) => book.asin)).toEqual([
      "1440536791",
      "0984782850",
      "9352534026",
    ]);
  });
});
