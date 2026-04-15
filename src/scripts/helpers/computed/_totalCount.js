import { Signal } from "@/core/index.js";
import { summary } from "./_summary.js";

/** Total number of todos in the store. */
export const totalCount = new Signal.Computed(() => summary.get().total);
