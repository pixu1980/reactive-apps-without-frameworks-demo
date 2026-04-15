import { Signal } from "@/core/index.js";
import { summary } from "./_summary.js";

/** Number of todos visible after filtering. */
export const visibleCount = new Signal.Computed(() => summary.get().visible);
