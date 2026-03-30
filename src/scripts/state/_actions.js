import { createSeedData, ONE_DAY_MS } from "@/data/index.js";
import { t } from "@/i18n/index.js";
import { mainState, store } from "./_store-setup.js";

/** @typedef {import("../data/_data.js").TodoItem} TodoItem */

/**
 * Returns the todo matching the provided identifier.
 * @param {string} id
 * @returns {TodoItem | undefined}
 */
export function getTodoById(id) {
  return store.state.todos.find((todo) => todo.id === id);
}

/**
 * Merges a partial patch into an existing todo item.
 * @param {string} id
 * @param {Partial<TodoItem>} patch
 * @returns {void}
 */
export function updateTodo(id, patch) {
  const index = store.state.todos.findIndex((todo) => todo.id === id);
  if (index < 0) return;
  const current = store.state.todos[index];
  store.state.todos[index] = { ...current, ...patch };
}

/**
 * Removes a todo by identifier.
 * @param {string} id
 * @returns {void}
 */
export function removeTodo(id) {
  store.state.todos = store.state.todos.filter((todo) => todo.id !== id);
}

/**
 * Creates a new todo from the draft form when the title is not empty.
 * @returns {boolean}
 */
export function addTodo() {
  const draft = store.state.draft;
  const language = store.state.preferences.language;

  if (!draft.title.trim()) {
    store.state.ui.todoModal = {
      ...store.state.ui.todoModal,
      open: true,
      error: t(language, "errors.emptyTodoTitle"),
    };
    return false;
  }

  store.state.todos = [
    {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      notes: draft.notes.trim(),
      category: draft.category,
      priority: draft.priority,
      dueDate: draft.dueDate,
      completed: false,
      selected: false,
      createdAt: Date.now(),
    },
    ...store.state.todos,
  ];
  store.state.draft = {
    ...store.state.draft,
    title: "",
    notes: "",
    category: store.state.categories[0] ?? "Inbox",
    priority: "medium",
    dueDate: new Date(Date.now() + ONE_DAY_MS).toISOString().slice(0, 10),
  };
  closeTodoModal();
  return true;
}

/**
 * Marks every selected todo with the provided completion state.
 * @param {boolean} nextCompleted
 * @returns {void}
 */
export function toggleAllSelected(nextCompleted) {
  store.state.todos = store.state.todos.map((todo) =>
    todo.selected ? { ...todo, completed: nextCompleted } : todo,
  );
}

/**
 * Removes every completed todo.
 * @returns {void}
 */
export function deleteCompleted() {
  store.state.todos = store.state.todos.filter((todo) => !todo.completed);
}

/**
 * Removes every selected todo.
 * @returns {void}
 */
export function deleteSelected() {
  store.state.todos = store.state.todos.filter((todo) => !todo.selected);
}

/**
 * Clears the selection state of all todos.
 * @returns {void}
 */
export function clearSelection() {
  store.state.todos = store.state.todos.map((todo) => ({
    ...todo,
    selected: false,
  }));
}

/**
 * Selects the todos currently visible in the filtered list.
 * @param {{ peek(): TodoItem[] }} visibleTodos
 * @returns {void}
 */
export function selectAllVisible(visibleTodos) {
  const ids = new Set(visibleTodos.peek().map((todo) => todo.id));
  store.state.todos = store.state.todos.map((todo) => ({
    ...todo,
    selected: ids.has(todo.id) ? true : todo.selected,
  }));
}

/**
 * Updates the category modal state with a partial patch.
 * @param {Partial<import("../data/_data.js").CategoryModalState>} patch
 * @returns {void}
 */
function updateCategoryModal(patch) {
  store.state.ui.categoryModal = {
    ...store.state.ui.categoryModal,
    ...patch,
  };
}

/**
 * Updates the todo modal state with a partial patch.
 * @param {Partial<import("../data/_data.js").TodoModalState>} patch
 * @returns {void}
 */
function updateTodoModal(patch) {
  store.state.ui.todoModal = {
    ...store.state.ui.todoModal,
    ...patch,
  };
}

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

/**
 * Opens the todo modal and clears transient validation feedback.
 * @returns {void}
 */
export function openTodoModal() {
  updateTodoModal({
    open: true,
    error: "",
  });
}

/**
 * Closes the todo modal while preserving the current draft values.
 * @returns {void}
 */
export function closeTodoModal() {
  updateTodoModal({
    open: false,
    error: "",
  });
}

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

/**
 * Restores the demo to its seed state and bumps the render version.
 * @returns {void}
 */
export function resetDemo() {
  const { preferences } = store.snapshot();
  store.replace({
    ...createSeedData(),
    preferences: {
      ...preferences,
    },
  });
  mainState.set(performance.now());
}
