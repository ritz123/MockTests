export function remainingMs(endsAt: number, now: number): number {
  return Math.max(0, endsAt - now);
}

export function formatMmSs(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function isWarning(remaining: number): boolean {
  return remaining > 0 && remaining <= 60_000;
}

export function optionLabel(index: number): string {
  return String.fromCharCode(65 + index);
}
