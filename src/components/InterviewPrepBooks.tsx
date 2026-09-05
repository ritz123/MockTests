import {
  INTERVIEW_BOOK_CATEGORIES,
  amazonAffiliateUrl,
  bookCoverImage,
  booksByCategory,
  type InterviewBookCategory,
} from "../lib/affiliate";

const BOOK_CATEGORIES: InterviewBookCategory[] = ["general", "tech", "aptitude"];

type InterviewPrepBooksProps = {
  heading?: string;
  lede?: string;
};

export function InterviewPrepBooks({
  heading = "Recommended interview prep books",
  lede = "Pair your free mock tests with these books — each link goes to Amazon.in and helps support the site at no extra cost to you.",
}: InterviewPrepBooksProps) {
  return (
    <section className="interview-books" aria-labelledby="interview-books-title">
      <h2 id="interview-books-title">{heading}</h2>
      {lede ? <p className="interview-books-lede">{lede}</p> : null}

      {BOOK_CATEGORIES.map((category) => (
        <div key={category} className="interview-books-group">
          <h3>{INTERVIEW_BOOK_CATEGORIES[category]}</h3>
          <ul className="interview-books-grid">
            {booksByCategory(category).map((book) => (
              <li key={book.asin}>
                <a
                  href={amazonAffiliateUrl(book.asin)}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="interview-book-card"
                >
                  <img
                    src={bookCoverImage(book)}
                    alt=""
                    className="interview-book-cover"
                    loading="lazy"
                    width={80}
                    height={120}
                  />
                  <span className="interview-book-copy">
                    <span className="interview-book-title">{book.title}</span>
                    <span className="interview-book-author">{book.author}</span>
                    <span className="interview-book-description">{book.description}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="interview-books-disclosure">
        As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </section>
  );
}
