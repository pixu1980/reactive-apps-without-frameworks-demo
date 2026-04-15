import { Signal } from "@/core/index.js";
import { summary } from "./_summary.js";

/** Number of open todos. */
export const openCount = new Signal.Computed(() => summary.get().open);
