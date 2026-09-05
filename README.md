# Aptitude Practice

A **Next.js** site for timed multiple-choice mocks in the style of tech interview and hackathon screens. Unofficial practice.

Scoring, the timer, and review run in the browser. Papers are JSON files; you can add more without changing application code.

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
