import { Signal } from "@/core/index.js";
import { store, tickState } from "../shared/index.js";
import { visibleTodos } from "./_visibleTodos.js";

/**
 * Aggregated counters used across the dashboard cards and labels.
 * @typedef {object} TodoSummary
 * @property {number} total
 * @property {number} completed
 * @property {number} open
 * @property {number} selected
 * @property {number} visible
 */

/**
 * Shared summary signal used by the stat cards and list labels.
 */
export const summary = new Signal.Computed(() => {
  tickState.get();

  const todos = store.state.todos;
  let total = 0;
  let completed = 0;
  let selected = 0;

  for (const todo of todos) {
    total += 1;

    if (todo.completed) {
      completed += 1;
    }

    if (todo.selected) {
      selected += 1;
    }
  }

  /** @type {TodoSummary} */
  return {
    total,
    completed,
    open: total - completed,
    selected,
    visible: visibleTodos.get().length,
  };
});
