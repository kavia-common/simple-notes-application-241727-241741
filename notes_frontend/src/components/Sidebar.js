import React, { useMemo } from "react";

/**
 * Sidebar navigation for filters.
 * Keeps existing features discoverable (search, pinned, tags) while staying theme-aware.
 */
export default function Sidebar({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
  pinnedOnly,
  onPinnedOnlyChange,
  notesCount,
  filteredCount,
}) {
  const showPinnedCount = useMemo(() => {
    // Show a pinned count chip only when it provides value (there are pinned notes).
    return typeof notesCount === "number" && notesCount > 0;
  }, [notesCount]);

  return (
    <aside className="sidebar" aria-label="Notes sidebar">
      <div className="sidebarInner">
        <div className="sidebarSection">
          <p className="sidebarTitle">Search</p>
          <div className="sidebarSearch">
            <label className="srOnly" htmlFor="sidebarSearch">
              Search notes
            </label>
            <input
              id="sidebarSearch"
              className="sidebarSearchInput"
              placeholder="Search notes…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              inputMode="search"
              autoComplete="off"
            />
          </div>

          <p className="sidebarMeta" aria-label="Notes count">
            {typeof filteredCount === "number" ? (
              <>
                Showing <strong>{filteredCount}</strong>
                {typeof notesCount === "number" ? <> of {notesCount}</> : null}
              </>
            ) : (
              <>
                <strong>{typeof notesCount === "number" ? notesCount : "—"}</strong> notes
              </>
            )}
          </p>
        </div>

        <div className="sidebarSection">
          <p className="sidebarTitle">Filters</p>

          <button
            type="button"
            className={`sidebarNavItem ${pinnedOnly ? "sidebarNavItemActive" : ""}`}
            onClick={() => onPinnedOnlyChange(!pinnedOnly)}
            aria-pressed={pinnedOnly}
          >
            <span>Pinned</span>
            {showPinnedCount ? (
              <span className="sidebarCountPill" aria-label="Pinned filter toggle">
                {pinnedOnly ? "On" : "Off"}
              </span>
            ) : (
              <span className="sidebarCountPill" aria-label="Pinned filter toggle">
                {pinnedOnly ? "On" : "Off"}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`sidebarNavItem ${activeTag === "all" ? "sidebarNavItemActive" : ""}`}
            onClick={() => onTagChange("all")}
          >
            <span>All notes</span>
            <span className="sidebarCountPill">#{tags.length > 0 ? tags.length - 1 : 0}</span>
          </button>
        </div>

        <div className="sidebarSection">
          <p className="sidebarTitle">Tags</p>

          <nav className="sidebarTagList" aria-label="Filter by tag">
            {(tags || [])
              .filter((t) => t !== "all")
              .map((t) => {
                const isActive = t === activeTag;
                return (
                  <button
                    key={t}
                    type="button"
                    className={`sidebarTag ${isActive ? "sidebarTagActive" : ""}`}
                    onClick={() => onTagChange(t)}
                  >
                    <span className="sidebarTagHash" aria-hidden="true">
                      #
                    </span>
                    <span className="sidebarTagText">{t}</span>
                  </button>
                );
              })}

            {(tags || []).length <= 1 ? (
              <p className="sidebarHelp">
                Add tags to notes (comma-separated) to see them here.
              </p>
            ) : null}
          </nav>
        </div>
      </div>
    </aside>
  );
}
