import React from "react";

/**
 * A simple, accessible theme toggle.
 * Uses a button (not a checkbox) to keep styling simple and consistent with existing UI.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      <span className="themeToggleLabel">Theme</span>
      <span className="themeTogglePill" aria-hidden="true">
        <span className={`themeToggleDot ${isDark ? "isDark" : "isLight"}`} />
        <span className="themeToggleText">{isDark ? "Dark" : "Light"}</span>
      </span>
    </button>
  );
}
