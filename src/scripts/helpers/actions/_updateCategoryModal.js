import { store } from "../shared/index.js";

/**
 * Updates the category modal state with a partial patch.
 * @param {Partial<import("@/data/_data.js").CategoryModalState>} patch
 * @returns {void}
 */
export function updateCategoryModal(patch) {
  store.state.ui.categoryModal = {
    ...store.state.ui.categoryModal,
    ...patch,
  };
}
