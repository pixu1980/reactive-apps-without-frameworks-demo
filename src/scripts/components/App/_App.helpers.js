import { createSeedData } from "@/data/index.js";
import { formatDebugTime, t } from "@/i18n/index.js";
import {
  legacyThemeMap,
  MAX_DEBUG_LOG_ENTRIES,
  STORAGE_KEY,
  supportedThemes,
} from "./_App.constants.js";

/** @typedef {import("@/data/_data.js").DebugLogEntry} DebugLogEntry */
/** @typedef {import("@/data/_data.js").DemoState} DemoState */

/**
 * Returns true when the provided value can be spread as a plain record.
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Normalizes theme identifiers including persisted legacy values.
 * @param {unknown} value
 * @param {string} fallback
 * @returns {string}
 */
export function normalizeTheme(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const candidate = legacyThemeMap[value] ?? value;

  return supportedThemes.has(candidate) ? candidate : fallback;
}

/**
 * Merges a persisted snapshot with the latest state shape while resetting ephemeral UI state.
 * @param {unknown} savedState
 * @returns {DemoState}
 */
export function normalizeState(savedState) {
  const seed = createSeedData();

  if (!isRecord(savedState)) {
    return seed;
  }

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
 * Reads the persisted state when available and falls back to the seed data on malformed payloads.
 * @returns {DemoState}
 */
export function readInitialState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return createSeedData();
  }

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    return createSeedData();
  }
}

/**
 * Shape emitted by the proxy store on every mutation.
 * @typedef {object} StoreChangeDetail
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */

/**
 * Appends the latest store mutation to the debug panel.
 * @param {StoreChangeDetail} detail
 * @param {{ state: DemoState }} store
 * @returns {void}
 */
export function appendDebugLog(detail, store) {
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
 * @param {{ snapshot: () => DemoState }} store
 * @returns {void}
 */
export function persistState(store) {
  const snapshot = store.snapshot();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

/**
 * Synchronizes persistence, debug logging, and view invalidation after store writes.
 * @param {CustomEvent<StoreChangeDetail>} event
 * @param {{
 *   store: { state: DemoState, snapshot: () => DemoState },
 *   tickState: { set: (value: number) => void },
 *   getIsWritingDebugLog: () => boolean,
 *   setIsWritingDebugLog: (value: boolean) => void,
 * }} context
 * @returns {void}
 */
export function handleStoreChange(event, context) {
  if (context.getIsWritingDebugLog()) {
    return;
  }

  if (!context.store.state.debug.paused && event.detail.path !== "debug.logs") {
    context.setIsWritingDebugLog(true);

    try {
      appendDebugLog(event.detail, context.store);
    } finally {
      context.setIsWritingDebugLog(false);
    }
  }

  persistState(context.store);
  context.tickState.set(performance.now());
}

/**
 * Resolves an application mount node from an element or selector.
 * @param {HTMLElement | string | null | undefined} [target=document.body]
 * @param {string} language
 * @returns {HTMLElement}
 */
export function resolveMountNode(target = document.body, language) {
  if (typeof target === "string") {
    const node = document.querySelector(target);

    if (node instanceof HTMLElement) {
      return node;
    }

    throw new Error(t(language, "errors.missingMount"));
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  throw new Error(t(language, "errors.missingMount"));
}

/**
 * Mirrors persisted UI preferences onto the document element so CSS can react to them.
 * @param {{ state: DemoState }} store
 * @returns {void}
 */
export function syncDocumentPreferences(store) {
  const { colorScheme, theme, language } = store.state.preferences;

  document.documentElement.dataset.colorScheme = colorScheme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;
}

/**
 * Measures the main workspace and mirrors its height onto the mount node.
 * @param {{
 *   root: HTMLElement,
 *   observedAppShell: HTMLElement | null,
 *   setObservedAppShell: (value: HTMLElement | null) => void,
 *   appShellResizeObserver: ResizeObserver,
 * }} context
 * @returns {void}
 */
export function syncAppShellSize(context) {
  const appShell = context.root.querySelector('[data-component="app-shell"]');

  if (!(appShell instanceof HTMLElement)) {
    context.root.style.removeProperty("--app-main-block-size");

    return;
  }

  if (context.observedAppShell !== appShell) {
    if (context.observedAppShell instanceof HTMLElement) {
      context.appShellResizeObserver.unobserve(context.observedAppShell);
    }

    context.setObservedAppShell(appShell);
    context.appShellResizeObserver.observe(appShell);
  }

  context.root.style.setProperty(
    "--app-main-block-size",
    `${Math.ceil(appShell.getBoundingClientRect().height)}px`,
  );
}

/**
 * Schedules a post-render workspace measurement.
 * @param {() => void} callback
 * @returns {void}
 */
export function scheduleAppShellSizeSync(callback) {
  requestAnimationFrame(() => {
    callback();
  });
}
