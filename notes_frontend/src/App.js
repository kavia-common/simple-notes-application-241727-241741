import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import NotesHeader from "./components/NotesHeader";
import NotesList from "./components/NotesList";
import NoteEditorModal from "./components/NoteEditorModal";
import EmptyState from "./components/EmptyState";
import FloatingActionButton from "./components/FloatingActionButton";
import {
  createEmptyDraft,
  createNoteFromDraft,
  updateNoteFromDraft,
} from "./domain/note";
import { loadNotes, saveNotes } from "./persistence/notesStorage";
import { loadTheme, saveTheme } from "./persistence/themeStorage";

const STORAGE_KEY = "simple-notes-app::notes";
const THEME_STORAGE_KEY = "simple-notes-app::theme";

/**
 * Generates a reasonably unique id without external dependencies.
 * Uses crypto.randomUUID when available.
 */
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `note_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [theme, setTheme] = useState("light");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [draft, setDraft] = useState(createEmptyDraft());

  // Load from localStorage on first render
  useEffect(() => {
    const stored = loadNotes(STORAGE_KEY);
    if (stored && Array.isArray(stored)) {
      setNotes(stored);
    }
  }, []);

  // Load theme from localStorage on first render
  useEffect(() => {
    const storedTheme = loadTheme(THEME_STORAGE_KEY);
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    saveNotes(STORAGE_KEY, notes);
  }, [notes]);

  // Persist theme selection
  useEffect(() => {
    saveTheme(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Apply theme to the document for CSS to pick up.
  useEffect(() => {
    // Use <html> so modals/overlays and body background follow consistently.
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    for (const n of notes) {
      if (n.tags && Array.isArray(n.tags)) {
        for (const t of n.tags) {
          if (t) tagSet.add(t);
        }
      }
    }
    return ["all", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return notes
      .filter((n) => {
        if (activeTag === "all") return true;
        return (n.tags || []).includes(activeTag);
      })
      .filter((n) => {
        if (!q) return true;
        const haystack = `${n.title}\n${n.body}\n${(n.tags || []).join(" ")}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice()
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [notes, query, activeTag]);

  const editingNote = useMemo(() => {
    if (!editingNoteId) return null;
    return notes.find((n) => n.id === editingNoteId) || null;
  }, [notes, editingNoteId]);

  function openCreate() {
    setEditingNoteId(null);
    setDraft(createEmptyDraft());
    setIsEditorOpen(true);
  }

  function openEdit(noteId) {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setEditingNoteId(noteId);
    setDraft({
      title: note.title || "",
      body: note.body || "",
      tagsText: (note.tags || []).join(", "),
    });
    setIsEditorOpen(true);
  }

  function closeEditor() {
    setIsEditorOpen(false);
    setEditingNoteId(null);
    setDraft(createEmptyDraft());
  }

  function upsertNoteFromDraft() {
    const now = Date.now();

    if (!draft.title.trim() && !draft.body.trim()) {
      // avoid creating completely empty notes
      return;
    }

    if (!editingNoteId) {
      const newNote = createNoteFromDraft({
        id: generateId(),
        draft,
        now,
      });
      setNotes((prev) => [newNote, ...prev]);
      closeEditor();
      return;
    }

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== editingNoteId) return n;
        return updateNoteFromDraft({ note: n, draft, now });
      })
    );
    closeEditor();
  }

  function deleteNote(noteId) {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (editingNoteId === noteId) {
      closeEditor();
    }
  }

  return (
    <div className="appRoot">
      <Navbar
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onCreate={openCreate}
      />
      <NotesHeader
        query={query}
        onQueryChange={setQuery}
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main className="main">
        {filteredNotes.length === 0 ? (
          <EmptyState
            hasNotes={notes.length > 0}
            onCreate={openCreate}
            query={query}
            activeTag={activeTag}
          />
        ) : (
          <NotesList
            notes={filteredNotes}
            onEdit={openEdit}
            onDelete={deleteNote}
          />
        )}
      </main>

      <FloatingActionButton onClick={openCreate} label="Add note" />

      <NoteEditorModal
        isOpen={isEditorOpen}
        mode={editingNote ? "edit" : "create"}
        draft={draft}
        onDraftChange={setDraft}
        onClose={closeEditor}
        onSave={upsertNoteFromDraft}
        onDelete={
          editingNote
            ? () => {
                deleteNote(editingNote.id);
              }
            : null
        }
      />
    </div>
  );
}
