import { store } from "../shared/index.js";

/**
 * Clears the selection state of all todos.
 * @returns {void}
 */
export function clearSelection() {
  store.state.todos = store.state.todos.map((todo) => ({
    ...todo,
    selected: false,
  }));
}
