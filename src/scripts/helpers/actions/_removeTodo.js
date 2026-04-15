import { store } from "../shared/index.js";

/**
 * Removes a todo by identifier.
 * @param {string} id
 * @returns {void}
 */
export function removeTodo(id) {
  store.state.todos = store.state.todos.filter((todo) => todo.id !== id);
}
