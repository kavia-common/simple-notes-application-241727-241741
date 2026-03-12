/* eslint-disable no-console */

// PUBLIC_INTERFACE
export function loadNotes(storageKey) {
  /** Load notes array from localStorage. Returns null if missing/invalid. */
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch (e) {
    console.warn("Failed to load notes from localStorage:", e);
    return null;
  }
}

// PUBLIC_INTERFACE
export function saveNotes(storageKey, notes) {
  /** Save notes array to localStorage. */
  try {
    localStorage.setItem(storageKey, JSON.stringify(notes));
  } catch (e) {
    console.warn("Failed to save notes to localStorage:", e);
  }
}
