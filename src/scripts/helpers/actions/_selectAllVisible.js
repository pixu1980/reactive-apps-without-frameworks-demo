import { store } from "../shared/index.js";

/** @typedef {import("@/data/_data.js").TodoItem} TodoItem */

/**
 * Selects the todos currently visible in the filtered list.
 * @param {{ peek(): TodoItem[] }} visibleTodos
 * @returns {void}
 */
export function selectAllVisible(visibleTodos) {
  const ids = new Set(visibleTodos.peek().map((todo) => todo.id));

  store.state.todos = store.state.todos.map((todo) => ({
    ...todo,
    selected: ids.has(todo.id) || todo.selected,
  }));
}
