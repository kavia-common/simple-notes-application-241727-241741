import React, { useEffect, useMemo, useRef } from "react";

export default function NoteEditorModal({
  isOpen,
  mode,
  draft,
  onDraftChange,
  onClose,
  onSave,
  onDelete,
}) {
  const titleRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus title for quicker input.
      window.setTimeout(() => titleRef.current && titleRef.current.focus(), 0);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onSave]);

  const canSave = useMemo(() => {
    return Boolean(draft.title.trim() || draft.body.trim());
  }, [draft.title, draft.body]);

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={mode === "edit" ? "Edit note" : "Create note"}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <h2 className="modalTitle">{mode === "edit" ? "Edit note" : "New note"}</h2>
          <button type="button" className="iconButton" onClick={onClose} aria-label="Close editor">
            Close
          </button>
        </div>

        <div className="modalBody">
          <div className="field">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              ref={titleRef}
              className="input"
              value={draft.title}
              onChange={(e) => onDraftChange({ ...draft, title: e.target.value })}
              placeholder="Untitled"
              autoComplete="off"
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="body">
              Content
            </label>
            <textarea
              id="body"
              className="textarea"
              value={draft.body}
              onChange={(e) => onDraftChange({ ...draft, body: e.target.value })}
              placeholder="Write something…"
              rows={9}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="tags">
              Tags <span className="hint">(comma-separated)</span>
            </label>
            <input
              id="tags"
              className="input"
              value={draft.tagsText}
              onChange={(e) => onDraftChange({ ...draft, tagsText: e.target.value })}
              placeholder="e.g. work, ideas, todo"
              autoComplete="off"
            />
          </div>

          <p className="kbdHint">
            Tip: press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>S</kbd> to save.
          </p>
        </div>

        <div className="modalFooter">
          {onDelete ? (
            <button
              type="button"
              className="button danger"
              onClick={() => {
                // Minimal confirmation for safety.
                if (window.confirm("Delete this note? This cannot be undone.")) {
                  onDelete();
                }
              }}
            >
              Delete
            </button>
          ) : (
            <span />
          )}

          <div className="footerRight">
            <button type="button" className="button secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="button primary"
              onClick={onSave}
              disabled={!canSave}
              aria-disabled={!canSave}
              title={!canSave ? "Add a title or content to save" : "Save note"}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
