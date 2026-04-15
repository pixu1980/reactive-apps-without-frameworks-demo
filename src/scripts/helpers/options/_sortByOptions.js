import { optionLabel } from "@/i18n/index.js";
import { sortByValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the supported sort field options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function sortByOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(sortByValues, (value) =>
      optionLabel(language, "sortBy", value),
    ),
  );
}
