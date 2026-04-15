import "./_StatsRow.css";

import { html } from "@/core/index.js";
import {
  completedCount,
  openCount,
  selectedCount,
  totalCount,
  visibleCount,
} from "@/helpers/computed/index.js";
import { statCard } from "@/helpers/index.js";
import { store } from "@/helpers/shared/index.js";
import { t } from "@/i18n/index.js";

/**
 * Renders the summary stat cards above the workspace grid.
 * @returns {ReturnType<typeof html>}
 */
export function StatsRow() {
  const language = store.state.preferences.language;

  return html`
    <section aria-label=${t(language, "sections.overview")} data-component="stats-row">
      <ul data-list-reset data-slot="items">
        ${statCard(totalCount, t(language, "stats.total"))} ${statCard(openCount, t(language, "stats.open"))} ${statCard(completedCount, t(language, "stats.done"))}
        ${statCard(visibleCount, t(language, "stats.visible"))} ${statCard(selectedCount, t(language, "stats.selected"))}
      </ul>
    </section>
  `;
}
