import "./_TodoList.css";

import { todoItem } from "@/components/TodoItem/index.js";
import { html, repeat } from "@/core/index.js";
import { t } from "@/i18n/index.js";
import { visibleLabel, visibleTodos, store } from "@/state/index.js";

/**
 * Renders the central todo list and its live visibility label.
 * @returns {ReturnType<typeof html>}
 */
export function todoListPanel() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="todo-list-panel">
      <header data-slot="header">
        <h2>${t(language, "sections.reactiveList")}</h2>
        <p data-slot="summary">${visibleLabel}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${repeat(visibleTodos, (todo) => `${todo.id}:${language}`, todoItem)}
      </ol>
    </section>
  `;
}
