import type { CatalogEntry } from "./schema";
import { getExamBlurb } from "./examBlurbs";
import { HOW_IT_WORKS_STEPS } from "./pagesContent";
import { SITE_AUTHOR, SITE_EMAIL, SITE_NAME, absoluteUrl } from "./site";

export const SITE_DESCRIPTION =
  "Take free aptitude mock tests online for tech interviews, campus placements, and hackathons. Timed logical reasoning, quantitative aptitude, CS fundamentals, algorithms, and puzzle papers with instant review. Start instantly — no sign-up.";

export const SITE_KEYWORDS = [
  "free mock test",
  "online mock test",
  "aptitude mock test",
  "free aptitude test online",
  "online aptitude test",
  "practice exams",
  "exam preparation",
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

export const HOME_TITLE =
  "Free Aptitude Mock Tests Online – Logical Reasoning, Quant & CS";

export const HOME_TRUST_POINTS = [
  "Free — no sign-up",
  "Timed papers with auto-submit",
  "Score review with explanations",
];

export function contentUpdatedLabel(date = new Date()): string {
  return `Updated ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
}

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
  {
    question: "What is a mock test?",
    answer:
      "A mock test is a timed simulation of a real screening round — same question style, difficulty mix, and countdown — taken before the interview or hackathon. It shows your score under pressure, highlights weak topics, and trains pacing so the real round feels familiar.",
  },
  {
    question: "How do I take a mock test online without login?",
    answer:
      "Open any paper, press Start, and answer before the timer ends. Guest mode needs no account. On submit you get your score, the correct options, and explanations where provided.",
  },
  {
    question: "Will I understand the mistakes I make?",
    answer:
      "Yes. After you submit, every question shows the option you picked, the correct answer, and an explanation when one is available, so you can see why an answer is right rather than only that you missed it.",
  },
  {
    question: "Are the questions based on interview and placement patterns?",
    answer:
      "Yes. Papers follow common tech-interview and campus-placement aptitude formats: short timed MCQs across reasoning, quant, CS fundamentals, algorithms, puzzles, and hackathon practical topics — not a copy of any company's confidential paper.",
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
  return `Take this free ${entry.title} online — ${entry.durationMinutes}-minute timed mock with ${entry.questionCount} multiple-choice questions. Instant score review for tech interviews and hackathons. Start without sign-up.`;
}

export function examKeywords(entry: CatalogEntry): string[] {
  const specific = EXAM_KEYWORDS[entry.id] ?? [];
  return [
    ...specific,
    "free mock test",
    "job interview",
    "aptitude mock test",
    "free online practice test",
    "tech interview preparation",
    entry.title.toLowerCase(),
  ];
}

function organizationId(): string {
  return `${absoluteUrl("/")}#organization`;
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "EducationalOrganization",
    "@id": organizationId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_DESCRIPTION,
    founder: {
      "@type": "Person",
      name: SITE_AUTHOR,
      email: SITE_EMAIL,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: SITE_EMAIL,
      availableLanguage: ["English"],
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    inLanguage: "en-US",
    publisher: { "@id": organizationId() },
  };
}

export function buildWebApplicationJsonLd() {
  return {
    "@type": "WebApplication",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    operatingSystem: "Any",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free timed aptitude mock tests with no registration",
    },
    featureList: [
      "Timed multiple-choice mock papers",
      "Fresh questions on every new attempt",
      "Instant score review with explanations",
      "No login required",
    ],
    isAccessibleForFree: true,
    provider: { "@id": organizationId() },
  };
}

function faqMainEntity() {
  return HOME_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq/" },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: faqMainEntity(),
      },
    ],
  };
}

export function buildHomeJsonLd(tests: CatalogEntry[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(),
      buildWebApplicationJsonLd(),
      {
        "@type": "FAQPage",
        mainEntity: faqMainEntity(),
      },
      buildMockTestsList(tests),
    ],
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    ...buildBreadcrumbList(items),
  };
}

function quizListItem(entry: CatalogEntry, position: number) {
  const blurb = getExamBlurb(entry);
  const url = absoluteUrl(`/exam/${entry.id}/`);
  return {
    "@type": "ListItem",
    position,
    item: {
      "@type": "Quiz",
      "@id": `${url}#quiz`,
      name: entry.title,
      description: blurb.summary,
      url,
      educationalLevel: "intermediate",
      numberOfQuestions: entry.questionCount,
      timeRequired: `PT${entry.durationMinutes}M`,
      isAccessibleForFree: true,
    },
  };
}

function buildMockTestsList(tests: CatalogEntry[]) {
  return {
    "@type": "ItemList",
    name: "Free aptitude mock tests",
    numberOfItems: tests.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: tests.map((entry, index) => quizListItem(entry, index + 1)),
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
    "@graph": [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Mock tests", path: "/mock-tests/" },
      ]),
      buildMockTestsList(tests),
      {
        "@type": "FAQPage",
        mainEntity: faqMainEntity(),
      },
    ],
  };
}

export function buildExamJsonLd(entry: CatalogEntry) {
  const blurb = getExamBlurb(entry);
  const url = absoluteUrl(`/exam/${entry.id}/`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Mock tests", path: "/mock-tests/" },
        { name: entry.title, path: `/exam/${entry.id}/` },
      ]),
      {
        "@type": "Quiz",
        "@id": `${url}#quiz`,
        name: entry.title,
        description: blurb.summary,
        url,
        inLanguage: "en-US",
        educationalLevel: "intermediate",
        numberOfQuestions: entry.questionCount,
        timeRequired: `PT${entry.durationMinutes}M`,
        isAccessibleForFree: true,
        provider: { "@id": organizationId() },
      },
    ],
  };
}
