import React from "react";

export default function FloatingActionButton({ onClick, label }) {
  return (
    <button type="button" className="fab" onClick={onClick} aria-label={label} title={label}>
      +
    </button>
  );
}
