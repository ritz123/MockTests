import { describe, expect, it } from "vitest";
import type { CatalogEntry, QuestionBank } from "./schema";
import { assemblePaper } from "./questionBank";

const bank: QuestionBank = {
  category: "logical",
  questions: [
    {
      id: "e1",
      difficulty: "easy",
      prompt: "Easy 1",
      options: ["a", "b"],
      correctIndex: 0,
    },
    {
      id: "e2",
      difficulty: "easy",
      prompt: "Easy 2",
      options: ["a", "b"],
      correctIndex: 1,
    },
    {
      id: "m1",
      difficulty: "medium",
      prompt: "Medium 1",
      options: ["a", "b"],
      correctIndex: 0,
    },
    {
      id: "h1",
      difficulty: "hard",
      prompt: "Hard 1",
      options: ["a", "b"],
      correctIndex: 0,
    },
  ],
};

const entry: CatalogEntry = {
  id: "logical-test",
  title: "Logical Test",
  durationMinutes: 10,
  questionCount: 3,
  assembly: {
    category: "logical",
    questionCount: 3,
    difficultyMix: { easy: 1, medium: 1, hard: 1 },
  },
};

describe("assemblePaper", () => {
  it("picks the requested difficulty mix", () => {
    const result = assemblePaper(entry, bank, 42);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.questions).toHaveLength(3);
    const difficulties = result.value.questions.map((item) => item.difficulty).sort();
    expect(difficulties).toEqual(["easy", "hard", "medium"]);
  });

  it("is deterministic for the same seed", () => {
    const first = assemblePaper(entry, bank, 99);
    const second = assemblePaper(entry, bank, 99);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(first.value.questions.map((item) => item.id)).toEqual(
      second.value.questions.map((item) => item.id),
    );
  });

  it("uses whatever is available when a pool is short", () => {
    const result = assemblePaper(
      {
        ...entry,
        questionCount: 4,
        assembly: {
          category: "logical",
          questionCount: 4,
          difficultyMix: { easy: 3, medium: 1, hard: 0 },
        },
      },
      bank,
      1,
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.questions).toHaveLength(3);
  });
});
