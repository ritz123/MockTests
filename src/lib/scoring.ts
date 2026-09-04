import type { Paper } from "./schema";

export type Score = {
  correct: number;
  total: number;
  percent: number;
};

export function scoreAttempt(paper: Paper, answers: Record<string, number>): Score {
  const total = paper.questions.length;
  let correct = 0;
  for (const question of paper.questions) {
    if (answers[question.id] === question.correctIndex) {
      correct += 1;
    }
  }
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, percent };
}
