export const THEMES = [
  { id: "ocean", label: "Ocean", description: "Cool blue on soft gray", scheme: "light" as const },
  { id: "sand", label: "Sand", description: "Warm paper and amber", scheme: "light" as const },
  { id: "rose", label: "Rose", description: "Soft blush and burgundy", scheme: "light" as const },
  { id: "midnight", label: "Midnight", description: "Deep navy night", scheme: "dark" as const },
  { id: "forest", label: "Forest", description: "Dark teal and moss", scheme: "dark" as const },
  { id: "plum", label: "Plum", description: "Rich violet dusk", scheme: "dark" as const },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "ocean";

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function migrateLegacyTheme(value: string | null): ThemeId {
  if (value === "light") return "ocean";
  if (value === "dark") return "midnight";
  if (value && isThemeId(value)) return value;
  return DEFAULT_THEME;
}

export function themeScheme(id: ThemeId): "light" | "dark" {
  return THEMES.find((theme) => theme.id === id)?.scheme ?? "light";
}
