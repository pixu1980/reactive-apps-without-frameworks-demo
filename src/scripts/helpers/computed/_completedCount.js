import { Signal } from "@/core/index.js";
import { summary } from "./_summary.js";

/** Number of completed todos. */
export const completedCount = new Signal.Computed(
  () => summary.get().completed,
);
