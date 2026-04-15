import { optionLabel } from "@/i18n/index.js";
import { themeValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the supported theme selector options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function themeOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(themeValues, (value) =>
      optionLabel(language, "theme", value),
    ),
  );
}
