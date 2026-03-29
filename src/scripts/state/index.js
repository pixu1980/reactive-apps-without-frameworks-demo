/**
 * Public exports for the demo state layer.
 */
export {
  addCategory,
  addTodo,
  clearSelection,
  closeCategoryModal,
  deleteCompleted,
  deleteSelected,
  getTodoById,
  openCategoryModal,
  removeTodo,
  resetDemo,
  selectAllVisible,
  toggleAllSelected,
  updateTodo,
} from "./_actions.js";
export {
  categoryChoices,
  categoryOptions,
  completedCount,
  debugLogs,
  openCount,
  selectedCount,
  summary,
  totalCount,
  visibleCount,
  visibleLabel,
  visibleTodos,
} from "./_computed.js";
export { mainState, isEmbedded, root, store } from "./_store-setup.js";
