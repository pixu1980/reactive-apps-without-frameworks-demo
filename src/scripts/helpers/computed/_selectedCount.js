import { Signal } from "@/core/index.js";
import { summary } from "./_summary.js";

/** Number of selected todos. */
export const selectedCount = new Signal.Computed(() => summary.get().selected);
