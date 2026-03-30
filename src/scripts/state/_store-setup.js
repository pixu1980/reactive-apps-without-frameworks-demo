import { Signal, Store } from "@/core/index.js";
import { createSeedData } from "@/data/index.js";
import { formatDebugTime, t } from "@/i18n/index.js";

/** @typedef {import("../data/_data.js").DebugLogEntry} DebugLogEntry */
/** @typedef {import("../data/_data.js").DemoState} DemoState */

const STORAGE_KEY = "reactive-apps-without-frameworks-demo-state-v1";
const MAX_DEBUG_LOG_ENTRIES = 30;
const supportedThemes = new Set([
  "studio",
  "atelier",
  "cabinet",
  "grove",
  "signal",
  "nocturne",
]);
const legacyThemeMap = {
  amber: "studio",
  cyberpunk: "signal",
  wood: "cabinet",
  sage: "grove",
  rose: "atelier",
};

/**
 * Returns true when the provided value can be spread as a plain record.
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalizes theme identifiers including persisted legacy values.
 * @param {unknown} value
 * @param {string} fallback
 * @returns {string}
 */
function normalizeTheme(value, fallback) {
  if (typeof value !== "string") return fallback;

  const candidate = legacyThemeMap[value] ?? value;
  return supportedThemes.has(candidate) ? candidate : fallback;
}

/**
 * Merges a persisted snapshot with the latest state shape while resetting ephemeral UI state.
 * @param {unknown} savedState
 * @returns {DemoState}
 */
function normalizeState(savedState) {
  const seed = createSeedData();
  if (!isRecord(savedState)) return seed;

  const draft = isRecord(savedState.draft) ? savedState.draft : {};
  const filters = isRecord(savedState.filters) ? savedState.filters : {};
  const debug = isRecord(savedState.debug) ? savedState.debug : {};
  const preferences = isRecord(savedState.preferences)
    ? savedState.preferences
    : {};
  const { colorTheme: legacyTheme, ...restPreferences } = preferences;
  const theme = normalizeTheme(
    restPreferences.theme ?? legacyTheme,
    seed.preferences.theme,
  );

  return {
    ...seed,
    ...savedState,
    todos: Array.isArray(savedState.todos) ? savedState.todos : seed.todos,
    categories: Array.isArray(savedState.categories)
      ? savedState.categories
      : seed.categories,
    draft: {
      ...seed.draft,
      ...draft,
    },
    filters: {
      ...seed.filters,
      ...filters,
    },
    debug: {
      ...seed.debug,
      ...debug,
      logs: Array.isArray(debug.logs) ? debug.logs : seed.debug.logs,
    },
    preferences: {
      ...seed.preferences,
      ...restPreferences,
      theme,
    },
    ui: seed.ui,
  };
}

/**
 * Shape emitted by the proxy store on every mutation.
 * @typedef {object} StoreChangeDetail
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */

/**
 * Reads the persisted state when available and falls back to the seed data on malformed payloads.
 * @returns {DemoState}
 */
function readInitialState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return createSeedData();

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return createSeedData();
  }
}

const initialState = readInitialState();

export const store = new Store(initialState);

localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));

/**
 * Signal bumped after each committed mutation to refresh model bindings and computed views.
 */
export const mainState = new Signal.State(0, { equals: () => false });

let isWritingDebugLog = false;

/**
 * Appends the latest store mutation to the debug panel.
 * @param {StoreChangeDetail} detail
 * @returns {void}
 */
function appendDebugLog(detail) {
  /** @type {DebugLogEntry[]} */
  const nextLogs = [
    {
      id: crypto.randomUUID(),
      timestamp: formatDebugTime(store.state.preferences.language),
      ...detail,
    },
    ...store.state.debug.logs,
  ].slice(0, MAX_DEBUG_LOG_ENTRIES);

  store.state.debug.logs = nextLogs;
}

/**
 * Persists a serializable snapshot after each successful mutation.
 * @returns {void}
 */
function persistState() {
  const snapshot = store.snapshot();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

/**
 * Synchronizes persistence, debug logging, and view invalidation after store writes.
 * @param {CustomEvent<StoreChangeDetail>} event
 * @returns {void}
 */
function handleStoreChange(event) {
  // The debug panel writes back into the same store, so nested debug events are ignored.
  if (isWritingDebugLog) return;

  if (!store.state.debug.paused && event.detail.path !== "debug.logs") {
    isWritingDebugLog = true;

    try {
      appendDebugLog(event.detail);
    } finally {
      isWritingDebugLog = false;
    }
  }

  persistState();
  mainState.set(performance.now());
}

window.addEventListener("store:change", handleStoreChange);

/**
 * Resolves an application mount node from an element or selector.
 * @param {HTMLElement | string | null | undefined} [target=document.body]
 * @returns {HTMLElement}
 */
function resolveMountNode(target = document.body) {
  if (typeof target === "string") {
    const node = document.querySelector(target);
    if (node instanceof HTMLElement) return node;
    throw new Error(t(store.state.preferences.language, "errors.missingMount"));
  }

  if (target instanceof HTMLElement) return target;

  throw new Error(t(store.state.preferences.language, "errors.missingMount"));
}

/**
 * Root node used by the template renderer.
 * @type {HTMLElement}
 */
export const root = resolveMountNode(document.body);

/**
 * Whether the demo is running inside the embedded iframe mode.
 * @type {boolean}
 */
export const isEmbedded =
  new URLSearchParams(window.location.search).get("embed") === "1";
