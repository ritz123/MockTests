import { describe, expect, it } from "vitest";
import type { CatalogEntry } from "./schema";
import { examKeywords, examMetaDescription } from "./seo";

const sampleEntry: CatalogEntry = {
  id: "hackathon-quant",
  title: "Hackathon Screen — Quantitative Aptitude",
  durationMinutes: 25,
  questionCount: 20,
  assembly: {
    category: "quant",
    questionCount: 20,
    difficultyMix: { easy: 6, medium: 10, hard: 4 },
  },
};

describe("examMetaDescription", () => {
  it("includes title, timing, and question count", () => {
    const description = examMetaDescription(sampleEntry);
    expect(description).toContain(sampleEntry.title);
    expect(description).toContain("25-minute");
    expect(description).toContain("20 multiple-choice questions");
  });
});

describe("examKeywords", () => {
  it("includes category-specific and generic keywords", () => {
    const keywords = examKeywords(sampleEntry);
    expect(keywords).toContain("quantitative aptitude mock test");
    expect(keywords).toContain("aptitude mock test");
  });
});
