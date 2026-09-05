import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseCatalog, type Catalog, type CatalogEntry } from "./schema";

export function loadCatalogFromDisk(): Catalog {
  const raw = readFileSync(join(process.cwd(), "public/tests/index.json"), "utf8");
  const result = parseCatalog(JSON.parse(raw));
  if (!result.ok) {
    throw new Error(result.error);
  }
  return result.value;
}

export function getCatalogEntry(id: string): CatalogEntry | undefined {
  return loadCatalogFromDisk().tests.find((entry) => entry.id === id);
}
