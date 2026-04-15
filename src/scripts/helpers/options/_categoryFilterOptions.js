import { html } from "@/core/index.js";
import { t } from "@/i18n/index.js";
import { categoryChoiceOptions, currentLanguage } from "./_options.helpers.js";

/**
 * Renders the category filter options using the shared named option pipeline.
 * @returns {ReturnType<typeof html>}
 */
export function categoryFilterOptions() {
  const language = currentLanguage();

  return html`
    <option value="all">${t(language, "options.category.all")}</option>
    ${categoryChoiceOptions()}
  `;
}
