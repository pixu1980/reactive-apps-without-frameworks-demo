import { store } from "../shared/index.js";

/**
 * Updates the todo modal state with a partial patch.
 * @param {Partial<import("@/data/_data.js").TodoModalState>} patch
 * @returns {void}
 */
export function updateTodoModal(patch) {
  store.state.ui.todoModal = {
    ...store.state.ui.todoModal,
    ...patch,
  };
}
