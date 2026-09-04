# Aptitude Practice

A **Next.js** site for timed multiple-choice mocks in the style of Google and hackathon interview screens. Unofficial practice — not affiliated with Google.

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
npm start
```

`npm start` also listens on `0.0.0.0:3000` after a production build.

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

## Add a paper later

You do not need to change application code.

1. Copy `public/tests/_template.json` to `public/tests/my-paper-id.json`.
2. Fill in `id`, `title`, `durationMinutes`, and `questions`.
3. Add an entry to `public/tests/index.json`:

```json
{
  "id": "my-paper-id",
  "title": "Paper title",
  "durationMinutes": 20,
  "questionCount": 10,
  "file": "my-paper-id.json"
}
```

4. Refresh the home page. Next.js serves `public/tests/` as static files.

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
