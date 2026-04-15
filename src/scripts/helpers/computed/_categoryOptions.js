import { Signal } from "@/core/index.js";
import { categoryChoices } from "./_categoryChoices.js";

/**
 * Category choices exposed to filters and editors.
 */
export const categoryOptions = new Signal.Computed(() => {
  return ["all", ...categoryChoices.get()];
});
