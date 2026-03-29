import { appView } from "@/components/index.js";
import { effect, render } from "@/core/index.js";
import { isEmbedded, mainState, root, store } from "@/state/index.js";

/**
 * Bootstraps the demo and keeps the root view in sync with store driven invalidations.
 */
document.documentElement.dataset.embed = String(isEmbedded);
root.dataset.appRoot = "true";

/**
 * Mirrors persisted UI preferences onto the document element so CSS can react to them.
 * @returns {void}
 */
function syncDocumentPreferences() {
  const { colorScheme, colorTheme, language } = store.state.preferences;
  document.documentElement.dataset.colorScheme = colorScheme;
  document.documentElement.dataset.colorTheme = colorTheme;
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;
}

effect(() => {
  mainState.get();
  syncDocumentPreferences();
});

effect(() => {
  mainState.get();
  render(appView(), root);
});

mainState.set(performance.now());
