import React, { useMemo } from "react";
import { formatDateTime } from "../utils/format";

function excerpt(text, maxLen) {
  const t = (text || "").trim();
  if (!t) return "";
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen).trim()}…`;
}

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const updatedLabel = useMemo(() => formatDateTime(note.updatedAt), [note.updatedAt]);
  const isPinned = Boolean(note && note.pinned);

  return (
    <article className={`card ${isPinned ? "cardPinned" : ""}`}>
      <div className="cardTop">
        <div className="cardTitleWrap">
          <h2 className="cardTitle">
            {note.title || "Untitled"}{" "}
            {isPinned ? (
              <span className="pinBadge" aria-label="Pinned note" title="Pinned">
                Pinned
              </span>
            ) : null}
          </h2>
          <p className="cardMeta">Updated {updatedLabel}</p>
        </div>

        <div className="cardActions">
          <button
            type="button"
            className={`iconButton ${isPinned ? "isPinned" : ""}`}
            onClick={() => onTogglePin && onTogglePin(note.id)}
            aria-label={isPinned ? "Unpin note" : "Pin note"}
            title={isPinned ? "Unpin" : "Pin"}
          >
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button
            type="button"
            className="iconButton"
            onClick={() => onEdit(note.id)}
            aria-label={`Edit note ${note.title || ""}`}
            title="Edit"
          >
            Edit
          </button>
          <button
            type="button"
            className="iconButton danger"
            onClick={() => onDelete(note.id)}
            aria-label={`Delete note ${note.title || ""}`}
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>

      {note.body ? <p className="cardBody">{excerpt(note.body, 220)}</p> : <p className="cardBody muted">No content</p>}

      {note.tags && note.tags.length > 0 ? (
        <div className="tagPills" aria-label="Tags">
          {note.tags.map((t) => (
            <span key={t} className="tagPill">
              #{t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
