export interface SponsoredBook {
  asin: string;
  title: string;
  image: string;
  price?: string;
}

export type InterviewBookCategory = "general" | "tech" | "aptitude";

export interface InterviewBook {
  asin: string;
  title: string;
  author: string;
  category: InterviewBookCategory;
  description: string;
}

export const INTERVIEW_BOOK_CATEGORIES: Record<InterviewBookCategory, string> = {
  general: "Job search & HR interviews",
  tech: "Tech & coding interviews",
  aptitude: "Campus & aptitude exams",
};

/** Sponsored books shown in AdSlot placements across the site. */
export const AMAZON_ASSOCIATE_TAG = "mocktestq-21";

export const interviewPrepBooks: InterviewBook[] = [
  {
    asin: "1440536791",
    title: "Knock 'em Dead Job Interview",
    author: "Martin Yate",
    category: "general",
    description: "Answers to tough interview questions, salary negotiation, and how to stand out in HR rounds.",
  },
  {
    asin: "1984861201",
    title: "What Color Is Your Parachute?",
    author: "Richard N. Bolles",
    category: "general",
    description: "Classic career guide — self-assessment, résumés, networking, and finding work that fits you.",
  },
  {
    asin: "0143128502",
    title: "60 Seconds and You're Hired!",
    author: "Robin Ryan",
    category: "general",
    description: "Short, tactical answers for common interview questions and quick salary negotiation tips.",
  },
  {
    asin: "0984782850",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "tech",
    description: "189 programming questions with hints, solutions, and guidance on how coding interviews work.",
  },
  {
    asin: "9355424485",
    title: "Beyond Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell et al.",
    category: "tech",
    description: "Updated patterns, 150+ new problems, behavioral prep, and negotiation for today's hiring market.",
  },
  {
    asin: "9355425133",
    title: "Coding Interview Patterns",
    author: "Alex Xu & Shaun Gunawardane",
    category: "tech",
    description: "Pattern-based prep — sliding window, two pointers, graphs, DP — with 100+ interview problems.",
  },
  {
    asin: "9382359443",
    title: "Elements of Programming Interviews",
    author: "Adnan Aziz, Tsung-Hsien Lee, Amit Prakash",
    category: "tech",
    description: "300 challenging problems across data structures, algorithms, and system design for top-tier screens.",
  },
  {
    asin: "9355427190",
    title: "System Design Interview — Volume 1",
    author: "Alex Xu",
    category: "tech",
    description: "Framework and 16 worked system design questions for mid-level and senior engineering interviews.",
  },
  {
    asin: "9352534026",
    title: "Quantitative Aptitude",
    author: "R.S. Aggarwal",
    category: "aptitude",
    description: "Placement and banking staple — arithmetic, data interpretation, and thousands of practice questions.",
  },
  {
    asin: "9352832167",
    title: "A Modern Approach to Verbal & Non-Verbal Reasoning",
    author: "R.S. Aggarwal",
    category: "aptitude",
    description: "Logical reasoning, puzzles, and non-verbal topics for SSC, banking, and campus aptitude rounds.",
  },
];

export function amazonBookImage(asin: string): string {
  return `https://m.media-amazon.com/images/P/${asin}.01._SL160_.jpg`;
}

export function toSponsoredBook(book: InterviewBook): SponsoredBook {
  return {
    asin: book.asin,
    title: book.title,
    image: amazonBookImage(book.asin),
  };
}

/** One book per category for compact AdSlot placements. */
export const sponsoredBooks: SponsoredBook[] = (["general", "tech", "aptitude"] as const).map((category) => {
  const book = interviewPrepBooks.find((entry) => entry.category === category);
  if (!book) {
    throw new Error(`Missing interview prep book for category: ${category}`);
  }
  return toSponsoredBook(book);
});

export function booksByCategory(category: InterviewBookCategory): InterviewBook[] {
  return interviewPrepBooks.filter((book) => book.category === category);
}

export function getAmazonAssociateTag(): string {
  const fromEnv = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim();
  return fromEnv || AMAZON_ASSOCIATE_TAG;
}

export function amazonAffiliateUrl(asin: string): string {
  const base = `https://www.amazon.in/dp/${asin}`;
  const tag = getAmazonAssociateTag();
  return `${base}?tag=${encodeURIComponent(tag)}`;
}

export function toAdProducts(books: SponsoredBook[]) {
  return books.map((book) => ({
    url: amazonAffiliateUrl(book.asin),
    title: book.title,
    image: book.image,
    price: book.price,
  }));
}
