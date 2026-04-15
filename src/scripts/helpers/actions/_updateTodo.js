import { store } from "../shared/index.js";

/** @typedef {import("@/data/_data.js").TodoItem} TodoItem */

/**
 * Merges a partial patch into an existing todo item.
 * @param {string} id
 * @param {Partial<TodoItem>} patch
 * @returns {void}
 */
export function updateTodo(id, patch) {
  const index = store.state.todos.findIndex((todo) => todo.id === id);

  if (index < 0) {
    return;
  }

  const current = store.state.todos[index];

  store.state.todos[index] = { ...current, ...patch };
}
