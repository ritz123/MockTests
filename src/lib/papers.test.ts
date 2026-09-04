import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseCatalog, parsePaper } from "./schema";

const testsDir = join(process.cwd(), "public/tests");

describe("shipped papers", () => {
  it("parses index.json and every listed paper", () => {
    const catalogResult = parseCatalog(
      JSON.parse(readFileSync(join(testsDir, "index.json"), "utf8")),
    );
    expect(catalogResult.ok).toBe(true);
    if (!catalogResult.ok) return;

    expect(catalogResult.value.tests.length).toBeGreaterThan(0);

    for (const entry of catalogResult.value.tests) {
      const paperResult = parsePaper(
        JSON.parse(readFileSync(join(testsDir, entry.file), "utf8")),
      );
      expect(paperResult.ok, entry.file).toBe(true);
      if (!paperResult.ok) continue;
      expect(paperResult.value.id).toBe(entry.id);
      expect(paperResult.value.questions.length).toBeGreaterThan(0);
    }
  });

  it("parses the template paper", () => {
    const result = parsePaper(
      JSON.parse(readFileSync(join(testsDir, "_template.json"), "utf8")),
    );
    expect(result.ok).toBe(true);
  });

  it("only ships json files that are the template, the index, or a catalog paper", () => {
    const catalogResult = parseCatalog(
      JSON.parse(readFileSync(join(testsDir, "index.json"), "utf8")),
    );
    expect(catalogResult.ok).toBe(true);
    if (!catalogResult.ok) return;
    const allowed = new Set([
      "index.json",
      "_template.json",
      ...catalogResult.value.tests.map((entry) => entry.file),
    ]);
    const files = readdirSync(testsDir).filter((name) => name.endsWith(".json"));
    for (const file of files) {
      expect(allowed.has(file)).toBe(true);
    }
  });
});
