import './_DebugPanel.css';

import { debugLogEntry } from '@/components/DebugLogEntry/index.js';
import { html, repeat } from '@/core/index.js';
import { storeModel } from '@/helpers/index.js';
import { t } from '@/i18n/index.js';
import { debugLogs, store } from '@/state/index.js';

/**
 * Renders the live store:change log panel.
 * @returns {ReturnType<typeof html>}
 */
export function debugPanel() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="debug-panel" data-panel="debug-log" data-surface="card">
      <header data-slot="header">
        <h2>${t(language, 'sections.debugLog')}</h2>
        <label data-control-group="checkline" data-density="compact">
          <input
            model=${storeModel('debug.paused', {
              prop: 'checked',
              event: 'change',
            })}
            type="checkbox"
          />
          <span>${t(language, 'labels.pauseLog')}</span>
        </label>
      </header>
      <ol data-list-reset data-slot="entries">
        ${repeat(debugLogs, (entry) => entry.id, debugLogEntry)}
      </ol>
    </section>
  `;
}
