import { Signal, Store } from "@/core/index.js";
import { STORAGE_KEY } from "./_App.constants.js";
import { readInitialState, resolveMountNode } from "./_App.helpers.js";

const initialState = readInitialState();

export const store = new Store(initialState);

localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));

/**
 * Signal bumped after each committed mutation to refresh model bindings and computed views.
 */
export const tickState = new Signal.State(0, { equals: () => false });

/**
 * Root node used by the template renderer.
 * @type {HTMLElement}
 */
export let root = resolveMountNode(
  document.body,
  initialState.preferences.language,
);

/**
 * Updates the current mount root after the app bootstraps.
 * @param {HTMLElement} nextRoot
 * @returns {void}
 */
export function setRoot(nextRoot) {
  root = nextRoot;
}
