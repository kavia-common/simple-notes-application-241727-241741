import React from "react";

/**
 * Top navigation bar for the app.
 * Kept intentionally minimal to avoid impacting core notes behavior.
 */
export default function Navbar({ onNewNote, theme, onThemeToggle }) {
  return (
    <div className="navbarWrap">
      <div className="navbarInner">
        <div className="navbarLeft">
          <div className="navbarMark" aria-hidden="true" />
          <div className="navbarBrand">
            <span className="navbarTitle">Simple Notes</span>
            <span className="navbarSubtitle">Local-first</span>
          </div>
        </div>

        <div className="navbarRight">
          <button
            type="button"
            className="button primary navbarNewButton"
            onClick={onNewNote}
            aria-label="Create a new note"
            title="New note"
          >
            New note
          </button>

          <button
            type="button"
            className="navbarThemeButton"
            onClick={onThemeToggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}
