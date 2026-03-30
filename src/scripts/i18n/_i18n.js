/** @typedef {import("../data/_data.js").LanguageCode} LanguageCode */

import deCatalog from "./locales/de.json";
import enCatalog from "./locales/en.json";
import esCatalog from "./locales/es.json";
import frCatalog from "./locales/fr.json";
import itCatalog from "./locales/it.json";

/**
 * Locale tags used for formatting and collation.
 * @type {Record<LanguageCode, string>}
 */
const localeByLanguage = {
  en: "en-GB",
  it: "it-IT",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
};

/** @typedef {Record<string, unknown>} LocaleCatalog */

/**
 * Translation catalog used by the demo UI.
 * @type {Record<LanguageCode, LocaleCatalog>}
 */
const dictionary = {
  en: /** @type {LocaleCatalog} */ (enCatalog),
  it: /** @type {LocaleCatalog} */ (itCatalog),
  fr: /** @type {LocaleCatalog} */ (frCatalog),
  de: /** @type {LocaleCatalog} */ (deCatalog),
  es: /** @type {LocaleCatalog} */ (esCatalog),
};

const timeFormatterCache = new Map();

/**
 * Safely resolves a nested key inside a dictionary branch.
 * @param {LocaleCatalog} source
 * @param {string} key
 * @returns {string | undefined}
 */
function lookup(source, key) {
  const segments = key.split(".");
  let cursor = /** @type {unknown} */ (source);

  for (const segment of segments) {
    if (typeof cursor !== "object" || cursor === null) {
      return undefined;
    }

    cursor = /** @type {Record<string, unknown>} */ (cursor)?.[segment];
  }

  return typeof cursor === "string" ? cursor : undefined;
}

/**
 * Replaces named placeholders inside a translated template.
 * @param {string} template
 * @param {Record<string, string | number>} params
 * @returns {string}
 */
function interpolate(template, params) {
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    String(params[name] ?? ""),
  );
}

/**
 * Returns the locale tag for the current UI language.
 * @param {LanguageCode} language
 * @returns {string}
 */
export function localeForLanguage(language) {
  return localeByLanguage[language] ?? localeByLanguage.en;
}

/**
 * Resolves a translated UI string with optional placeholder interpolation.
 * @param {LanguageCode} language
 * @param {string} key
 * @param {Record<string, string | number>} [params={}]
 * @returns {string}
 */
export function t(language, key, params = {}) {
  const messages = dictionary[language] ?? dictionary.en;
  const template = lookup(messages, key) ?? lookup(dictionary.en, key) ?? key;

  return interpolate(template, params);
}

/**
 * Returns a translated label for enum-like option groups.
 * @param {LanguageCode} language
 * @param {string} group
 * @param {string} value
 * @returns {string}
 */
export function optionLabel(language, group, value) {
  return t(language, `options.${group}.${value}`);
}

/**
 * Builds the translated summary label shown above the list.
 * @param {LanguageCode} language
 * @param {number} count
 * @param {string} sortBy
 * @returns {string}
 */
export function visibleSummaryLabel(language, count, sortBy) {
  return t(language, "messages.visibleSummary", {
    count,
    sortBy: optionLabel(language, "sortBy", sortBy),
  });
}

/**
 * Formats debug log timestamps using the active locale.
 * @param {LanguageCode} language
 * @param {Date} [value=new Date()]
 * @returns {string}
 */
export function formatDebugTime(language, value = new Date()) {
  const locale = localeForLanguage(language);
  let formatter = timeFormatterCache.get(locale);

  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    timeFormatterCache.set(locale, formatter);
  }

  return formatter.format(value);
}
