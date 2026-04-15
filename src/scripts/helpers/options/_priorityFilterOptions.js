import { optionLabel } from "@/i18n/index.js";
import { priorityValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the priority filter options including the all sentinel.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function priorityFilterOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(["all", ...priorityValues], (value) =>
      optionLabel(language, "priority", value),
    ),
  );
}
