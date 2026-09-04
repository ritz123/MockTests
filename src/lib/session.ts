import type { Paper } from "./schema";
import { parsePaper } from "./schema";

export const SESSION_KEY = "aptitude-session";

export type InProgressSession = {
  status: "in-progress";
  testId: string;
  paper: Paper;
  startedAt: number;
  endsAt: number;
  answers: Record<string, number>;
  currentIndex: number;
};

export type CompletedSession = {
  status: "completed";
  testId: string;
  paper: Paper;
  startedAt: number;
  submittedAt: number;
  autoSubmitted: boolean;
  answers: Record<string, number>;
};

export type Session = InProgressSession | CompletedSession;

export function startSession(testId: string, paper: Paper, now: number): InProgressSession {
  return {
    status: "in-progress",
    testId,
    paper,
    startedAt: now,
    endsAt: now + paper.durationMinutes * 60 * 1000,
    answers: {},
    currentIndex: 0,
  };
}

export function completeSession(
  session: InProgressSession,
  now: number,
  autoSubmitted: boolean,
): CompletedSession {
  return {
    status: "completed",
    testId: session.testId,
    paper: session.paper,
    startedAt: session.startedAt,
    submittedAt: now,
    autoSubmitted,
    answers: { ...session.answers },
  };
}

function isAnswers(value: unknown): value is Record<string, number> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.values(value).every((item) => typeof item === "number" && Number.isInteger(item));
}

function parseSession(value: unknown): Session | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  const paperResult = parsePaper(record.paper);
  if (!paperResult.ok) return null;

  if (record.status === "in-progress") {
    if (
      typeof record.testId === "string" &&
      typeof record.startedAt === "number" &&
      typeof record.endsAt === "number" &&
      typeof record.currentIndex === "number" &&
      isAnswers(record.answers)
    ) {
      return {
        status: "in-progress",
        testId: record.testId,
        paper: paperResult.value,
        startedAt: record.startedAt,
        endsAt: record.endsAt,
        answers: record.answers,
        currentIndex: record.currentIndex,
      };
    }
    return null;
  }
  if (record.status === "completed") {
    if (
      typeof record.testId === "string" &&
      typeof record.startedAt === "number" &&
      typeof record.submittedAt === "number" &&
      typeof record.autoSubmitted === "boolean" &&
      isAnswers(record.answers)
    ) {
      return {
        status: "completed",
        testId: record.testId,
        paper: paperResult.value,
        startedAt: record.startedAt,
        submittedAt: record.submittedAt,
        autoSubmitted: record.autoSubmitted,
        answers: record.answers,
      };
    }
  }
  return null;
}

export function saveSession(session: Session, storage: Storage = sessionStorage): void {
  storage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSession(storage: Storage = sessionStorage): Session | null {
  const raw = storage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return parseSession(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearSession(storage: Storage = sessionStorage): void {
  storage.removeItem(SESSION_KEY);
}
