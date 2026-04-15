import { optionLabel } from "@/i18n/index.js";
import { directionValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the sorting direction options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function directionOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(directionValues, (value) =>
      optionLabel(language, "direction", value),
    ),
  );
}
