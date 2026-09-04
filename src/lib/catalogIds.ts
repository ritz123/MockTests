import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCatalog } from "./schema";

export function listCatalogIds(): string[] {
  const raw = readFileSync(join(process.cwd(), "public/tests/index.json"), "utf8");
  const result = parseCatalog(JSON.parse(raw));
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result.value.tests.map((entry) => entry.id);
}
