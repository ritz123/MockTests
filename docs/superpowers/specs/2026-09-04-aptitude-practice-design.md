# Aptitude Practice Website — Design Spec

**Date:** 2026-09-04  
**Status:** Implemented  
**Product:** A Next.js website for taking timed multiple-choice aptitude mock tests. New papers are added by dropping JSON files into the project.

## Goal

A student can pick a mock test, answer MCQs against a countdown timer, submit (or be auto-submitted when time runs out), and review every question with their answer, the correct answer, and an optional explanation.

The author can add a new paper later without changing application code: create one JSON file and register it in an index file, then refresh.

## Non-goals

- User accounts, login, or cloud sync
- A visual “add question” admin form
- Numeric / multi-correct / fill-in question types
- Adaptive tests or randomly assembled papers from a shared bank
- Leaderboards, analytics dashboards, or persisted score history across devices
- Mobile-native apps

## Users and success

| User | Success |
|------|---------|
| Practice taker | Starts a listed paper, finishes within the paper’s duration, sees a clear score and a review of every item |
| Content author | Adds a new paper by writing JSON that matches the schema, lists it in the index, refreshes the browser |

## Architecture

Next.js App Router app with no custom backend.

- **Next.js (App Router) + React + TypeScript** serves the UI. Client components handle the exam timer and `sessionStorage`.
- `./run.sh` always runs `npm install`, then `npm run dev`. Dev and production (`npm start`) bind to **0.0.0.0:3000**.
- Papers live as static JSON under `public/tests/`. The app fetches them at runtime, so a new file is visible after a refresh. Next.js serves that folder as static files in both dev and production.
- Scoring, timer, and review run entirely in the browser.
- In-progress session state is stored in `sessionStorage` so a tab refresh does not wipe answers or the remaining time. Closing the tab ends the session.

```
public/tests/index.json          → catalog of papers
public/tests/<id>.json           → one complete paper
src/lib/tests.ts                 → fetch + validate
src/lib/scoring.ts               → score a submitted attempt
src/lib/session.ts               → sessionStorage read/write
src/app                          → routes: /, /exam/[id], /results/[id]
src/components                   → Home, Exam, Results UI
```

No database, no API routes, no build-time glob of test files. Discovery is only through `index.json`.

## Data model

### Catalog: `public/tests/index.json`

```json
{
  "tests": [
    {
      "id": "quant-basics-01",
      "title": "Quantitative Aptitude — Basics",
      "durationMinutes": 20,
      "questionCount": 10,
      "file": "quant-basics-01.json"
    }
  ]
}
```

Rules:

- `id` is unique, kebab-case, and must match the paper file’s `id`.
- `file` is a filename relative to `public/tests/`. No path separators.
- `title`, `durationMinutes`, and `questionCount` are **catalog display only**. The exam timer and scoring always use the paper file. If they disagree, the home list can be wrong; the attempt is still valid.

### Paper: `public/tests/<id>.json`

```json
{
  "id": "quant-basics-01",
  "title": "Quantitative Aptitude — Basics",
  "durationMinutes": 20,
  "questions": [
    {
      "id": "q1",
      "prompt": "What is 15% of 240?",
      "options": ["24", "36", "30", "40"],
      "correctIndex": 1,
      "explanation": "15% of 240 = 0.15 × 240 = 36."
    }
  ]
}
```

Rules:

- `id` on the paper must equal the catalog entry `id`.
- `durationMinutes` is a positive integer. The timer is `durationMinutes * 60` seconds from session start.
- `questions` has at least one item.
- Each question `id` is unique within the paper.
- `options` has at least two strings. Display them as A, B, C, … in order.
- `correctIndex` is a 0-based index into `options`.
- `explanation` is optional. Empty or omitted means no explanation block on review.
- Prompts and explanations are plain text (no HTML). Newlines are preserved in the UI.

Invalid files: the home page still lists other papers. Opening a broken paper shows an error and a back link. The app never starts a timer on invalid data.

## Scoring

- Unanswered questions count as incorrect.
- Score = number of questions where selected option index equals `correctIndex`.
- Percentage = `round(score / total * 100)` using standard rounding (0.5 rounds up).
- Results show: score, total, percentage, time used, and whether the attempt was auto-submitted on timeout.

## Application flows

### Home

- Load `index.json`. If it fails, show “Could not load tests” and a retry control.
- List each paper: title, duration, question count, Start.
- Start navigates to `/exam/:id`. If this tab already has an in-progress session for the **same** paper, resume it. If the in-progress session is for a **different** paper, replace it after a confirm: “Start this test? Your current attempt will be discarded.” If there is no in-progress session, create one.

### Exam

- Load the paper JSON. Validate. On failure, error + back to home.
- Header: paper title, remaining time `MM:SS`, answered count / total.
- One question at a time: prompt, radio options (A/B/C/…), Previous / Next.
- A compact question map (1…N) jumps to any item. Visual state: unanswered, answered. Color is not the only indicator (icon or label as well).
- Changing an option updates the session immediately.
- Submit is always available. Confirm with “Submit test? You cannot change answers after this.”
- At 0:00 the attempt is submitted automatically with no confirm dialog.
- After submit, replace the session with a completed attempt and navigate to `/results/:id`.
- There is no “pause.” Leaving the page does not stop the clock: remaining time is `endsAt - now`. If the stored `endsAt` is in the past on resume, auto-submit immediately.

### Results / review

- Show score summary.
- List every question in order: prompt, all options, the user’s choice (or “Not answered”), the correct option, optional explanation.
- Correct / incorrect labeled in text, not color alone.
- Actions: Back to papers (home), Retake this paper (overwrites the session and starts a new in-progress attempt).

## Session storage

Key: `aptitude-session`. One active session per tab.

```ts
type Session =
  | {
      status: "in-progress";
      testId: string;
      startedAt: number; // epoch ms
      endsAt: number;    // epoch ms
      answers: Record<string, number>; // questionId -> option index
      currentIndex: number;
    }
  | {
      status: "completed";
      testId: string;
      startedAt: number;
      submittedAt: number;
      autoSubmitted: boolean;
      answers: Record<string, number>;
    };
```

A completed session for test `:id` is what the results page reads. Starting a retake overwrites it.

## UI and interaction

- Desktop-first, usable down to ~360px width (stacked question map, readable options).
- Exam layout: calm, high-contrast, no decorative clutter. Timer is always visible.
- Last 60 seconds: timer uses a warning style (text + icon), not color alone.
- Keyboard: option letters are mouse/touch first; radio group is keyboard accessible.
- `prefers-reduced-motion`: no animated countdown flourishes.
- Do not use emoji as icons.

Visual direction: focused exam tool — light background, strong typography, a single accent for primary actions (Start / Submit). Not a marketing landing page.

## How to add a paper later

1. Copy `public/tests/_template.json` (checked in) to `public/tests/my-paper.json`.
2. Fill `id`, `title`, `durationMinutes`, and `questions`.
3. Add a matching object to `public/tests/index.json`.
4. Refresh the browser. Papers are served from `public/tests/`; no copy into `dist/` is required.

A README documents this and the schema. Shipped papers are unofficial **Google / hackathon interview-style** MCQ mocks (logical, quantitative, CS fundamentals, puzzles, algorithms, and hackathon practical). They are practice material, not affiliated with Google.

## Error handling

| Case | Behavior |
|------|----------|
| Missing `index.json` | Home error + retry |
| Catalog entry with missing file | That Start action shows a paper-load error |
| Invalid JSON / schema | Paper-load error; other papers unaffected |
| Results URL with no completed session | Redirect to home |
| Exam URL with completed session for that id | Redirect to results |
| Unknown catalog `:id` | Exam page error + back to papers |
| Unknown URL (no matching App Router page) | Redirect to home |

## Testing

- Unit tests for: JSON schema validation, scoring (including unanswered and auto-submit flag), remaining-time calculation (including already-expired `endsAt`).
- No end-to-end browser suite in v1. Manual check: start a 1-minute sample paper, answer some, let it auto-submit, confirm review.

## File boundaries

| Unit | Responsibility | Depends on |
|------|----------------|------------|
| `public/tests/*` | Author-owned content | Nothing |
| `src/lib/schema.ts` | Types + parse/validate catalog and paper | Nothing |
| `src/lib/scoring.ts` | Pure score from paper + answers | Types |
| `src/lib/session.ts` | Persist/resume session | Types |
| `src/lib/tests.ts` | Fetch catalog and papers | schema |
| `src/lib/route.ts` | Read a Next.js `useParams` id | Nothing |
| `src/components/*` | Home / Exam / Results UI | libs above |
| `src/app/*` | App Router pages | components |

Each lib is independently testable. Views do not fetch JSON themselves; they call `tests.ts`.
