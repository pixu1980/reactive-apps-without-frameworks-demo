import "./_TodoItem.css";

import { html } from "@/core/index.js";
import { removeTodo } from "@/helpers/actions/index.js";
import { categorySelect, priorityOptions, todoModel } from "@/helpers/index.js";
import { store } from "@/helpers/shared/index.js";
import { optionLabel, t } from "@/i18n/index.js";

/** @typedef {import("../../data/_data.js").TodoItem} TodoItem */

/**
 * Renders a single todo card with inline editors and bulk selection controls.
 * @param {TodoItem} todo
 * @returns {ReturnType<typeof html>}
 */
export function TodoItem(todo) {
  const language = store.state.preferences.language;
  const isDone = todo.completed;

  return html`
    <li data-component="todo-entry">
      <article data-component="todo-item" data-priority=${todo.priority} data-state=${isDone ? "done" : "open"}>
        <header data-slot="header">
          <label data-control-group="checkline" data-slot="selection-toggle">
            <input
              model=${todoModel(todo.id, "selected", {
                prop: "checked",
                event: "change",
              })}
              type="checkbox"
            />
            <span>${t(language, "labels.select")}</span>
          </label>
          <label data-control-group="checkline" data-slot="completion-toggle">
            <input
              model=${todoModel(todo.id, "completed", {
                prop: "checked",
                event: "change",
              })}
              type="checkbox"
            />
            <span>${t(language, "labels.done")}</span>
          </label>
          <input aria-label=${t(language, "fields.title")} aria-readonly=${String(isDone)} data-slot="title" model=${todoModel(todo.id, "title")} readonly=${isDone} />
        </header>

        <section data-slot="meta">
          <label data-field>
            <span>${t(language, "fields.category")}</span>
            ${categorySelect(
              todoModel(todo.id, "category", { event: "change" }),
              {
                disabled: isDone,
              },
            )}
          </label>
          <label data-field>
            <span>${t(language, "fields.priority")}</span>
            <select aria-disabled=${String(isDone)} disabled=${isDone} model=${todoModel(todo.id, "priority", { event: "change" })}>
              ${priorityOptions()}
            </select>
          </label>
          <label data-field>
            <span>${t(language, "fields.dueDate")}</span>
            <input aria-disabled=${String(isDone)} disabled=${isDone} model=${todoModel(todo.id, "dueDate", { event: "change" })} type="date" />
          </label>
        </section>

        <label data-field data-slot="notes">
          <span>${t(language, "fields.notes")}</span>
          <textarea aria-readonly=${String(isDone)} model=${todoModel(todo.id, "notes")} readonly=${isDone} rows="2"></textarea>
        </label>

        <footer data-slot="footer">
          <span data-component="priority-chip" data-priority=${todo.priority}> ${optionLabel(language, "priority", todo.priority)} </span>
          <button @click=${() => removeTodo(todo.id)} data-variant="danger">${t(language, "buttons.delete")}</button>
        </footer>
      </article>
    </li>
  `;
}
