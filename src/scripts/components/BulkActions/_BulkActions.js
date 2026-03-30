import "./_BulkActions.css";

import { html } from "@/core/index.js";
import { t } from "@/i18n/index.js";
import {
  clearSelection,
  deleteCompleted,
  deleteSelected,
  selectAllVisible,
  store,
  toggleAllSelected,
  visibleTodos,
} from "@/state/index.js";

/**
 * Renders the bulk action controls operating on the current selection.
 * @returns {ReturnType<typeof html>}
 */
export function BulkActions() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="bulk-actions" data-panel="bulk-actions" data-surface="card">
      <h2>${t(language, "sections.bulkActions")}</h2>
      <menu data-list-reset data-slot="actions-grid">
        <li>
          <button @click=${() => selectAllVisible(visibleTodos)}>${t(language, "buttons.selectVisible")}</button>
        </li>
        <li>
          <button data-variant="secondary" @click=${clearSelection}>${t(language, "buttons.clearSelection")}</button>
        </li>
        <li>
          <button @click=${() => toggleAllSelected(true)}>${t(language, "buttons.completeSelected")}</button>
        </li>
        <li>
          <button data-variant="secondary" @click=${() => toggleAllSelected(false)}>${t(language, "buttons.reopenSelected")}</button>
        </li>
        <li>
          <button data-variant="danger" @click=${deleteSelected}>${t(language, "buttons.deleteSelected")}</button>
        </li>
        <li>
          <button data-variant="danger" @click=${deleteCompleted}>${t(language, "buttons.deleteCompleted")}</button>
        </li>
      </menu>
    </section>
  `;
}
