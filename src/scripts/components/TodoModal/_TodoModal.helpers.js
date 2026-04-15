import { addTodo, closeTodoModal } from "@/helpers/actions/index.js";

/**
 * Handles submit from the todo modal form.
 * @param {SubmitEvent} event
 * @returns {void}
 */
export function handleTodoSubmit(event) {
  event.preventDefault();
  addTodo();
}

/**
 * Closes the modal when the user cancels the native dialog.
 * @param {Event} event
 * @returns {void}
 */
export function handleModalCancel(event) {
  event.preventDefault();
  closeTodoModal();
}

/**
 * Closes the modal when the overlay itself is clicked.
 * @param {MouseEvent} event
 * @returns {void}
 */
export function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeTodoModal();
  }
}
