import "./_TodoModal.css";

import { html } from "@/core/index.js";
import { closeTodoModal } from "@/helpers/actions/index.js";
import {
  categorySelect,
  priorityOptions,
  storeModel,
} from "@/helpers/index.js";
import { store } from "@/helpers/shared/index.js";
import { t } from "@/i18n/index.js";
import {
  handleBackdropClick,
  handleModalCancel,
  handleTodoSubmit,
} from "./_TodoModal.helpers.js";

/**
 * Renders the modal used to create a new todo from the shared draft state.
 * @returns {ReturnType<typeof html> | string}
 */
export function TodoModal() {
  const modal = store.state.ui.todoModal;
  const language = store.state.preferences.language;

  if (!modal.open) {
    return "";
  }

  const messageId = modal.error ? "new-todo-error" : "new-todo-help";
  const feedbackState = modal.error ? "error" : "idle";

  return html`
    <dialog aria-describedby=${messageId} aria-labelledby="new-todo-title" data-component="todo-modal" @cancel=${handleModalCancel} @click=${handleBackdropClick} open>
      <article data-slot="surface" data-surface="card">
        <header data-slot="header">
          <section data-slot="copy">
            <p data-text="eyebrow">${t(language, "modal.todoEyebrow")}</p>
            <h2 id="new-todo-title">${t(language, "modal.todoTitle")}</h2>
            <p data-text="subcopy">${t(language, "modal.todoDescription")}</p>
          </section>
        </header>

        <form data-slot="form" @submit=${handleTodoSubmit}>
          <label data-field>
            <span>${t(language, "fields.title")}</span>
            <input aria-describedby=${messageId} aria-invalid=${String(Boolean(modal.error))} autofocus model=${storeModel("draft.title")} placeholder=${t(language, "placeholders.todoTitle")} />
          </label>

          <label data-field>
            <span>${t(language, "fields.notes")}</span>
            <textarea model=${storeModel("draft.notes")} rows="4"></textarea>
          </label>

          <section data-layout="pair-grid" data-slot="meta">
            <label data-field>
              <span>${t(language, "fields.category")}</span>
              ${categorySelect(storeModel("draft.category", { event: "change" }))}
            </label>
            <label data-field>
              <span>${t(language, "fields.priority")}</span>
              <select model=${storeModel("draft.priority", { event: "change" })}>
                ${priorityOptions()}
              </select>
            </label>
          </section>

          <label data-field>
            <span>${t(language, "fields.dueDate")}</span>
            <input model=${storeModel("draft.dueDate", { event: "change" })} type="date" />
          </label>

          <p data-slot="feedback" data-state=${feedbackState} id=${messageId}>${modal.error || t(language, "modal.todoHelp")}</p>

          <footer data-layout="action-grid" data-slot="actions">
            <button data-variant="secondary" type="button" @click=${closeTodoModal}>${t(language, "buttons.cancel")}</button>
            <button type="submit">${t(language, "buttons.addTodo")}</button>
          </footer>
        </form>
      </article>
    </dialog>
  `;
}
