/* eslint-disable no-console */

const VALID_THEMES = new Set(["light", "dark"]);

// PUBLIC_INTERFACE
export function loadTheme(storageKey) {
  /** Load theme string from localStorage. Returns null if missing/invalid. */
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    if (!VALID_THEMES.has(raw)) return null;
    return raw;
  } catch (e) {
    console.warn("Failed to load theme from localStorage:", e);
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveTheme(storageKey, theme) {
  /** Save theme string to localStorage. */
  try {
    if (!VALID_THEMES.has(theme)) return;
    localStorage.setItem(storageKey, theme);
  } catch (e) {
    console.warn("Failed to save theme to localStorage:", e);
  }
}
