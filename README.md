# Aptitude Practice

Timed multiple-choice mock tests you can take in the browser. Built for practicing **Google-style and hackathon interview screens**. Unofficial practice — not affiliated with Google.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm test
npm run build
```

## Take a paper

1. Choose a paper on the home page.
2. Answer questions against the countdown.
3. Submit, or wait for auto-submit at 0:00.
4. Review each item: your answer, the correct answer, and an explanation.

Refreshing the tab keeps an in-progress attempt. Closing the tab ends it.

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

4. Refresh the home page (in production, rebuild or copy the new JSON into the hosted `dist/tests/` folder).

### Question JSON

- `options` — two or more strings, shown as A, B, C, …
- `correctIndex` — 0-based index of the right option
- `explanation` — optional; shown on the review screen
- Prompts are plain text (no HTML)

The exam uses the paper file for timing and scoring. The catalog fields are only for the home-page list.
