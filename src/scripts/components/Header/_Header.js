import "./_Header.css";

import { html } from "@/core/index.js";
import {
  colorSchemeOptions,
  languageOptions,
  storeModel,
  themeOptions,
} from "@/helpers/index.js";
import { t } from "@/i18n/index.js";
import {
  openCategoryModal,
  openTodoModal,
  resetDemo,
  store,
} from "@/state/index.js";

/**
 * Renders the hero header and top level demo actions.
 * @returns {ReturnType<typeof html>}
 */
export function Header() {
  const language = store.state.preferences.language;

  return html`
    <header data-component="header" data-surface="card">
      <section data-slot="copy">
        <p data-text="eyebrow">${t(language, "app.eyebrow")}</p>
        <h1>${t(language, "app.title")}</h1>
        <p data-text="subcopy">${t(language, "app.subcopyPrimary")}</p>
        <p data-text="subcopy">${t(language, "app.subcopySecondary")}</p>
      </section>

      <section data-slot="toolbar">
        <menu data-list-reset data-slot="actions">
          <li>
            <button data-variant="warning" @click=${resetDemo}>${t(language, "buttons.resetDemo")}</button>
          </li>
          <li>
            <button @click=${openTodoModal}>${t(language, "buttons.newTodo")}</button>
          </li>
          <li>
            <button data-variant="secondary" @click=${openCategoryModal}>${t(language, "buttons.newCategory")}</button>
          </li>
        </menu>

        <section data-slot="preferences">
          <label data-field>
            <span>${t(language, "fields.colorScheme")}</span>
            <select
              model=${storeModel("preferences.colorScheme", {
                event: "change",
              })}
            >
              ${colorSchemeOptions()}
            </select>
          </label>

          <label data-field>
            <span>${t(language, "fields.theme")}</span>
            <select model=${storeModel("preferences.theme", { event: "change" })}>
              ${themeOptions()}
            </select>
          </label>

          <label data-field>
            <span>${t(language, "fields.language")}</span>
            <select model=${storeModel("preferences.language", { event: "change" })}>
              ${languageOptions()}
            </select>
          </label>
        </section>
      </section>
    </header>
  `;
}
