import { appView } from "@/components/index.js";
import { effect, render } from "@/core/index.js";
import { isEmbedded, mainState, root, store } from "@/state/index.js";

/**
 * Bootstraps the demo and keeps the root view in sync with store driven invalidations.
 */
document.documentElement.dataset.embed = String(isEmbedded);
root.dataset.appRoot = "true";

let observedAppShell = null;
const appShellResizeObserver = new ResizeObserver(() => {
  syncAppShellSize();
});

/**
 * Mirrors persisted UI preferences onto the document element so CSS can react to them.
 * @returns {void}
 */
function syncDocumentPreferences() {
  const { colorScheme, theme, language } = store.state.preferences;
  document.documentElement.dataset.colorScheme = colorScheme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;
}

/**
 * Measures the main workspace and mirrors its height onto the mount node.
 * @returns {void}
 */
function syncAppShellSize() {
  const appShell = root.querySelector('[data-component="app-shell"]');

  if (!(appShell instanceof HTMLElement)) {
    root.style.removeProperty("--app-main-block-size");
    return;
  }

  if (observedAppShell !== appShell) {
    if (observedAppShell instanceof HTMLElement) {
      appShellResizeObserver.unobserve(observedAppShell);
    }

    observedAppShell = appShell;
    appShellResizeObserver.observe(appShell);
  }

  root.style.setProperty(
    "--app-main-block-size",
    `${Math.ceil(appShell.getBoundingClientRect().height)}px`,
  );
}

/**
 * Schedules a post-render workspace measurement.
 * @returns {void}
 */
function scheduleAppShellSizeSync() {
  requestAnimationFrame(() => {
    syncAppShellSize();
  });
}

effect(() => {
  mainState.get();
  syncDocumentPreferences();
});

effect(() => {
  mainState.get();
  render(appView(), root);
  scheduleAppShellSizeSync();
});

mainState.set(performance.now());
