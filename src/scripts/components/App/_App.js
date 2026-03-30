import "./_App.css";

import { appHeader } from "@/components/AppHeader/index.js";
import { bulkActionsPanel } from "@/components/BulkActions/index.js";
import { categoryModal } from "@/components/CategoryModal/index.js";
import { debugPanel } from "@/components/DebugPanel/index.js";
import { filtersPanel } from "@/components/Filters/index.js";
import { statsRow } from "@/components/StatsRow/index.js";
import { todoModal } from "@/components/TodoModal/index.js";
import { todoListPanel } from "@/components/TodoList/index.js";
import { html } from "@/core/index.js";

/**
 * Renders the full application shell used by the demo.
 * @returns {ReturnType<typeof html>}
 */
export function appView() {
  return html`
    ${appHeader()}
    <main data-component="app-shell">${statsRow()} ${todoListPanel()}</main>
    <aside data-slot="controls">${filtersPanel()} ${bulkActionsPanel()}</aside>
    <aside data-slot="debug-sidebar">${debugPanel()}</aside>
    ${todoModal()} ${categoryModal()}
  `;
}
