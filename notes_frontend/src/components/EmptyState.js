import React from "react";

export default function EmptyState({ hasNotes, onCreate, query, activeTag }) {
  const showNoResults = hasNotes && (query.trim() || activeTag !== "all");

  return (
    <section className="emptyState" aria-label="No notes">
      <div className="emptyCard">
        <h2 className="emptyTitle">{showNoResults ? "No matching notes" : "No notes yet"}</h2>
        <p className="emptyText">
          {showNoResults
            ? "Try a different search term or tag filter."
            : "Create your first note to get started. Everything is saved locally in your browser."}
        </p>
        <button type="button" className="button primary" onClick={onCreate}>
          Create a note
        </button>
      </div>
    </section>
  );
}
