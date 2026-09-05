import type { CatalogEntry } from "./schema";
import { examMetaDescription } from "./seo";

export type ExamBlurb = {
  summary: string;
  topics: string[];
  tips: string[];
};

export const EXAM_BLURBS: Record<string, ExamBlurb> = {
  "hackathon-logical": {
    summary:
      "This logical reasoning mock mirrors short screening rounds used before hackathon finals and tech interview aptitude tests. Work through sequences, deductions, and pattern-based MCQs under time pressure.",
    topics: [
      "Number and letter series",
      "Syllogisms and deductions",
      "Seating and arrangement puzzles",
      "Data sufficiency style reasoning",
      "Pattern recognition",
    ],
    tips: [
      "Read every option before eliminating — distractors often differ by one detail.",
      "Flag long puzzles and return if time allows.",
      "Sketch small tables for arrangement questions.",
    ],
  },
  "hackathon-quant": {
    summary:
      "Practice quantitative aptitude the way placement cells and hackathon organizers test it: percentages, ratios, time-speed-distance, and arithmetic word problems in a timed MCQ format.",
    topics: [
      "Percentages and profit-loss",
      "Ratios, mixtures, and averages",
      "Time, speed, and distance",
      "Simple and compound interest",
      "Permutations and basic probability",
    ],
    tips: [
      "Estimate first to rule out obviously wrong options.",
      "Memorise squares up to 25 and common fraction-percent conversions.",
      "Watch units — many errors come from mixing minutes and hours.",
    ],
  },
  "hackathon-cs": {
    summary:
      "A computer science fundamentals mock for software engineering interviews: operating systems, networking, databases, OOP, and core programming concepts tested as quick multiple-choice screens.",
    topics: [
      "Operating systems and processes",
      "Networking and HTTP basics",
      "Databases and SQL concepts",
      "Object-oriented design",
      "Memory, compilation, and runtime behaviour",
    ],
    tips: [
      "Link each question to a real system you have built or debugged.",
      "Revise TCP vs UDP, indexing, and normalisation before attempting.",
      "Eliminate answers that violate basic invariants (e.g. deadlock conditions).",
    ],
  },
  "hackathon-puzzles": {
    summary:
      "Problem-solving puzzles test creative reasoning under deadlines — common in product companies and hackathon team-selection rounds. Expect lateral thinking, constraints, and careful reading.",
    topics: [
      "Logic grids and constraints",
      "Weighing and probability puzzles",
      "Age and family relation problems",
      "Clock and calendar reasoning",
      "Odd-one-out and inference puzzles",
    ],
    tips: [
      "Restate the puzzle in your own words before solving.",
      "List givens and unknowns explicitly.",
      "If stuck for 90 seconds, mark a best guess and move on.",
    ],
  },
  "hackathon-algorithms": {
    summary:
      "Algorithms and complexity practice for coding interviews: Big-O analysis, data structure trade-offs, graph and tree reasoning, and standard algorithm patterns — without writing code on the spot.",
    topics: [
      "Time and space complexity",
      "Arrays, hash maps, and sorting",
      "Trees, graphs, and traversals",
      "Dynamic programming intuition",
      "Greedy vs divide-and-conquer choices",
    ],
    tips: [
      "Name the brute-force approach first, then optimise.",
      "Match problem constraints to data structures (e.g. lookups → hash map).",
      "Review Master Theorem and common recurrence patterns.",
    ],
  },
  "hackathon-practical": {
    summary:
      "Hackathon practical screening often mixes web fundamentals, security awareness, APIs, and systems basics. This mock targets the applied knowledge teams expect before a build sprint.",
    topics: [
      "HTTP, REST, and status codes",
      "Authentication and common vulnerabilities",
      "Git, CI/CD, and deployment basics",
      "Linux and shell fundamentals",
      "Caching, load, and reliability concepts",
    ],
    tips: [
      "Think about what breaks in production, not just happy paths.",
      "Know OWASP top issues at a high level (XSS, injection, CSRF).",
      "Relate questions to a project you have shipped end to end.",
    ],
  },
};

export function getExamBlurb(entry: CatalogEntry): ExamBlurb {
  const blurb = EXAM_BLURBS[entry.id];
  if (blurb) return blurb;

  return {
    summary: examMetaDescription(entry),
    topics: [],
    tips: [],
  };
}
