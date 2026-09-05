import type { FaqItem } from "./seo";

export const ABOUT_TITLE = "About Aptitude Practice";

export const ABOUT_DESCRIPTION =
  "Free timed aptitude mock tests for software engineering interviews, campus placements, and hackathon screening rounds — with instant review and explanations.";

export const ABOUT_INTRO = [
  "Aptitude Practice helps you prepare for software engineering interviews, campus placements, and hackathon screening rounds with realistic timed multiple-choice mocks.",
  "Every new attempt pulls a fresh set of questions from the topic bank, so you can practise the same paper many times without memorising fixed answers.",
  "Train logical reasoning, quantitative aptitude, computer science fundamentals, algorithms, and practical problem solving — then review every answer with explanations. No sign-up, no install: open a paper and start the timer.",
];

export const HOW_IT_WORKS_TITLE = "How It Works";

export const HOW_IT_WORKS_DESCRIPTION =
  "Take a timed aptitude mock test in four steps: pick a paper, answer MCQs before the countdown ends, submit, and review your score with explanations.";

export type HowItWorksStep = {
  name: string;
  text: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    name: "Choose a mock paper",
    text: "Browse the catalog and pick a test that matches your goal — logical reasoning, quant, CS fundamentals, algorithms, puzzles, or hackathon practicals. Each new attempt draws a different set of questions from the bank.",
  },
  {
    name: "Answer under the timer",
    text: "Work through multiple-choice questions while the countdown runs. Skip and return to items using the question map. Your answers save if you refresh the tab.",
  },
  {
    name: "Submit your attempt",
    text: "Press View results on the last question, or let the timer auto-submit when time reaches zero.",
  },
  {
    name: "Review every question",
    text: "See your score, which options you chose, the correct answers, and optional explanations for each item.",
  },
];

export const FAQ_PAGE_TITLE = "Frequently Asked Questions";

export const FAQ_PAGE_DESCRIPTION =
  "Answers about free aptitude mock tests on Aptitude Practice: topics covered, test length, resuming attempts, and who these interview prep papers are for.";

export const MOCK_TESTS_TITLE = "All Mock Tests";

export const MOCK_TESTS_DESCRIPTION =
  "Browse every free timed aptitude mock test: logical reasoning, quantitative aptitude, computer science, algorithms, puzzles, and hackathon practical screening papers. Each new attempt gives you a fresh set of questions.";

export type QuickLink = {
  href: string;
  title: string;
  description: string;
};

export const HOME_QUICK_LINKS: QuickLink[] = [
  {
    href: "/about/",
    title: "About",
    description: "What Aptitude Practice is and who it is for.",
  },
  {
    href: "/how-it-works/",
    title: "How it works",
    description: "Pick a paper, take the timed test, and review your answers.",
  },
  {
    href: "/mock-tests/",
    title: "All mock tests",
    description: "Full catalog with links to every practice paper.",
  },
  {
    href: "/faq/",
    title: "FAQ",
    description: "Common questions about topics, timing, and resuming tests.",
  },
  {
    href: "/interview-prep-guide/",
    title: "Interview prep guide",
    description: "Week-by-week plan for aptitude and MCQ screening rounds.",
  },
];

export type { FaqItem };
