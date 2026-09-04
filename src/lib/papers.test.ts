import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseCatalog, parsePaper, parseQuestionBank } from "./schema";

const testsDir = join(process.cwd(), "public/tests");
const bankDir = join(testsDir, "bank");

describe("shipped papers", () => {
  it("parses index.json and every listed paper", () => {
    const catalogResult = parseCatalog(
      JSON.parse(readFileSync(join(testsDir, "index.json"), "utf8")),
    );
    expect(catalogResult.ok).toBe(true);
    if (!catalogResult.ok) return;

    expect(catalogResult.value.tests.length).toBeGreaterThan(0);

    for (const entry of catalogResult.value.tests) {
      if (entry.file) {
        const paperResult = parsePaper(
          JSON.parse(readFileSync(join(testsDir, entry.file), "utf8")),
        );
        expect(paperResult.ok, entry.file).toBe(true);
        if (!paperResult.ok) continue;
        expect(paperResult.value.id).toBe(entry.id);
        expect(paperResult.value.questions.length).toBeGreaterThan(0);
      }
      if (entry.assembly) {
        const bankResult = parseQuestionBank(
          JSON.parse(readFileSync(join(bankDir, `${entry.assembly.category}.json`), "utf8")),
        );
        expect(bankResult.ok, entry.assembly.category).toBe(true);
        if (!bankResult.ok) continue;
        expect(bankResult.value.category).toBe(entry.assembly.category);
      }
    }
  });

  it("parses the template paper", () => {
    const result = parsePaper(
      JSON.parse(readFileSync(join(testsDir, "_template.json"), "utf8")),
    );
    expect(result.ok).toBe(true);
  });

  it("parses every question bank file", () => {
    const files = readdirSync(bankDir).filter((name) => name.endsWith(".json"));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const result = parseQuestionBank(
        JSON.parse(readFileSync(join(bankDir, file), "utf8")),
      );
      expect(result.ok, file).toBe(true);
    }
  });

  it("only ships json files that are the template, the index, a catalog paper, or a bank file", () => {
    const catalogResult = parseCatalog(
      JSON.parse(readFileSync(join(testsDir, "index.json"), "utf8")),
    );
    expect(catalogResult.ok).toBe(true);
    if (!catalogResult.ok) return;
    const legacySources = new Set(
      readdirSync(testsDir).filter(
        (name) => name.startsWith("google-hackathon-") && name.endsWith(".json"),
      ),
    );
    const allowed = new Set([
      "index.json",
      "_template.json",
      ...legacySources,
      ...catalogResult.value.tests.flatMap((entry) => (entry.file ? [entry.file] : [])),
    ]);
    const rootFiles = readdirSync(testsDir).filter((name) => name.endsWith(".json"));
    for (const file of rootFiles) {
      expect(allowed.has(file)).toBe(true);
    }
  });
});
