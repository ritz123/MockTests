import { describe, expect, it } from "vitest";
import { scoreAttempt } from "./scoring";
import type { Paper } from "./schema";

const paper: Paper = {
  id: "t1",
  title: "Sample",
  durationMinutes: 10,
  questions: [
    { id: "q1", prompt: "a", options: ["A", "B"], correctIndex: 0 },
    { id: "q2", prompt: "b", options: ["A", "B"], correctIndex: 1 },
    { id: "q3", prompt: "c", options: ["A", "B"], correctIndex: 0 },
  ],
};

describe("scoreAttempt", () => {
  it("counts matching answers as correct", () => {
    const result = scoreAttempt(paper, { q1: 0, q2: 1, q3: 0 });
    expect(result).toEqual({ correct: 3, total: 3, percent: 100 });
  });

  it("treats unanswered questions as incorrect", () => {
    const result = scoreAttempt(paper, { q1: 0 });
    expect(result).toEqual({ correct: 1, total: 3, percent: 33 });
  });

  it("treats a wrong option as incorrect", () => {
    const result = scoreAttempt(paper, { q1: 1, q2: 1, q3: 1 });
    expect(result).toEqual({ correct: 1, total: 3, percent: 33 });
  });

  it("rounds a half percent up", () => {
    const two: Paper = {
      ...paper,
      questions: paper.questions.slice(0, 2),
    };
    const result = scoreAttempt(two, { q1: 0 });
    expect(result.percent).toBe(50);
  });

  it("ignores answers for unknown question ids", () => {
    const result = scoreAttempt(paper, { q1: 0, q2: 1, q3: 0, extra: 0 });
    expect(result.correct).toBe(3);
  });
});
