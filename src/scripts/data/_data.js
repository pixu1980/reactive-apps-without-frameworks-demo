/**
 * Priority level supported by the todo demo.
 * @typedef {"low" | "medium" | "high"} TodoPriority
 */

/**
 * Filter status tokens supported by the pipeline.
 * @typedef {"all" | "open" | "done"} FilterStatus
 */

/**
 * Sort direction tokens supported by the pipeline.
 * @typedef {"asc" | "desc"} SortDirection
 */

/**
 * Sort fields supported by the pipeline.
 * @typedef {"createdAt" | "title" | "priority" | "dueDate" | "category"} SortField
 */

/**
 * Supported color scheme options.
 * @typedef {"light" | "dark" | "system"} ColorScheme
 */

/**
 * Supported color theme options.
 * @typedef {"amber" | "cyberpunk" | "wood" | "sage" | "rose"} ColorTheme
 */

/**
 * Supported language options.
 * @typedef {"it" | "en" | "fr" | "de" | "es"} LanguageCode
 */

/**
 * Single todo item rendered by the demo.
 * @typedef {object} TodoItem
 * @property {string} id
 * @property {string} title
 * @property {string} notes
 * @property {string} category
 * @property {TodoPriority} priority
 * @property {string} dueDate
 * @property {boolean} completed
 * @property {boolean} selected
 * @property {number} createdAt
 */

/**
 * Draft state used by the quick add form.
 * @typedef {object} DraftTodo
 * @property {string} title
 * @property {string} notes
 * @property {string} category
 * @property {TodoPriority} priority
 * @property {string} dueDate
 */

/**
 * Filters used by the generator based pipeline.
 * @typedef {object} FiltersState
 * @property {string} search
 * @property {string} category
 * @property {FilterStatus} status
 * @property {"all" | TodoPriority} priority
 * @property {SortField} sortBy
 * @property {SortDirection} sortDir
 */

/**
 * Single entry shown in the debug event log.
 * @typedef {object} DebugLogEntry
 * @property {string} id
 * @property {string} timestamp
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */

/**
 * Debug panel state.
 * @typedef {object} DebugState
 * @property {boolean} paused
 * @property {DebugLogEntry[]} logs
 */

/**
 * Persisted design system and locale preferences.
 * @typedef {object} PreferencesState
 * @property {ColorScheme} colorScheme
 * @property {ColorTheme} colorTheme
 * @property {LanguageCode} language
 */

/**
 * New category modal state.
 * @typedef {object} CategoryModalState
 * @property {boolean} open
 * @property {string} value
 * @property {string} error
 */

/**
 * Ephemeral UI state used by the demo shell.
 * @typedef {object} UiState
 * @property {CategoryModalState} categoryModal
 */

/**
 * Complete application state stored in the proxy store.
 * @typedef {object} DemoState
 * @property {TodoItem[]} todos
 * @property {string[]} categories
 * @property {DraftTodo} draft
 * @property {FiltersState} filters
 * @property {DebugState} debug
 * @property {PreferencesState} preferences
 * @property {UiState} ui
 */

/**
 * Milliseconds in 24 hours.
 * @type {number}
 */
export const ONE_DAY_MS = 86_400_000;

/**
 * Creates the initial state used by the demo and by the reset action.
 * @returns {DemoState}
 */
export function createSeedData() {
  const now = Date.now();
  return {
    todos: [
      {
        id: crypto.randomUUID(),
        title: "Prepare the talk intro",
        notes:
          "Open with the comparison between expensive frameworks and DOM-first",
        category: "Talk",
        priority: "high",
        dueDate: new Date(now + ONE_DAY_MS).toISOString().slice(0, 10),
        completed: false,
        selected: false,
        createdAt: now - 800000,
      },
      {
        id: crypto.randomUUID(),
        title: "Refine the keyed repeat engine",
        notes: "Verify node movement and cleanup of removed blocks",
        category: "Engine",
        priority: "medium",
        dueDate: new Date(now + 2 * ONE_DAY_MS).toISOString().slice(0, 10),
        completed: false,
        selected: true,
        createdAt: now - 600000,
      },
      {
        id: crypto.randomUUID(),
        title: "Record demo screenshot",
        notes: "Show the store:change event panel",
        category: "Assets",
        priority: "low",
        dueDate: new Date(now + 3 * ONE_DAY_MS).toISOString().slice(0, 10),
        completed: true,
        selected: false,
        createdAt: now - 400000,
      },
    ],
    categories: ["Inbox", "Talk", "Engine", "Assets", "Research"],
    draft: {
      title: "",
      notes: "",
      category: "Inbox",
      priority: "medium",
      dueDate: new Date(now + ONE_DAY_MS).toISOString().slice(0, 10),
    },
    filters: {
      search: "",
      category: "all",
      status: "all",
      priority: "all",
      sortBy: "createdAt",
      sortDir: "desc",
    },
    debug: {
      paused: false,
      logs: [],
    },
    preferences: {
      colorScheme: "system",
      colorTheme: "amber",
      language: "en",
    },
    ui: {
      categoryModal: {
        open: false,
        value: "",
        error: "",
      },
    },
  };
}
