import { Signal } from "@/core/index.js";
import { visibleSummaryLabel } from "@/i18n/index.js";
import { store } from "../shared/index.js";
import { summary } from "./_summary.js";

/**
 * Human readable label shown above the filtered list.
 */
export const visibleLabel = new Signal.Computed(() =>
  visibleSummaryLabel(
    store.state.preferences.language,
    summary.get().visible,
    store.state.filters.sortBy,
  ),
);
