import { updateTodoModal } from "./_updateTodoModal.js";

/**
 * Closes the todo modal while preserving the current draft values.
 * @returns {void}
 */
export function closeTodoModal() {
  updateTodoModal({
    open: false,
    error: "",
  });
}
