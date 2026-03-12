/**
 * Parse a tags string (comma-separated) into normalized tags.
 * - trims whitespace
 * - lowercases
 * - removes empties
 * - de-duplicates preserving first occurrence
 */
function parseTags(tagsText) {
  const parts = tagsText
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const seen = new Set();
  const result = [];
  for (const t of parts) {
    if (seen.has(t)) continue;
    seen.add(t);
    result.push(t);
  }
  return result;
}

// PUBLIC_INTERFACE
export function createEmptyDraft() {
  /** Create an empty draft for the note editor. */
  return { title: "", body: "", tagsText: "" };
}

// PUBLIC_INTERFACE
export function createNoteFromDraft({ id, draft, now }) {
  /** Create a persisted note object from an editor draft. */
  const title = draft.title.trim() || "Untitled";
  const body = draft.body.trim();
  return {
    id,
    title,
    body,
    tags: parseTags(draft.tagsText || ""),
    createdAt: now,
    updatedAt: now,
  };
}

// PUBLIC_INTERFACE
export function updateNoteFromDraft({ note, draft, now }) {
  /** Update an existing note object from an editor draft. */
  return {
    ...note,
    title: draft.title.trim() || "Untitled",
    body: draft.body.trim(),
    tags: parseTags(draft.tagsText || ""),
    updatedAt: now,
  };
}
