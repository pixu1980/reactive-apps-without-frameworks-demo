import { store } from "../shared/index.js";

/**
 * Removes every selected todo.
 * @returns {void}
 */
export function deleteSelected() {
  store.state.todos = store.state.todos.filter((todo) => !todo.selected);
}
