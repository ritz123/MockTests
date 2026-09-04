import type {
  BankQuestion,
  CatalogEntry,
  Difficulty,
  DifficultyMix,
  Paper,
  ParseResult,
  Question,
  QuestionBank,
} from "./schema";

function fail(error: string): ParseResult<never> {
  return { ok: false, error };
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function pickQuestions(
  pool: BankQuestion[],
  count: number,
  random: () => number,
): ParseResult<BankQuestion[]> {
  if (pool.length < count) {
    return fail(`Not enough questions in pool (need ${count}, have ${pool.length}).`);
  }
  return { ok: true, value: shuffle(pool, random).slice(0, count) };
}

function toPaperQuestion(question: BankQuestion): Question {
  return {
    id: question.id,
    prompt: question.prompt,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    difficulty: question.difficulty,
  };
}

export function assemblePaper(
  entry: CatalogEntry,
  bank: QuestionBank,
  seed: number = Date.now(),
): ParseResult<Paper> {
  const assembly = entry.assembly;
  if (!assembly) {
    return fail("Catalog entry has no assembly config.");
  }
  if (bank.category !== assembly.category) {
    return fail(`Bank category ${bank.category} does not match assembly category ${assembly.category}.`);
  }

  const random = mulberry32(seed);
  const pools: Record<Difficulty, BankQuestion[]> = {
    easy: bank.questions.filter((item) => item.difficulty === "easy"),
    medium: bank.questions.filter((item) => item.difficulty === "medium"),
    hard: bank.questions.filter((item) => item.difficulty === "hard"),
  };

  const selected: BankQuestion[] = [];
  const mix: DifficultyMix = assembly.difficultyMix;
  for (const difficulty of ["easy", "medium", "hard"] as const) {
    const picked = pickQuestions(pools[difficulty], mix[difficulty], random);
    if (!picked.ok) return picked;
    selected.push(...picked.value);
  }

  const questions = shuffle(selected, random).map(toPaperQuestion);

  return {
    ok: true,
    value: {
      id: entry.id,
      title: entry.title,
      durationMinutes: entry.durationMinutes,
      questions,
    },
  };
}
