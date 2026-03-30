import "./_TodoList.css";

import { TodoItem } from "@/components/TodoItem/index.js";
import { html, repeat } from "@/core/index.js";
import { t } from "@/i18n/index.js";
import { store, visibleLabel, visibleTodos } from "@/state/index.js";

/**
 * Renders the central todo list and its live visibility label.
 * @returns {ReturnType<typeof html>}
 */
export function TodoList() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="todo-list">
      <header data-slot="header">
        <h2>${t(language, "sections.reactiveList")}</h2>
        <p data-slot="summary">${visibleLabel}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${repeat(visibleTodos, (todo) => `${todo.id}:${language}`, TodoItem)}
      </ol>
    </section>
  `;
}
