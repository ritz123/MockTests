export const INTERVIEW_PREP_GUIDE_TITLE = "Tech Interview Aptitude Prep Guide";

export const INTERVIEW_PREP_GUIDE_DESCRIPTION =
  "A practical guide to preparing for aptitude and MCQ screening rounds in software engineering interviews, campus placements, and hackathons — with a week-by-week plan and free mock tests.";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "guide-why-aptitude",
    title: "Why aptitude screens still matter in tech hiring",
    paragraphs: [
      "Many product companies, startups, and hackathon organisers run a timed multiple-choice round before coding interviews. The goal is not to test memorisation — it is to see whether you can think clearly under pressure, eliminate bad options quickly, and manage time across mixed topics.",
      "Candidates who only practise LeetCode often underestimate these rounds. A short logical reasoning or quantitative section can filter a large applicant pool before anyone opens an IDE.",
    ],
  },
  {
    id: "guide-topics",
    title: "Topics you should cover",
    paragraphs: [
      "Match your practice to the kind of role you are targeting. Campus placements lean heavily on quantitative aptitude and logical reasoning. Backend and full-stack roles add computer science fundamentals. Product and hackathon tracks may include practical questions on web, security, and systems.",
    ],
    list: [
      "Logical reasoning — series, deductions, arrangements",
      "Quantitative aptitude — percentages, ratios, time-speed-distance",
      "Computer science — OS, networking, databases, OOP",
      "Algorithms — complexity, data structures, standard patterns",
      "Puzzles — constraint-based and lateral thinking problems",
      "Practical — HTTP, auth, Git, deployment, reliability basics",
    ],
  },
  {
    id: "guide-timed-practice",
    title: "How to practise with timed mocks",
    paragraphs: [
      "Treat each mock like the real screen: no pausing to look up answers, no switching tabs for hints. Note which question types slow you down and review explanations only after you submit.",
      "Each new attempt on Aptitude Practice assembles a different set of questions from the bank, so you can repeat the same paper without seeing identical items.",
      "Aim for two full mocks per week in the month before interviews. Alternate topics so you do not over-train one area. Track your score and time-used — improvement in both is the signal that you are ready.",
    ],
  },
  {
    id: "guide-week-plan",
    title: "A simple four-week plan",
    paragraphs: [
      "Adjust intensity to your schedule. The pattern below assumes you already have basic familiarity with each topic.",
    ],
    list: [
      "Week 1 — Diagnose: take one mock per major topic, note weak areas from the review screen.",
      "Week 2 — Drill: repeat mocks on your two weakest topics; revise formulas and common patterns.",
      "Week 3 — Mix: alternate quant, logical, and CS mocks; practise skipping and returning to hard items.",
      "Week 4 — Simulate: full-length timed sessions back-to-back with short breaks, as in real screening days.",
    ],
  },
  {
    id: "guide-day-of",
    title: "On the day of the test",
    paragraphs: [
      "Sleep and hydration matter more than a last-minute cram session. Skim your formula sheet if you keep one, then stop.",
      "During the test: read the full question stem, eliminate obviously wrong answers first, and do not spend more than two minutes on a single item unless you are close to solving it. Unanswered questions hurt — mark a best guess before time expires.",
    ],
  },
];

export function buildGuideJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: INTERVIEW_PREP_GUIDE_TITLE,
    description: INTERVIEW_PREP_GUIDE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: "Biplab Sarkar",
    },
    inLanguage: "en-US",
    articleSection: GUIDE_SECTIONS.map((section) => section.title),
  };
}
