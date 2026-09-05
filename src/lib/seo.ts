import type { CatalogEntry } from "./schema";
import { getExamBlurb } from "./examBlurbs";
import { HOW_IT_WORKS_STEPS } from "./pagesContent";
import { SITE_AUTHOR, SITE_EMAIL, SITE_NAME, absoluteUrl } from "./site";

export const SITE_DESCRIPTION =
  "Free timed aptitude mock tests for tech interviews, coding placements, and hackathons. Each new attempt draws a fresh set of questions from the bank. Practice logical reasoning, quantitative aptitude, CS fundamentals, algorithms, and puzzles with instant review.";

export const SITE_KEYWORDS = [
  "online",
  "aptitude mock test",
  "free aptitude test online",
  "online aptitude test",
  "online mock test",
  "job interview",
  "tech interview mock test",
  "coding interview aptitude",
  "logical reasoning mock test",
  "quantitative aptitude practice",
  "computer science MCQ test",
  "algorithms mock test",
  "hackathon aptitude test",
  "placement aptitude test",
  "software engineer interview prep",
  "timed MCQ practice",
  "aptitude test for engineering students",
  "interview preparation mock test",
  "problem solving puzzles test",
];

export const HOME_TITLE = "Free Aptitude Mock Tests for Tech Interviews & Hackathons";

export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Are these aptitude mock tests free?",
    answer:
      "Yes. Every mock paper on Aptitude Practice is free. Pick a test, answer timed multiple-choice questions, and review your score with explanations — no sign-up required.",
  },
  {
    question: "What topics do the mock tests cover?",
    answer:
      "Papers cover logical reasoning, quantitative aptitude, computer science fundamentals, problem-solving puzzles, algorithms and complexity, and hackathon practical topics such as web, security, and systems.",
  },
  {
    question: "Who are these tests for?",
    answer:
      "Students and professionals preparing for tech company interviews, campus placements, hackathon screening rounds, and general aptitude practice for software engineering roles.",
  },
  {
    question: "How long is each mock test?",
    answer:
      "Each paper has its own timer, typically 20–30 minutes, matching common interview and hackathon screening formats. The countdown auto-submits when time runs out.",
  },
  {
    question: "Do I get the same questions every time?",
    answer:
      "No. Each time you start a new attempt, the site assembles a fresh set of questions from the topic bank (matched to the paper’s difficulty mix). Retrying after you finish, or choosing New attempt, gives you different questions. If you refresh during an in-progress test, you keep the same questions for that attempt.",
  },
  {
    question: "Can I resume a test if I refresh the page?",
    answer:
      "Yes. Your in-progress attempt is saved in the browser for the current tab. Closing the tab ends the session and you will need to start again.",
  },
];

const EXAM_KEYWORDS: Record<string, string[]> = {
  "hackathon-logical": [
    "logical reasoning mock test",
    "logical aptitude test online",
    "reasoning questions for interviews",
  ],
  "hackathon-quant": [
    "quantitative aptitude mock test",
    "quant aptitude practice online",
    "math aptitude for placements",
  ],
  "hackathon-cs": [
    "computer science MCQ test",
    "CS fundamentals interview questions",
    "software engineering basics quiz",
  ],
  "hackathon-puzzles": [
    "problem solving puzzles test",
    "logical puzzles for interviews",
    "brain teasers aptitude test",
  ],
  "hackathon-algorithms": [
    "algorithms mock test",
    "data structures and algorithms quiz",
    "complexity analysis practice",
  ],
  "hackathon-practical": [
    "hackathon practical test",
    "web security systems quiz",
    "technical screening mock test",
  ],
};

export function examMetaDescription(entry: CatalogEntry): string {
  return `Free ${entry.title} — ${entry.durationMinutes}-minute timed mock with ${entry.questionCount} multiple-choice questions. Practice for tech interviews and hackathons with instant score review.`;
}

export function examKeywords(entry: CatalogEntry): string[] {
  const specific = EXAM_KEYWORDS[entry.id] ?? [];
  return [
    ...specific,
    "online",
    "job interview",
    "aptitude mock test",
    "free online practice test",
    "tech interview preparation",
    entry.title.toLowerCase(),
  ];
}

export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      email: SITE_EMAIL,
    },
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to take an aptitude mock test on Aptitude Practice",
    description:
      "Pick a paper, answer timed multiple-choice questions, submit, and review your score with explanations.",
    step: HOW_IT_WORKS_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildMockTestsJsonLd(tests: CatalogEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aptitude mock tests",
    itemListElement: tests.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.title,
      url: absoluteUrl(`/exam/${entry.id}/`),
    })),
  };
}

export function buildExamJsonLd(entry: CatalogEntry) {
  const blurb = getExamBlurb(entry);
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: entry.title,
    description: blurb.summary,
    url: absoluteUrl(`/exam/${entry.id}/`),
    inLanguage: "en-US",
    educationalLevel: "intermediate",
    numberOfQuestions: entry.questionCount,
    timeRequired: `PT${entry.durationMinutes}M`,
    isAccessibleForFree: true,
    provider: {
      "@type": "Person",
      name: SITE_AUTHOR,
    },
  };
}
