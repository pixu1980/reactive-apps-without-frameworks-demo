import { model } from "@/core/index.js";
import { getTodoById, updateTodo } from "@/helpers/actions/index.js";
import { tickState } from "@/helpers/shared/index.js";

/** @typedef {import("@/data/_data.js").TodoItem} TodoItem */
/** @typedef {Parameters<typeof model>[0]} ModelConfig */

/**
 * Creates a model directive bound to a specific todo field.
 * @param {string} todoId
 * @param {keyof TodoItem} field
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */
export function todoModel(todoId, field, options = {}) {
  return model({
    signal: tickState,
    get: () =>
      getTodoById(todoId)?.[field] ?? (options.prop === "checked" ? false : ""),
    set: (value) => updateTodo(todoId, { [field]: value }),
    ...options,
  });
}
