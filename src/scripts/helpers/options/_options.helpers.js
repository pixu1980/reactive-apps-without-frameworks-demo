import { html, repeat } from "@/core/index.js";
import { categoryChoices } from "@/helpers/computed/index.js";
import { store } from "@/helpers/shared/index.js";

/** @typedef {import("./_options.constants.js").NamedOption} NamedOption */

/**
 * Renders a static option list from name/value pairs.
 * @param {NamedOption[]} options
 * @returns {ReturnType<typeof html>}
 */
export function namedOptions(options) {
  return html`${repeat(
    options,
    (option) => option.value,
    (option) => html`<option value=${option.value}>${option.label}</option>`,
  )}`;
}

/**
 * Renders the live category options shared by editors.
 * @returns {ReturnType<typeof repeat>}
 */
export function categoryChoiceOptions() {
  return repeat(
    categoryChoices,
    (category) => category,
    (category) => html`<option value=${category}>${category}</option>`,
  );
}

/**
 * Returns the current UI language from persisted preferences.
 * @returns {import("@/data/_data.js").LanguageCode}
 */
export function currentLanguage() {
  return store.state.preferences.language;
}

/**
 * Creates name/value pairs from stable enum values.
 * @param {string[]} values
 * @param {(value: string) => string} getLabel
 * @returns {NamedOption[]}
 */
export function toNamedOptionList(values, getLabel) {
  return values.map((value) => ({ value, label: getLabel(value) }));
}
