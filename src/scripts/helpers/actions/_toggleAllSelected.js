import { store } from "../shared/index.js";

/**
 * Marks every selected todo with the provided completion state.
 * @param {boolean} nextCompleted
 * @returns {void}
 */
export function toggleAllSelected(nextCompleted) {
  store.state.todos = store.state.todos.map((todo) =>
    todo.selected ? { ...todo, completed: nextCompleted } : todo,
  );
}
