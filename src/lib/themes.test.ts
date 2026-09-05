import { describe, expect, it } from "vitest";
import { DEFAULT_THEME, migrateLegacyTheme } from "./themes";

describe("migrateLegacyTheme", () => {
  it("maps legacy light and dark values", () => {
    expect(migrateLegacyTheme("light")).toBe("ocean");
    expect(migrateLegacyTheme("dark")).toBe("midnight");
  });

  it("keeps valid theme ids", () => {
    expect(migrateLegacyTheme("sand")).toBe("sand");
    expect(migrateLegacyTheme("plum")).toBe("plum");
  });

  it("falls back to default", () => {
    expect(migrateLegacyTheme(null)).toBe(DEFAULT_THEME);
    expect(migrateLegacyTheme("unknown")).toBe(DEFAULT_THEME);
  });
});
