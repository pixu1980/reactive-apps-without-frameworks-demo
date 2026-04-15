import { html, model } from "@/core/index.js";
import { categoryChoiceOptions } from "@/helpers/options/_options.helpers.js";

/** @typedef {{ disabled?: boolean }} CategorySelectOptions */

/**
 * Renders a category select bound to a model directive.
 * @param {ReturnType<typeof model>} modelDirective
 * @param {CategorySelectOptions} [options={}]
 * @returns {ReturnType<typeof html>}
 */
export function categorySelect(modelDirective, options = {}) {
  return html`
    <select disabled=${options.disabled} model=${modelDirective}>
      ${categoryChoiceOptions()}
    </select>
  `;
}
