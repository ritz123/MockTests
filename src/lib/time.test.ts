import { describe, expect, it } from "vitest";
import { formatMmSs, isWarning, remainingMs } from "./time";

describe("remainingMs", () => {
  it("returns the difference when time remains", () => {
    expect(remainingMs(1_000, 200)).toBe(800);
  });

  it("returns 0 when endsAt is in the past", () => {
    expect(remainingMs(100, 500)).toBe(0);
  });
});

describe("formatMmSs", () => {
  it("formats minutes and seconds with padding", () => {
    expect(formatMmSs(125_000)).toBe("02:05");
    expect(formatMmSs(0)).toBe("00:00");
    expect(formatMmSs(59_000)).toBe("00:59");
  });

  it("allows minutes beyond 59", () => {
    expect(formatMmSs(90 * 60 * 1000)).toBe("90:00");
  });
});

describe("isWarning", () => {
  it("is true in the last 60 seconds", () => {
    expect(isWarning(60_000)).toBe(true);
    expect(isWarning(1)).toBe(true);
  });

  it("is false before the last minute and at zero", () => {
    expect(isWarning(60_001)).toBe(false);
    expect(isWarning(0)).toBe(false);
  });
});
