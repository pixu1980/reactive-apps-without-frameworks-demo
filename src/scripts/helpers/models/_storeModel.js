import { model } from "@/core/index.js";
import { store, tickState } from "@/helpers/shared/index.js";

/** @typedef {Parameters<typeof model>[0]} ModelConfig */

/**
 * Creates a model directive backed by a store path.
 * @param {string} path
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */
export function storeModel(path, options = {}) {
  return model({
    signal: tickState,
    get: () => store.get(path),
    set: (value) => store.set(path, value),
    ...options,
  });
}
