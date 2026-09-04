import { describe, expect, it } from "vitest";
import { parseCatalog, parsePaper } from "./schema";

const validPaper = {
  id: "quant-basics-01",
  title: "Quantitative Aptitude — Basics",
  durationMinutes: 20,
  questions: [
    {
      id: "q1",
      prompt: "What is 15% of 240?",
      options: ["24", "36", "30", "40"],
      correctIndex: 1,
      explanation: "0.15 × 240 = 36.",
    },
  ],
};

const validCatalog = {
  tests: [
    {
      id: "quant-basics-01",
      title: "Quantitative Aptitude — Basics",
      durationMinutes: 20,
      questionCount: 10,
      file: "quant-basics-01.json",
    },
    {
      id: "logical-bank",
      title: "Logical Reasoning — Mixed",
      durationMinutes: 25,
      questionCount: 3,
      assembly: {
        category: "logical",
        questionCount: 3,
        difficultyMix: { easy: 1, medium: 1, hard: 1 },
      },
    },
  ],
};

describe("parsePaper", () => {
  it("accepts a valid paper", () => {
    const result = parsePaper(validPaper);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.questions).toHaveLength(1);
      expect(result.value.questions[0]?.correctIndex).toBe(1);
    }
  });

  it("accepts a question without explanation", () => {
    const paper = {
      ...validPaper,
      questions: [{ id: "q1", prompt: "2+2?", options: ["3", "4"], correctIndex: 1 }],
    };
    expect(parsePaper(paper).ok).toBe(true);
  });

  it("rejects a paper with no questions", () => {
    const result = parsePaper({ ...validPaper, questions: [] });
    expect(result.ok).toBe(false);
  });

  it("rejects a non-positive duration", () => {
    expect(parsePaper({ ...validPaper, durationMinutes: 0 }).ok).toBe(false);
    expect(parsePaper({ ...validPaper, durationMinutes: 1.5 }).ok).toBe(false);
  });

  it("rejects duplicate question ids", () => {
    const result = parsePaper({
      ...validPaper,
      questions: [
        { id: "q1", prompt: "a", options: ["1", "2"], correctIndex: 0 },
        { id: "q1", prompt: "b", options: ["1", "2"], correctIndex: 1 },
      ],
    });
    expect(result.ok).toBe(false);
  });

  it("rejects a correctIndex outside options", () => {
    const result = parsePaper({
      ...validPaper,
      questions: [{ id: "q1", prompt: "a", options: ["1", "2"], correctIndex: 2 }],
    });
    expect(result.ok).toBe(false);
  });

  it("rejects fewer than two options", () => {
    const result = parsePaper({
      ...validPaper,
      questions: [{ id: "q1", prompt: "a", options: ["only"], correctIndex: 0 }],
    });
    expect(result.ok).toBe(false);
  });

  it("rejects invalid JSON shapes", () => {
    expect(parsePaper(null).ok).toBe(false);
    expect(parsePaper("paper").ok).toBe(false);
    expect(parsePaper({ ...validPaper, id: "" }).ok).toBe(false);
  });
});

describe("parseCatalog", () => {
  it("accepts a valid catalog", () => {
    const result = parseCatalog(validCatalog);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.tests[0]?.file).toBe("quant-basics-01.json");
    }
  });

  it("rejects a file name with a path separator", () => {
    const result = parseCatalog({
      tests: [{ ...validCatalog.tests[0], file: "../secret.json" }],
    });
    expect(result.ok).toBe(false);
  });

  it("rejects duplicate catalog ids", () => {
    const entry = validCatalog.tests[0];
    const result = parseCatalog({ tests: [entry, { ...entry, file: "other.json" }] });
    expect(result.ok).toBe(false);
  });

  it("rejects missing tests array", () => {
    expect(parseCatalog({}).ok).toBe(false);
  });
});
