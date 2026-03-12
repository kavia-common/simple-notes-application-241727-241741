// PUBLIC_INTERFACE
export function formatDateTime(ts) {
  /** Format a unix epoch millis timestamp to a short human-readable date/time. */
  if (!ts) return "—";
  try {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}
