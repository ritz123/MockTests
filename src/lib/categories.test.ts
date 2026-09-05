import { describe, expect, it } from "vitest";
import { groupTestsByCategory } from "./categories";
import type { CatalogEntry } from "./schema";

const logical: CatalogEntry = {
  id: "hackathon-logical",
  title: "Logical",
  durationMinutes: 25,
  questionCount: 20,
  assembly: {
    category: "logical",
    questionCount: 20,
    difficultyMix: { easy: 6, medium: 10, hard: 4 },
  },
};

const quant: CatalogEntry = {
  id: "hackathon-quant",
  title: "Quant",
  durationMinutes: 25,
  questionCount: 20,
  assembly: {
    category: "quant",
    questionCount: 20,
    difficultyMix: { easy: 6, medium: 10, hard: 4 },
  },
};

describe("groupTestsByCategory", () => {
  it("groups papers under SEO category headings", () => {
    const groups = groupTestsByCategory([quant, logical]);
    expect(groups.map((group) => group.category)).toEqual(["logical", "quant"]);
    expect(groups[0]?.heading).toBe("Logical Reasoning");
    expect(groups[0]?.tests).toEqual([logical]);
  });

  it("omits empty categories", () => {
    const groups = groupTestsByCategory([logical]);
    expect(groups).toHaveLength(1);
  });
});
