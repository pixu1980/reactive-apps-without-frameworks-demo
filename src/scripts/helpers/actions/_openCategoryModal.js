import { store } from "../shared/index.js";

/**
 * Opens the category modal and resets its previous validation state.
 * @returns {void}
 */
export function openCategoryModal() {
  store.state.ui.categoryModal = {
    open: true,
    value: "",
    error: "",
  };
}
