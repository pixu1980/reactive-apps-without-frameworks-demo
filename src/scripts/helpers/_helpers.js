import { html, model, repeat } from "@/core/index.js";
import { optionLabel, t } from "@/i18n/index.js";
import {
  categoryChoices,
  getTodoById,
  tickState,
  store,
  updateTodo,
} from "@/state/index.js";

/** @typedef {import("../data/_data.js").TodoItem} TodoItem */
/** @typedef {Parameters<typeof model>[0]} ModelConfig */
/** @typedef {{ value: string, label: string }} NamedOption */

const colorSchemeValues = ["system", "light", "dark"];
const themeValues = [
  "studio",
  "atelier",
  "cabinet",
  "grove",
  "signal",
  "nocturne",
];
const priorityValues = ["low", "medium", "high"];
const statusValues = ["all", "open", "done"];
const directionValues = ["asc", "desc"];
const sortByValues = ["createdAt", "title", "priority", "dueDate", "category"];

/** @type {NamedOption[]} */
const languageOptionList = [
  { value: "it", label: "🇮🇹 Italiano" },
  { value: "en", label: "🇬🇧 English" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "de", label: "🇩🇪 Deutsch" },
  { value: "es", label: "🇪🇸 Español" },
];

/**
 * Renders a static option list from name/value pairs.
 * @param {NamedOption[]} options
 * @returns {ReturnType<typeof html>}
 */
function namedOptions(options) {
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
function categoryChoiceOptions() {
  return repeat(
    categoryChoices,
    (category) => category,
    (category) => html`<option value=${category}>${category}</option>`,
  );
}

/**
 * Returns the current UI language from persisted preferences.
 * @returns {import("../data/_data.js").LanguageCode}
 */
function currentLanguage() {
  return store.state.preferences.language;
}

/**
 * Creates name/value pairs from stable enum values.
 * @param {string[]} values
 * @param {(value: string) => string} getLabel
 * @returns {NamedOption[]}
 */
function toNamedOptionList(values, getLabel) {
  return values.map((value) => ({ value, label: getLabel(value) }));
}

/**
 * Creates a model directive backed by a store path.
 * @param {string} path
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */
export function storeModel(path, options = {}) {
  return model({
    signal: tickState,
    get: () => store.get(path),
    set: (value) => store.set(path, value),
    ...options,
  });
}

/**
 * Creates a model directive bound to a specific todo field.
 * @param {string} todoId
 * @param {keyof TodoItem} field
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */
export function todoModel(todoId, field, options = {}) {
  return model({
    signal: tickState,
    get: () =>
      getTodoById(todoId)?.[field] ?? (options.prop === "checked" ? false : ""),
    set: (value) => updateTodo(todoId, { [field]: value }),
    ...options,
  });
}

/**
 * Renders the static priority options used by editors.
 * @returns {ReturnType<typeof html>}
 */
export function priorityOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(priorityValues, (value) =>
      optionLabel(language, "priority", value),
    ),
  );
}

/**
 * Renders the priority filter options including the all sentinel.
 * @returns {ReturnType<typeof html>}
 */
export function priorityFilterOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(["all", ...priorityValues], (value) =>
      optionLabel(language, "priority", value),
    ),
  );
}

/**
 * Renders the status filter options.
 * @returns {ReturnType<typeof html>}
 */
export function statusOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(statusValues, (value) =>
      optionLabel(language, "status", value),
    ),
  );
}

/**
 * Renders the sorting direction options.
 * @returns {ReturnType<typeof html>}
 */
export function directionOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(directionValues, (value) =>
      optionLabel(language, "direction", value),
    ),
  );
}

/**
 * Renders the supported color scheme selector options.
 * @returns {ReturnType<typeof html>}
 */
export function colorSchemeOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(colorSchemeValues, (value) =>
      optionLabel(language, "colorScheme", value),
    ),
  );
}

/**
 * Renders the supported theme selector options.
 * @returns {ReturnType<typeof html>}
 */
export function themeOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(themeValues, (value) =>
      optionLabel(language, "theme", value),
    ),
  );
}

/**
 * Renders the supported language selector options.
 * @returns {ReturnType<typeof html>}
 */
export function languageOptions() {
  return namedOptions(languageOptionList);
}

/**
 * Renders the supported sort field options.
 * @returns {ReturnType<typeof html>}
 */
export function sortByOptions() {
  const language = currentLanguage();
  return namedOptions(
    toNamedOptionList(sortByValues, (value) =>
      optionLabel(language, "sortBy", value),
    ),
  );
}

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

/**
 * Renders a category select bound to a model directive.
 * @param {ReturnType<typeof model>} modelDirective
 * @returns {ReturnType<typeof html>}
 */
export function categorySelect(modelDirective) {
  return html`
    <select model=${modelDirective}>
      ${categoryChoiceOptions()}
    </select>
  `;
}

/**
 * Renders a single stat card that accepts a raw value or a signal.
 * @param {unknown} signal
 * @param {string} label
 * @returns {ReturnType<typeof html>}
 */
export function statCard(signal, label) {
  return html`
    <li>
      <article data-component="stat-card" data-surface="card">
        <strong>${signal}</strong>
        <span>${label}</span>
      </article>
    </li>
  `;
}
