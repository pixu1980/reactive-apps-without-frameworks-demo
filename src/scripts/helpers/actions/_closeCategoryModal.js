import { store } from "../shared/index.js";

/**
 * Closes the category modal and clears the transient form state.
 * @returns {void}
 */
export function closeCategoryModal() {
  store.state.ui.categoryModal = {
    open: false,
    value: "",
    error: "",
  };
}
