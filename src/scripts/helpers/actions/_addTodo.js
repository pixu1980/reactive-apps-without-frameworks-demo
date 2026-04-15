import { ONE_DAY_MS } from "@/data/index.js";
import { t } from "@/i18n/index.js";
import { store } from "../shared/index.js";
import { closeTodoModal } from "./_closeTodoModal.js";

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
