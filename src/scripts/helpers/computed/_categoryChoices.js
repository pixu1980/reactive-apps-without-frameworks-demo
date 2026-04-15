import { Signal } from "@/core/index.js";
import { store, tickState } from "../shared/index.js";

/**
 * Category choices exposed to editors and creation flows.
 */
export const categoryChoices = new Signal.Computed(() => {
  tickState.get();

  return store.state.categories;
});
