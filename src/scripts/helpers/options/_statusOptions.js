import { optionLabel } from "@/i18n/index.js";
import { statusValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the status filter options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function statusOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(statusValues, (value) =>
      optionLabel(language, "status", value),
    ),
  );
}
