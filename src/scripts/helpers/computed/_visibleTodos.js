import { Signal } from "@/core/index.js";
import { pipelineTodos } from "@/data/index.js";
import { store, tickState } from "../shared/index.js";

/**
 * Visible todo list after filters and sorting are applied.
 */
export const visibleTodos = new Signal.Computed(() => {
  tickState.get();

  return pipelineTodos(
    store.state.todos,
    store.state.filters,
    store.state.preferences.language,
  );
});
