import "./_CategoryModal.css";

import { html } from "@/core/index.js";
import { storeModel } from "@/helpers/index.js";
import { t } from "@/i18n/index.js";
import { addCategory, closeCategoryModal, store } from "@/state/index.js";

/**
 * Handles submit from the category modal form.
 * @param {SubmitEvent} event
 * @returns {void}
 */
function handleCategorySubmit(event) {
  event.preventDefault();
  addCategory();
}

/**
 * Closes the modal when the user cancels the native dialog.
 * @param {Event} event
 * @returns {void}
 */
function handleModalCancel(event) {
  event.preventDefault();
  closeCategoryModal();
}

/**
 * Closes the modal when the overlay itself is clicked.
 * @param {MouseEvent} event
 * @returns {void}
 */
function handleBackdropClick(event) {
  event.target === event.currentTarget && closeCategoryModal();
}

/**
 * Renders the modal used to create a new category without relying on prompt().
 * @returns {ReturnType<typeof html> | string}
 */
export function categoryModal() {
  const modal = store.state.ui.categoryModal;
  const language = store.state.preferences.language;

  if (!modal.open) {
    return "";
  }

  const messageId = modal.error ? "new-category-error" : "new-category-help";
  const feedbackState = modal.error ? "error" : "idle";

  return html`
    <dialog aria-describedby=${messageId} aria-labelledby="new-category-title" data-component="category-modal" @cancel=${handleModalCancel} @click=${handleBackdropClick} open>
      <article data-slot="surface" data-surface="card">
        <header data-slot="copy">
          <p data-text="eyebrow">${t(language, "modal.eyebrow")}</p>
          <h2 id="new-category-title">${t(language, "modal.title")}</h2>
          <p data-text="subcopy">${t(language, "modal.description")}</p>
        </header>

        <form data-slot="form" @submit=${handleCategorySubmit}>
          <label data-field>
            <span>${t(language, "fields.name")}</span>
            <input
              aria-describedby=${messageId}
              aria-invalid=${String(Boolean(modal.error))}
              autofocus
              model=${storeModel("ui.categoryModal.value")}
              placeholder=${t(language, "placeholders.categoryName")}
            />
          </label>

          <p data-slot="feedback" data-state=${feedbackState} id=${messageId}>${modal.error || t(language, "modal.help")}</p>

          <footer data-layout="action-grid" data-slot="actions">
            <button data-variant="secondary" type="button" @click=${closeCategoryModal}>${t(language, "buttons.cancel")}</button>
            <button type="submit">${t(language, "buttons.createCategory")}</button>
          </footer>
        </form>
      </article>
    </dialog>
  `;
}
