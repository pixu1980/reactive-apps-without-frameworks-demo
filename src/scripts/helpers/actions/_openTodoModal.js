import { updateTodoModal } from "./_updateTodoModal.js";

/**
 * Opens the todo modal and clears transient validation feedback.
 * @returns {void}
 */
export function openTodoModal() {
  updateTodoModal({
    open: true,
    error: "",
  });
}
