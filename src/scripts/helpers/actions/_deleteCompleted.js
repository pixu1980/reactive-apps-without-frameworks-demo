import { store } from "../shared/index.js";

/**
 * Removes every completed todo.
 * @returns {void}
 */
export function deleteCompleted() {
  store.state.todos = store.state.todos.filter((todo) => !todo.completed);
}
