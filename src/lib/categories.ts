import { CATEGORIES, type CatalogEntry, type Category } from "./schema";

export type CategorySeo = {
  heading: string;
  pitch: string;
};

export const CATEGORY_SEO: Record<Category, CategorySeo> = {
  logical: {
    heading: "Logical Reasoning",
    pitch: "Sequences, syllogisms, and pattern MCQs · interview screening style",
  },
  quant: {
    heading: "Quantitative Aptitude",
    pitch: "Percentages, ratios, and arithmetic word problems · placement pattern",
  },
  cs: {
    heading: "Computer Science Fundamentals",
    pitch: "OS, networking, databases, and OOP · tech interview MCQs",
  },
  puzzles: {
    heading: "Problem Solving Puzzles",
    pitch: "Lateral thinking and constraints · short interview rounds",
  },
  algorithms: {
    heading: "Algorithms and Complexity",
    pitch: "Big-O, data structures, and graphs · coding interview theory",
  },
  practical: {
    heading: "Hackathon Practicals",
    pitch: "Web, security, and systems · applied screening",
  },
};

export type CategoryGroup = CategorySeo & {
  category: Category;
  tests: CatalogEntry[];
};

export function groupTestsByCategory(tests: CatalogEntry[]): CategoryGroup[] {
  return CATEGORIES.map((category) => ({
    category,
    ...CATEGORY_SEO[category],
    tests: tests.filter((entry) => entry.assembly?.category === category),
  })).filter((group) => group.tests.length > 0);
}
