import './_Filters.css';

import { html } from '@/core/index.js';
import { categoryFilterOptions, directionOptions, priorityFilterOptions, sortByOptions, statusOptions, storeModel } from '@/helpers/index.js';
import { t } from '@/i18n/index.js';
import { store } from '@/state/index.js';

/**
 * Prevents the filter form from submitting when Enter is pressed.
 * @param {SubmitEvent} event
 * @returns {void}
 */
function handleFiltersSubmit(event) {
  event.preventDefault();
}

/**
 * Renders the filter and sorting controls that drive the visible list pipeline.
 * @returns {ReturnType<typeof html>}
 */
export function filtersPanel() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="filters-panel" data-panel="filters" data-surface="card">
      <h2>${t(language, 'sections.filtersSorting')}</h2>
      <form data-slot="form" @submit=${handleFiltersSubmit}>
        <label data-field>
          <span>${t(language, 'fields.search')}</span>
          <input model=${storeModel('filters.search')} placeholder=${t(language, 'placeholders.search')} />
        </label>
        <section data-layout="pair-grid" data-slot="primary-filters">
          <label data-field>
            <span>${t(language, 'fields.status')}</span>
            <select model=${storeModel('filters.status', { event: 'change' })}>
              ${statusOptions()}
            </select>
          </label>
          <label data-field>
            <span>${t(language, 'fields.category')}</span>
            <select model=${storeModel('filters.category', { event: 'change' })}>
              ${categoryFilterOptions()}
            </select>
          </label>
        </section>
        <section data-layout="pair-grid" data-slot="secondary-filters">
          <label data-field>
            <span>${t(language, 'fields.priority')}</span>
            <select model=${storeModel('filters.priority', { event: 'change' })}>
              ${priorityFilterOptions()}
            </select>
          </label>
          <label data-field>
            <span>${t(language, 'fields.sortBy')}</span>
            <select model=${storeModel('filters.sortBy', { event: 'change' })}>
              ${sortByOptions()}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${t(language, 'fields.direction')}</span>
          <select model=${storeModel('filters.sortDir', { event: 'change' })}>
            ${directionOptions()}
          </select>
        </label>
      </form>
    </section>
  `;
}
