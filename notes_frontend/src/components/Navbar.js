import React from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * Top-level navigation bar for the app.
 * Kept intentionally simple (single-screen app) but provides a consistent place for
 * primary actions and theme switching.
 */
export default function Navbar({ theme, onThemeToggle, onCreate }) {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbarInner">
        <a className="navbarBrand" href="#top" aria-label="Go to notes list">
          <span className="navbarMark" aria-hidden="true" />
          <span className="navbarBrandText">Notes</span>
        </a>

        <div className="navbarActions">
          <button
            type="button"
            className="button primary navbarNewButton"
            onClick={onCreate}
          >
            New note
          </button>

          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </nav>
  );
}
