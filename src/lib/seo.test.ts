import { describe, expect, it } from "vitest";
import type { CatalogEntry } from "./schema";
import {
  buildExamJsonLd,
  buildHomeJsonLd,
  buildMockTestsJsonLd,
  examKeywords,
  examMetaDescription,
} from "./seo";

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

describe("JSON-LD", () => {
  it("embeds organization, FAQ, and quiz list on the home graph", () => {
    const jsonLd = buildHomeJsonLd([sampleEntry]);
    const types = jsonLd["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("EducationalOrganization");
    expect(types).toContain("WebApplication");
    expect(types).toContain("FAQPage");
    expect(types).toContain("ItemList");
  });

  it("nests Quiz items in the mock-tests list", () => {
    const jsonLd = buildMockTestsJsonLd([sampleEntry]);
    const list = jsonLd["@graph"].find((node: { "@type": string }) => node["@type"] === "ItemList") as {
      itemListElement: Array<{ item: { "@type": string; numberOfQuestions: number } }>;
    };
    expect(list.itemListElement[0]?.item["@type"]).toBe("Quiz");
    expect(list.itemListElement[0]?.item.numberOfQuestions).toBe(20);
  });

  it("marks exam quizzes as free", () => {
    const jsonLd = buildExamJsonLd(sampleEntry);
    const quiz = jsonLd["@graph"].find((node: { "@type": string }) => node["@type"] === "Quiz") as {
      isAccessibleForFree: boolean;
    };
    expect(quiz.isAccessibleForFree).toBe(true);
  });
});
