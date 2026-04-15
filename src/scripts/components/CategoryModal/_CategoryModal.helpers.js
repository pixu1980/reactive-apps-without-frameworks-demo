import { addCategory, closeCategoryModal } from "@/helpers/actions/index.js";

/**
 * Handles submit from the category modal form.
 * @param {SubmitEvent} event
 * @returns {void}
 */
export function handleCategorySubmit(event) {
  event.preventDefault();
  addCategory();
}

/**
 * Closes the modal when the user cancels the native dialog.
 * @param {Event} event
 * @returns {void}
 */
export function handleModalCancel(event) {
  event.preventDefault();
  closeCategoryModal();
}

/**
 * Closes the modal when the overlay itself is clicked.
 * @param {MouseEvent} event
 * @returns {void}
 */
export function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeCategoryModal();
  }
}
