import { html } from "@/core/index.js";

/**
 * Renders a single stat card that accepts a raw value or a signal.
 * @param {unknown} signal
 * @param {string} label
 * @returns {ReturnType<typeof html>}
 */
export function statCard(signal, label) {
  return html`
    <li>
      <article data-component="stat-card" data-surface="card">
        <strong>${signal}</strong>
        <span>${label}</span>
      </article>
    </li>
  `;
}
