import "./_App.css";

import { BulkActions } from "@/components/BulkActions/index.js";
import { CategoryModal } from "@/components/CategoryModal/index.js";
import { DebugPanel } from "@/components/DebugPanel/index.js";
import { Filters } from "@/components/Filters/index.js";
import { Header } from "@/components/Header/index.js";
import { StatsRow } from "@/components/StatsRow/index.js";
import { TodoList } from "@/components/TodoList/index.js";
import { TodoModal } from "@/components/TodoModal/index.js";
import { effect, html, render } from "@/core/index.js";

import {
  handleStoreChange,
  resolveMountNode,
  scheduleAppShellSizeSync,
  syncAppShellSize,
  syncDocumentPreferences,
} from "./_App.helpers.js";

import { root, setRoot, store, tickState } from "./_App.state.js";

let isWritingDebugLog = false;

let observedAppShell = null;
let isMounted = false;

const appShellResizeObserver = new ResizeObserver(() => {
  syncAppShellSize({
    root,
    observedAppShell,
    setObservedAppShell: (value) => {
      observedAppShell = value;
    },
    appShellResizeObserver,
  });
});

window.addEventListener("store:change", (event) => {
  handleStoreChange(event, {
    store,
    tickState,
    getIsWritingDebugLog: () => isWritingDebugLog,
    setIsWritingDebugLog: (value) => {
      isWritingDebugLog = value;
    },
  });
});

/**
 * Renders the full application shell used by the demo.
 * @returns {ReturnType<typeof html>}
 */
export function App() {
  return html`
    ${Header()}
    <main data-component="app-shell">${StatsRow()} ${TodoList()}</main>
    <aside data-slot="controls">${Filters()} ${BulkActions()}</aside>
    <aside data-slot="debug-sidebar">${DebugPanel()}</aside>
    ${TodoModal()} ${CategoryModal()}
  `;
}

/**
 * Boots the demo and keeps the root view in sync with store driven invalidations.
 * @param {HTMLElement | string | null | undefined} [target=document.body]
 * @returns {HTMLElement}
 */
export function mountApp(target = document.body) {
  if (isMounted) {
    return root;
  }

  setRoot(resolveMountNode(target, store.state.preferences.language));
  root.dataset.appRoot = "true";

  effect(() => {
    tickState.get();
    syncDocumentPreferences(store);
  });

  effect(() => {
    tickState.get();
    render(App(), root);
    scheduleAppShellSizeSync(() => {
      syncAppShellSize({
        root,
        observedAppShell,
        setObservedAppShell: (value) => {
          observedAppShell = value;
        },
        appShellResizeObserver,
      });
    });
  });

  tickState.set(performance.now());
  isMounted = true;

  return root;
}
