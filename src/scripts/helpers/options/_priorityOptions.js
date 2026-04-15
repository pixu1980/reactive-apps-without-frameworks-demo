import { optionLabel } from "@/i18n/index.js";
import { priorityValues } from "./_options.constants.js";
import {
  currentLanguage,
  namedOptions,
  toNamedOptionList,
} from "./_options.helpers.js";

/**
 * Renders the static priority options used by editors.
 * @returns {ReturnType<typeof namedOptions>}
 */
export function priorityOptions() {
  const language = currentLanguage();

  return namedOptions(
    toNamedOptionList(priorityValues, (value) =>
      optionLabel(language, "priority", value),
    ),
  );
}
