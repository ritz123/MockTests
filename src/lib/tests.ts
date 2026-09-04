import {
  parseCatalog,
  parsePaper,
  parseQuestionBank,
  type Catalog,
  type CatalogEntry,
  type Paper,
  type ParseResult,
  type QuestionBank,
} from "./schema";
import { assemblePaper } from "./questionBank";
import { assetUrl } from "./assetUrl";

export async function loadCatalog(fetchFn: typeof fetch = fetch): Promise<ParseResult<Catalog>> {
  try {
    const response = await fetchFn(assetUrl("/tests/index.json"));
    if (!response.ok) {
      return { ok: false, error: "Could not load tests." };
    }
    const data: unknown = await response.json();
    return parseCatalog(data);
  } catch {
    return { ok: false, error: "Could not load tests." };
  }
}

export async function loadPaper(
  file: string,
  fetchFn: typeof fetch = fetch,
): Promise<ParseResult<Paper>> {
  try {
    const response = await fetchFn(assetUrl(`/tests/${file}`));
    if (!response.ok) {
      return { ok: false, error: "Could not load this paper." };
    }
    const data: unknown = await response.json();
    return parsePaper(data);
  } catch {
    return { ok: false, error: "Could not load this paper." };
  }
}

export async function loadQuestionBank(
  category: string,
  fetchFn: typeof fetch = fetch,
): Promise<ParseResult<QuestionBank>> {
  try {
    const response = await fetchFn(assetUrl(`/tests/bank/${category}.json`));
    if (!response.ok) {
      return { ok: false, error: `Could not load question bank for ${category}.` };
    }
    const data: unknown = await response.json();
    return parseQuestionBank(data);
  } catch {
    return { ok: false, error: `Could not load question bank for ${category}.` };
  }
}

export async function loadTestPaper(
  entry: CatalogEntry,
  seed: number = Date.now(),
  fetchFn: typeof fetch = fetch,
): Promise<ParseResult<Paper>> {
  if (entry.assembly) {
    const bankResult = await loadQuestionBank(entry.assembly.category, fetchFn);
    if (!bankResult.ok) return bankResult;
    return assemblePaper(entry, bankResult.value, seed);
  }
  if (entry.file) {
    return loadPaper(entry.file, fetchFn);
  }
  return { ok: false, error: "Catalog entry has no assembly or file." };
}
