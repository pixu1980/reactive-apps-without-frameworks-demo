import { t } from "@/i18n/index.js";
import { store } from "../shared/index.js";
import { closeCategoryModal } from "./_closeCategoryModal.js";
import { updateCategoryModal } from "./_updateCategoryModal.js";

/**
 * Adds a new category from the modal state when the value is valid and unique.
 * @param {string} [inputValue=store.state.ui.categoryModal.value]
 * @returns {boolean}
 */
export function addCategory(inputValue = store.state.ui.categoryModal.value) {
  const value = inputValue.trim();
  const language = store.state.preferences.language;

  if (!value) {
    updateCategoryModal({
      open: true,
      error: t(language, "errors.emptyCategory"),
    });

    return false;
  }

  const alreadyExists = store.state.categories.some(
    (category) => category.toLowerCase() === value.toLowerCase(),
  );

  if (alreadyExists) {
    updateCategoryModal({
      open: true,
      error: t(language, "errors.duplicateCategory"),
    });

    return false;
  }

  store.state.categories = [...store.state.categories, value];
  closeCategoryModal();

  return true;
}
