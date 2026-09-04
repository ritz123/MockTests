export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const CATEGORIES = [
  "logical",
  "quant",
  "cs",
  "puzzles",
  "algorithms",
  "practical",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty?: Difficulty;
};

export type BankQuestion = Question & {
  difficulty: Difficulty;
};

export type QuestionBank = {
  category: Category;
  questions: BankQuestion[];
};

export type DifficultyMix = {
  easy: number;
  medium: number;
  hard: number;
};

export type AssemblyConfig = {
  category: Category;
  questionCount: number;
  difficultyMix: DifficultyMix;
};

export type Paper = {
  id: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
};

export type CatalogEntry = {
  id: string;
  title: string;
  durationMinutes: number;
  questionCount: number;
  file?: string;
  assembly?: AssemblyConfig;
};

export type Catalog = {
  tests: CatalogEntry[];
};

function fail(error: string): ParseResult<never> {
  return { ok: false, error };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPositiveInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isNonNegInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isSafeFileName(value: string): boolean {
  if (!value || value === "." || value === "..") return false;
  if (value.includes("/") || value.includes("\\")) return false;
  if (value.includes("..")) return false;
  return true;
}

function isDifficulty(value: unknown): value is Difficulty {
  return typeof value === "string" && (DIFFICULTIES as readonly string[]).includes(value);
}

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

function parseQuestion(value: unknown, index: number): ParseResult<Question> {
  if (!isRecord(value)) {
    return fail(`Question ${index + 1} must be an object.`);
  }
  if (!isNonEmptyString(value.id)) {
    return fail(`Question ${index + 1} needs a non-empty id.`);
  }
  if (!isNonEmptyString(value.prompt)) {
    return fail(`Question ${value.id} needs a prompt.`);
  }
  if (!Array.isArray(value.options) || value.options.length < 2) {
    return fail(`Question ${value.id} needs at least two options.`);
  }
  if (!value.options.every((option) => typeof option === "string" && option.length > 0)) {
    return fail(`Question ${value.id} has an empty or non-string option.`);
  }
  if (
    typeof value.correctIndex !== "number" ||
    !Number.isInteger(value.correctIndex) ||
    value.correctIndex < 0 ||
    value.correctIndex >= value.options.length
  ) {
    return fail(`Question ${value.id} has an invalid correctIndex.`);
  }

  const question: Question = {
    id: value.id,
    prompt: value.prompt,
    options: value.options,
    correctIndex: value.correctIndex,
  };
  if (value.explanation !== undefined) {
    if (typeof value.explanation !== "string") {
      return fail(`Question ${value.id} explanation must be a string.`);
    }
    if (value.explanation.length > 0) {
      question.explanation = value.explanation;
    }
  }
  if (value.difficulty !== undefined) {
    if (!isDifficulty(value.difficulty)) {
      return fail(`Question ${value.id} has an invalid difficulty.`);
    }
    question.difficulty = value.difficulty;
  }
  return { ok: true, value: question };
}

export function parseBankQuestion(value: unknown, index: number): ParseResult<BankQuestion> {
  const parsed = parseQuestion(value, index);
  if (!parsed.ok) return parsed;
  if (!isRecord(value) || !isDifficulty(value.difficulty)) {
    return fail(`Bank question ${parsed.value.id} needs a difficulty (easy, medium, or hard).`);
  }
  return { ok: true, value: { ...parsed.value, difficulty: value.difficulty } };
}

export function parseQuestionBank(value: unknown): ParseResult<QuestionBank> {
  if (!isRecord(value)) {
    return fail("Question bank must be a JSON object.");
  }
  if (!isCategory(value.category)) {
    return fail("Question bank needs a valid category.");
  }
  if (!Array.isArray(value.questions) || value.questions.length < 1) {
    return fail("Question bank needs at least one question.");
  }

  const questions: BankQuestion[] = [];
  const ids = new Set<string>();
  for (let i = 0; i < value.questions.length; i++) {
    const parsed = parseBankQuestion(value.questions[i], i);
    if (!parsed.ok) return parsed;
    if (ids.has(parsed.value.id)) {
      return fail(`Duplicate bank question id: ${parsed.value.id}`);
    }
    ids.add(parsed.value.id);
    questions.push(parsed.value);
  }

  return { ok: true, value: { category: value.category, questions } };
}

function parseDifficultyMix(value: unknown): ParseResult<DifficultyMix> {
  if (!isRecord(value)) {
    return fail("difficultyMix must be an object.");
  }
  if (!isNonNegInt(value.easy) || !isNonNegInt(value.medium) || !isNonNegInt(value.hard)) {
    return fail("difficultyMix needs non-negative integer counts for easy, medium, and hard.");
  }
  return {
    ok: true,
    value: { easy: value.easy, medium: value.medium, hard: value.hard },
  };
}

function parseAssemblyConfig(value: unknown): ParseResult<AssemblyConfig> {
  if (!isRecord(value)) {
    return fail("assembly must be an object.");
  }
  if (!isCategory(value.category)) {
    return fail("assembly needs a valid category.");
  }
  if (!isPositiveInt(value.questionCount)) {
    return fail("assembly questionCount must be a positive integer.");
  }
  const mix = parseDifficultyMix(value.difficultyMix);
  if (!mix.ok) return mix;
  const total = mix.value.easy + mix.value.medium + mix.value.hard;
  if (total !== value.questionCount) {
    return fail("difficultyMix counts must sum to questionCount.");
  }
  return {
    ok: true,
    value: {
      category: value.category,
      questionCount: value.questionCount,
      difficultyMix: mix.value,
    },
  };
}

export function parsePaper(value: unknown): ParseResult<Paper> {
  if (!isRecord(value)) {
    return fail("Paper must be a JSON object.");
  }
  if (!isNonEmptyString(value.id)) {
    return fail("Paper needs a non-empty id.");
  }
  if (!isNonEmptyString(value.title)) {
    return fail("Paper needs a title.");
  }
  if (!isPositiveInt(value.durationMinutes)) {
    return fail("durationMinutes must be a positive integer.");
  }
  if (!Array.isArray(value.questions) || value.questions.length < 1) {
    return fail("Paper needs at least one question.");
  }

  const questions: Question[] = [];
  const ids = new Set<string>();
  for (let i = 0; i < value.questions.length; i++) {
    const parsed = parseQuestion(value.questions[i], i);
    if (!parsed.ok) return parsed;
    if (ids.has(parsed.value.id)) {
      return fail(`Duplicate question id: ${parsed.value.id}`);
    }
    ids.add(parsed.value.id);
    questions.push(parsed.value);
  }

  return {
    ok: true,
    value: {
      id: value.id,
      title: value.title,
      durationMinutes: value.durationMinutes,
      questions,
    },
  };
}

export function parseCatalog(value: unknown): ParseResult<Catalog> {
  if (!isRecord(value) || !Array.isArray(value.tests)) {
    return fail("Catalog must have a tests array.");
  }

  const tests: CatalogEntry[] = [];
  const ids = new Set<string>();
  for (const entry of value.tests) {
    if (!isRecord(entry)) {
      return fail("Each catalog entry must be an object.");
    }
    if (!isNonEmptyString(entry.id)) {
      return fail("Catalog entry needs a non-empty id.");
    }
    if (ids.has(entry.id)) {
      return fail(`Duplicate catalog id: ${entry.id}`);
    }
    if (!isNonEmptyString(entry.title)) {
      return fail(`Catalog entry ${entry.id} needs a title.`);
    }
    if (!isPositiveInt(entry.durationMinutes)) {
      return fail(`Catalog entry ${entry.id} needs a positive durationMinutes.`);
    }
    if (!isNonNegInt(entry.questionCount)) {
      return fail(`Catalog entry ${entry.id} needs a non-negative questionCount.`);
    }

    const hasFile = isNonEmptyString(entry.file);
    const hasAssembly = entry.assembly !== undefined;
    if (!hasFile && !hasAssembly) {
      return fail(`Catalog entry ${entry.id} needs a file or assembly config.`);
    }
    if (hasFile && !isSafeFileName(entry.file as string)) {
      return fail(`Catalog entry ${entry.id} has an unsafe file name.`);
    }

    let assembly: AssemblyConfig | undefined;
    if (hasAssembly) {
      const parsedAssembly = parseAssemblyConfig(entry.assembly);
      if (!parsedAssembly.ok) return parsedAssembly;
      assembly = parsedAssembly.value;
      if (assembly.questionCount !== entry.questionCount) {
        return fail(`Catalog entry ${entry.id} questionCount must match assembly.questionCount.`);
      }
    }

    ids.add(entry.id);
    tests.push({
      id: entry.id,
      title: entry.title,
      durationMinutes: entry.durationMinutes,
      questionCount: entry.questionCount,
      ...(hasFile ? { file: entry.file as string } : {}),
      ...(assembly ? { assembly } : {}),
    });
  }

  return { ok: true, value: { tests } };
}
