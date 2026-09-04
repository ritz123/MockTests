#!/usr/bin/env python3
"""Build question bank JSON files from existing static papers."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TESTS = ROOT / "public" / "tests"
BANK = TESTS / "bank"

PAPER_TO_CATEGORY = {
    "google-hackathon-logical.json": "logical",
    "google-hackathon-quant.json": "quant",
    "google-hackathon-cs.json": "cs",
    "google-hackathon-puzzles.json": "puzzles",
    "google-hackathon-algorithms.json": "algorithms",
    "google-hackathon-practical.json": "practical",
}

DIFFICULTIES = ("easy", "medium", "hard")


def assign_difficulty(index: int) -> str:
    return DIFFICULTIES[index % len(DIFFICULTIES)]


def main() -> None:
    BANK.mkdir(parents=True, exist_ok=True)
    banks: dict[str, list[dict]] = {category: [] for category in PAPER_TO_CATEGORY.values()}

    for file_name, category in PAPER_TO_CATEGORY.items():
        paper = json.loads((TESTS / file_name).read_text(encoding="utf-8"))
        for index, question in enumerate(paper["questions"]):
            banks[category].append(
                {
                    "id": f"{category}-{question['id']}",
                    "difficulty": assign_difficulty(index),
                    "prompt": question["prompt"],
                    "options": question["options"],
                    "correctIndex": question["correctIndex"],
                    **(
                        {"explanation": question["explanation"]}
                        if question.get("explanation")
                        else {}
                    ),
                }
            )

    for category, questions in banks.items():
        out = {"category": category, "questions": questions}
        path = BANK / f"{category}.json"
        path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {path} ({len(questions)} questions)")


if __name__ == "__main__":
    main()
