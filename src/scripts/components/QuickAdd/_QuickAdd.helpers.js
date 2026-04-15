import { addTodo } from "@/helpers/actions/index.js";

/**
 * Handles submit from the quick add form.
 * @param {SubmitEvent} event
 * @returns {void}
 */
export function handleQuickAddSubmit(event) {
  event.preventDefault();
  addTodo();
}
