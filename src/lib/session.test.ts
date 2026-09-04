import { describe, expect, it } from "vitest";
import {
  SESSION_KEY,
  clearSession,
  completeSession,
  loadSession,
  saveSession,
  startSession,
} from "./session";
import type { Paper } from "./schema";

const paper: Paper = {
  id: "paper-a",
  title: "Paper A",
  durationMinutes: 20,
  questions: [
    {
      id: "q1",
      prompt: "2+2?",
      options: ["3", "4"],
      correctIndex: 1,
    },
  ],
};

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key) {
      return map.has(key) ? map.get(key)! : null;
    },
    key(index) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key) {
      map.delete(key);
    },
    setItem(key, value) {
      map.set(key, String(value));
    },
  };
}

describe("startSession", () => {
  it("sets endsAt from durationMinutes", () => {
    const now = 1_000_000;
    const session = startSession("paper-a", paper, now);
    expect(session.status).toBe("in-progress");
    expect(session.testId).toBe("paper-a");
    expect(session.paper).toEqual(paper);
    expect(session.startedAt).toBe(now);
    expect(session.endsAt).toBe(now + 20 * 60 * 1000);
    expect(session.answers).toEqual({});
    expect(session.currentIndex).toBe(0);
  });
});

describe("completeSession", () => {
  it("copies answers and records auto-submit", () => {
    const open = startSession("paper-a", { ...paper, durationMinutes: 10 }, 0);
    open.answers = { q1: 2 };
    const done = completeSession(open, 5_000, true);
    expect(done).toEqual({
      status: "completed",
      testId: "paper-a",
      paper: open.paper,
      startedAt: 0,
      submittedAt: 5_000,
      autoSubmitted: true,
      answers: { q1: 2 },
    });
  });
});

describe("session storage", () => {
  it("round-trips an in-progress session", () => {
    const storage = memoryStorage();
    const session = startSession("paper-a", paper, 42);
    saveSession(session, storage);
    expect(storage.getItem(SESSION_KEY)).not.toBeNull();
    expect(loadSession(storage)).toEqual(session);
  });

  it("returns null for missing or corrupt data", () => {
    const storage = memoryStorage();
    expect(loadSession(storage)).toBeNull();
    storage.setItem(SESSION_KEY, "{not json");
    expect(loadSession(storage)).toBeNull();
    storage.setItem(SESSION_KEY, JSON.stringify({ status: "nope" }));
    expect(loadSession(storage)).toBeNull();
  });

  it("clears stored session", () => {
    const storage = memoryStorage();
    saveSession(startSession("paper-a", paper, 0), storage);
    clearSession(storage);
    expect(loadSession(storage)).toBeNull();
  });
});
