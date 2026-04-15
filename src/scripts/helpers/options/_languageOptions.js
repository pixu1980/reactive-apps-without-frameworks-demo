import { languageOptionList } from "./_options.constants.js";
import { namedOptions } from "./_options.helpers.js";

/**
 * Renders the supported language selector options.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function languageOptions() {
  return namedOptions(languageOptionList);
}
