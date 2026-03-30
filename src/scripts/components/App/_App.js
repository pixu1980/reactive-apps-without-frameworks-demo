import "./_App.css";

import { BulkActions } from "@/components/BulkActions/index.js";
import { CategoryModal } from "@/components/CategoryModal/index.js";
import { DebugPanel } from "@/components/DebugPanel/index.js";
import { Filters } from "@/components/Filters/index.js";
import { Header } from "@/components/Header/index.js";
import { StatsRow } from "@/components/StatsRow/index.js";
import { TodoList } from "@/components/TodoList/index.js";
import { TodoModal } from "@/components/TodoModal/index.js";
import { html } from "@/core/index.js";

/**
 * Renders the full application shell used by the demo.
 * @returns {ReturnType<typeof html>}
 */
export function App() {
  return html`
    ${Header()}
    <main data-component="app-shell">${StatsRow()} ${TodoList()}</main>
    <aside data-slot="controls">${Filters()} ${BulkActions()}</aside>
    <aside data-slot="debug-sidebar">${DebugPanel()}</aside>
    ${TodoModal()} ${CategoryModal()}
  `;
}
