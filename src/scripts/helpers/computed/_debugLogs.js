import { Signal } from "@/core/index.js";
import { store, tickState } from "../shared/index.js";

/** @typedef {import("@/data/_data.js").DebugLogEntry} DebugLogEntry */

/**
 * Debug log entries currently shown in the right side panel.
 */
export const debugLogs = new Signal.Computed(() => {
  tickState.get();

  return store.state.debug.logs;
});
