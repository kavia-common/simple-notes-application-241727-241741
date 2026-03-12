import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function NotesHeader({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
  theme,
  onThemeToggle,
}) {
  return (
    <header className="header">
      <div className="headerTop">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <h1 className="title">Notes</h1>
            <p className="subtitle">Fast, local, minimal.</p>
          </div>
        </div>

        <div className="headerActions">
          <div className="searchWrap">
            <label className="srOnly" htmlFor="search">
              Search notes
            </label>
            <input
              id="search"
              className="searchInput"
              placeholder="Search by title, content, or tag…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              inputMode="search"
              autoComplete="off"
            />
          </div>

          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>

      <nav className="tagRow" aria-label="Filter by tag">
        {tags.map((t) => {
          const isActive = t === activeTag;
          return (
            <button
              key={t}
              type="button"
              className={`chip ${isActive ? "chipActive" : ""}`}
              onClick={() => onTagChange(t)}
            >
              {t === "all" ? "All" : `#${t}`}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
