import { describe, expect, it } from "vitest";
import { EXAM_BLURBS, getExamBlurb } from "./examBlurbs";
import type { CatalogEntry } from "./schema";

const sampleEntry: CatalogEntry = {
  id: "hackathon-logical",
  title: "Hackathon Screen — Logical Reasoning",
  durationMinutes: 25,
  questionCount: 20,
  assembly: {
    category: "logical",
    questionCount: 20,
    difficultyMix: { easy: 6, medium: 10, hard: 4 },
  },
};

describe("getExamBlurb", () => {
  it("returns a curated blurb for known exams", () => {
    const blurb = getExamBlurb(sampleEntry);
    expect(blurb.summary).toBe(EXAM_BLURBS["hackathon-logical"].summary);
    expect(blurb.topics.length).toBeGreaterThan(0);
    expect(blurb.tips.length).toBeGreaterThan(0);
  });

  it("falls back to meta description for unknown exams", () => {
    const unknown: CatalogEntry = { ...sampleEntry, id: "unknown-paper" };
    const blurb = getExamBlurb(unknown);
    expect(blurb.summary).toContain("Hackathon Screen — Logical Reasoning");
    expect(blurb.topics).toEqual([]);
  });
});
