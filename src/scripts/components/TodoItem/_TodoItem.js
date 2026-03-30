import './_TodoItem.css';

import { html } from '@/core/index.js';
import { categorySelect, priorityOptions, todoModel } from '@/helpers/index.js';
import { optionLabel, t } from '@/i18n/index.js';
import { removeTodo, store } from '@/state/index.js';

/** @typedef {import("../../data/_data.js").TodoItem} TodoItem */

/**
 * Renders a single todo card with inline editors and bulk selection controls.
 * @param {TodoItem} todo
 * @returns {ReturnType<typeof html>}
 */
export function todoItem(todo) {
  const language = store.state.preferences.language;

  return html`
    <li data-component="todo-entry">
      <article data-component="todo-item" data-priority=${todo.priority} data-state=${todo.completed ? 'done' : 'open'}>
        <header data-slot="header">
          <label data-control-group="checkline" data-slot="selection-toggle">
            <input
              model=${todoModel(todo.id, 'selected', {
                prop: 'checked',
                event: 'change',
              })}
              type="checkbox"
            />
            <span>${t(language, 'labels.select')}</span>
          </label>
          <label data-control-group="checkline" data-slot="completion-toggle">
            <input
              model=${todoModel(todo.id, 'completed', {
                prop: 'checked',
                event: 'change',
              })}
              type="checkbox"
            />
            <span>${t(language, 'labels.done')}</span>
          </label>
          <input aria-label=${t(language, 'fields.title')} data-slot="title" model=${todoModel(todo.id, 'title')} />
        </header>

        <section data-slot="meta">
          <label data-field>
            <span>${t(language, 'fields.category')}</span>
            ${categorySelect(todoModel(todo.id, 'category', { event: 'change' }))}
          </label>
          <label data-field>
            <span>${t(language, 'fields.priority')}</span>
            <select model=${todoModel(todo.id, 'priority', { event: 'change' })}>
              ${priorityOptions()}
            </select>
          </label>
          <label data-field>
            <span>${t(language, 'fields.dueDate')}</span>
            <input model=${todoModel(todo.id, 'dueDate', { event: 'change' })} type="date" />
          </label>
        </section>

        <label data-field data-slot="notes">
          <span>${t(language, 'fields.notes')}</span>
          <textarea model=${todoModel(todo.id, 'notes')} rows="2"></textarea>
        </label>

        <footer data-slot="footer">
          <span data-component="priority-chip" data-priority=${todo.priority}> ${optionLabel(language, 'priority', todo.priority)} </span>
          <button @click=${() => removeTodo(todo.id)} data-variant="danger">${t(language, 'buttons.delete')}</button>
        </footer>
      </article>
    </li>
  `;
}
