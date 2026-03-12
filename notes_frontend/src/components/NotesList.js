import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({ notes, onEdit, onDelete }) {
  return (
    <section className="notesGrid" aria-label="Notes list">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
