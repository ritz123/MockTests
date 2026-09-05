"use client";

import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { THEMES } from "../lib/themes";
import { useTheme } from "./ThemeProvider";

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="theme-picker" ref={rootRef}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label="Choose theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Palette size={20} aria-hidden="true" />
      </button>
      {open ? (
        <div className="theme-menu" role="listbox" aria-label="Themes">
          <p className="theme-menu-title">Theme</p>
          <ul className="theme-menu-list">
            {THEMES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={theme === item.id}
                  className={`theme-option${theme === item.id ? " active" : ""}`}
                  onClick={() => {
                    setTheme(item.id);
                    setOpen(false);
                  }}
                >
                  <span className={`theme-swatch theme-swatch-${item.id}`} aria-hidden="true" />
                  <span className="theme-option-text">
                    <span className="theme-option-label">{item.label}</span>
                    <span className="theme-option-desc">{item.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
