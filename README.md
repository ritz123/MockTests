# Aptitude Practice

A **Next.js** site for timed multiple-choice mocks in the style of tech interview and hackathon screens. Unofficial practice.

Scoring, the timer, and review run in the browser. Papers are JSON files; you can add more without changing application code.

## Amazon book ads (optional)

Sponsored book cards use the `AdSlot` component on the home, exam, and results pages. To earn commission, join [Amazon Associates](https://affiliate-program.amazon.in/) and set your tag:

```bash
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourname-21
```

Book titles and ASINs live in `src/lib/affiliate.ts`. Restart the dev server after changing `.env.local`.

For GitHub Pages, add `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` as a repository secret and wire it in the deploy workflow.

## Google Search Console

Register the **exact** live URL (including the repo path), e.g. `https://<user>.github.io/MockTests/`.

### Recommended: HTML meta tag

1. In Search Console, choose **HTML tag** verification.
2. Copy the `content` value only (not the full `<meta>` tag).
3. Add a GitHub secret: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = that value.
4. Push to `main` and wait for the deploy to finish.
5. Click **Verify** in Search Console.

The site injects `<meta name="google-site-verification" content="…" />` on every page at build time.

### Alternative: HTML file upload

1. Download the verification file from Google (e.g. `google1234567890.html`).
2. Place it in `public/` (not `src/`).
3. Commit, push, and redeploy.
4. Confirm it loads at `https://<user>.github.io/MockTests/google1234567890.html` (note the `/MockTests/` prefix for project sites).
5. Verify in Search Console.

If verification fails, the property URL in Search Console probably does not match the deployed path.

### Submit the sitemap

1. Property must be the **URL prefix** `https://<user>.github.io/MockTests/` (include `/MockTests/` for project sites).
2. Open **Sitemaps** and submit the **full URL**:
   `https://<user>.github.io/MockTests/sitemap.xml`
   Do not use `sitemap.xml/` (trailing slash returns 404).
3. Confirm it opens in your browser and shows XML with `https://<user>.github.io/MockTests/...` links.
4. If an old submission shows “Could not be read”, delete it and submit again after deploy.

## Run

```bash
./run.sh
```

That script always runs `npm install` (so dependencies match `package.json` and `package-lock.json`), then starts the Next.js dev server.

The server binds to **all interfaces** on port **3000** (`0.0.0.0:3000`):

- This machine: [http://localhost:3000](http://localhost:3000)
- Another host on the network: `http://<this-machine-ip>:3000`

Equivalent commands:

```bash
npm install
npm run dev
```

```bash
npm test
npm run build
```

`npm run build` writes a static site to `out/` for GitHub Pages. `npm start` is only for running a Node server locally and is not used for Pages deployment.

## Deploy to GitHub Pages

This app exports static HTML/JS/CSS only. No server, database, or API keys at runtime.

1. Push this repo to GitHub.
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or `master`. The workflow in `.github/workflows/deploy.yml` builds and publishes `out/`.

**URL**

- Project site (e.g. repo `MockTests`): `https://<user>.github.io/MockTests/`
- User site (repo `<user>.github.io`): `https://<user>.github.io/`

The workflow sets `NEXT_PUBLIC_BASE_PATH` from the repository name automatically.

**Preview the static build locally**

```bash
npm run build
npx serve out
```

For a project-site path:

```bash
NEXT_PUBLIC_BASE_PATH=/MockTests npm run build
npx serve out
```

## Take a paper

1. Choose a paper on the home page.
2. Answer questions against the countdown.
3. Submit, or wait for auto-submit at 0:00.
4. Review each item: your answer, the correct answer, and an explanation.

Refreshing the tab keeps an in-progress attempt. Closing the tab ends it.

Shipped papers (under `public/tests/`):

- Logical reasoning
- Quantitative aptitude
- Computer science fundamentals
- Problem-solving puzzles
- Algorithms and complexity
- Hackathon practical (web, security, systems)

## Question bank

Tests are assembled at runtime from `public/tests/bank/` by category and difficulty mix defined in `public/tests/index.json`.

To rebuild bank files from the legacy static papers:

```bash
python3 scripts/build_bank.py
```

## Add a paper later

Register a new entry in `public/tests/index.json` with an `assembly` block:

```json
{
  "id": "my-paper-id",
  "title": "Paper title",
  "durationMinutes": 20,
  "questionCount": 10,
  "assembly": {
    "category": "logical",
    "questionCount": 10,
    "difficultyMix": { "easy": 3, "medium": 5, "hard": 2 }
  }
}
```

Add questions to the matching file under `public/tests/bank/`. Each question needs `id`, `difficulty`, `prompt`, `options`, `correctIndex`, and optionally `explanation`.

Legacy static paper JSON (`file` field instead of `assembly`) is still supported.

### Question JSON

- `options` — two or more strings, shown as A, B, C, …
- `correctIndex` — 0-based index of the right option
- `explanation` — optional; shown on the review screen
- Prompts are plain text (no HTML)

The exam uses the paper file for timing and scoring. The catalog fields are only for the home-page list.

## Project layout

| Path | Role |
|------|------|
| `src/app/` | Next.js App Router (`/`, `/exam/[id]`, `/results/[id]`) |
| `src/components/` | Home, exam, and results UI |
| `src/lib/` | Catalog/paper validation, scoring, session, fetch |
| `public/tests/` | Paper JSON and `index.json` |
| `run.sh` | Install dependencies, then start the dev server |

Design notes: `docs/superpowers/specs/2026-09-04-aptitude-practice-design.md`.
