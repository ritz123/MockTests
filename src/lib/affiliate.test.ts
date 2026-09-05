import { afterEach, describe, expect, it, vi } from "vitest";
import {
  amazonAffiliateUrl,
  bookCoverImage,
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
    expect(amazonAffiliateUrl("B0GVSBJQT7")).toBe(
      "https://www.amazon.in/dp/B0GVSBJQT7?tag=mocktestq-21",
    );
  });

  it("appends the associate tag when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "custom-tag-21");
    expect(amazonAffiliateUrl("B0GVSBJQT7")).toBe("https://www.amazon.in/dp/B0GVSBJQT7?tag=custom-tag-21");
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
        asin: "B0GVSBJQT7",
        title: "Quantitative Aptitude",
        author: "R.S. Aggarwal",
        image: "https://example.com/book.jpg",
        price: "₹500",
      },
    ]);

    expect(products).toEqual([
      {
        url: "https://www.amazon.in/dp/B0GVSBJQT7?tag=mocktestq-21",
        title: "Quantitative Aptitude",
        author: "R.S. Aggarwal",
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

  it("uses verified amazon.in ASINs for corrected titles", () => {
    const byTitle = new Map(interviewPrepBooks.map((book) => [book.title, book.asin]));
    expect(byTitle.get("What Color Is Your Parachute?")).toBe("1984861204");
    expect(byTitle.get("60 Seconds and You're Hired!")).toBe("0143128507");
    expect(byTitle.get("Coding Interview Patterns")).toBe("9355425139");
    expect(byTitle.get("Quantitative Aptitude")).toBe("B0GVSBJQT7");
    expect(byTitle.get("A Modern Approach to Verbal & Non-Verbal Reasoning")).toBe("B0CVGWMLQL");
  });

  it("uses imageAsin for covers when the product ASIN has no artwork", () => {
    const beyondCtci = interviewPrepBooks.find((book) => book.title.startsWith("Beyond Cracking"));
    expect(beyondCtci?.imageAsin).toBe("195570600X");
    expect(bookCoverImage(beyondCtci!)).toContain("195570600X");
  });

  it("keeps the original sponsored books for ad slots", () => {
    expect(sponsoredBooks).toHaveLength(2);
    expect(sponsoredBooks.map((book) => book.asin)).toEqual(["B0HBFN64VB", "B0HC389MLN"]);
  });
});
