import { optionLabel } from "@/i18n/index.js";
import { colorSchemeValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the supported color scheme selector options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function colorSchemeOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(colorSchemeValues, (value) =>
      optionLabel(language, "colorScheme", value),
    ),
  );
}
