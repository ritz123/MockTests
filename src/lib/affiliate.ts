export interface SponsoredBook {
  asin: string;
  title: string;
  image: string;
  price?: string;
}

/** Sponsored books shown in AdSlot placements across the site. */
export const AMAZON_ASSOCIATE_TAG = "mocktestq-21";

export const sponsoredBooks: SponsoredBook[] = [
  {
    asin: "B0HBFN64VB",
    title: "Learn Go Programming in a Day: A Clear Classroom Guide",
    image: "https://m.media-amazon.com/images/P/B0HBFN64VB.01._SL160_.jpg",
  },
  {
    asin: "B0HC389MLN",
    title: "Understanding Software Design: Principles, Patterns, and Techniques",
    image: "https://m.media-amazon.com/images/P/B0HC389MLN.01._SL160_.jpg",
  },
];

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
