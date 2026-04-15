import { store } from "../shared/index.js";

/** @typedef {import("@/data/_data.js").TodoItem} TodoItem */

/**
 * Returns the todo matching the provided identifier.
 * @param {string} id
 * @returns {TodoItem | undefined}
 */
export function getTodoById(id) {
  return store.state.todos.find((todo) => todo.id === id);
}
