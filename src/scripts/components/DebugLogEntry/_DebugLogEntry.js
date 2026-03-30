import "./_DebugLogEntry.css";

import { html } from "@/core/index.js";

/** @typedef {import("../../data/_data.js").DebugLogEntry} DebugLogEntry */

/**
 * Renders a single immutable store change entry.
 * @param {DebugLogEntry} entry
 * @returns {ReturnType<typeof html>}
 */
export function DebugLogEntry(entry) {
  const payload = JSON.stringify(
    { oldValue: entry.oldValue, newValue: entry.newValue },
    null,
    2,
  );

  return html`
    <li>
      <article data-component="debug-log-entry">
        <header data-slot="entry-header">
          <strong>${entry.path || "(root)"}</strong>
          <time>${entry.timestamp}</time>
        </header>
        <pre>${payload}</pre>
      </article>
    </li>
  `;
}
