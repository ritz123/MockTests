import { parseCatalog, parsePaper, type Catalog, type Paper, type ParseResult } from "./schema";

export async function loadCatalog(fetchFn: typeof fetch = fetch): Promise<ParseResult<Catalog>> {
  try {
    const response = await fetchFn("/tests/index.json");
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
    const response = await fetchFn(`/tests/${file}`);
    if (!response.ok) {
      return { ok: false, error: "Could not load this paper." };
    }
    const data: unknown = await response.json();
    return parsePaper(data);
  } catch {
    return { ok: false, error: "Could not load this paper." };
  }
}
