import './_QuickAdd.css';

import { html } from '@/core/index.js';
import { categorySelect, priorityOptions, storeModel } from '@/helpers/index.js';
import { t } from '@/i18n/index.js';
import { addTodo, store } from '@/state/index.js';

/**
 * Handles submit from the quick add form.
 * @param {SubmitEvent} event
 * @returns {void}
 */
function handleQuickAddSubmit(event) {
  event.preventDefault();
  addTodo();
}

/**
 * Renders the quick add form bound to the draft store state.
 * @returns {ReturnType<typeof html>}
 */
export function quickAddPanel() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="quick-add-panel" data-panel="quick-add" data-surface="card">
      <h2>${t(language, 'sections.quickAdd')}</h2>
      <form data-slot="form" @submit=${handleQuickAddSubmit}>
        <label data-field>
          <span>${t(language, 'fields.title')}</span>
          <input model=${storeModel('draft.title')} placeholder=${t(language, 'placeholders.todoTitle')} />
        </label>
        <label data-field>
          <span>${t(language, 'fields.notes')}</span>
          <textarea model=${storeModel('draft.notes')} rows="3"></textarea>
        </label>
        <section data-layout="pair-grid" data-slot="draft-meta">
          <label data-field>
            <span>${t(language, 'fields.category')}</span>
            ${categorySelect(storeModel('draft.category', { event: 'change' }))}
          </label>
          <label data-field>
            <span>${t(language, 'fields.priority')}</span>
            <select model=${storeModel('draft.priority', { event: 'change' })}>
              ${priorityOptions()}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${t(language, 'fields.dueDate')}</span>
          <input model=${storeModel('draft.dueDate', { event: 'change' })} type="date" />
        </label>
        <button type="submit">${t(language, 'buttons.addTodo')}</button>
      </form>
    </section>
  `;
}
