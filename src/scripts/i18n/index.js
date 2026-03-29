/** @typedef {import("../data/_data.js").LanguageCode} LanguageCode */

/**
 * Locale tags used for formatting and collation.
 * @type {Record<LanguageCode, string>}
 */
const localeByLanguage = {
  en: "en-GB",
  it: "it-IT",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
};

/**
 * Translation catalog used by the demo UI.
 * @type {Record<LanguageCode, Record<string, unknown>>}
 */
const dictionary = {
  en: {
    app: {
      eyebrow: "HTML state, signals, proxy store",
      title: "Vanilla Todo List",
      subcopyPrimary:
        "A vanilla todo demo where forms write directly into a proxy backed store.",
      subcopySecondary:
        "List updates, filters, counters, and the debug log rerender through signals and DOM parts.",
    },
    buttons: {
      resetDemo: "Reset demo",
      newCategory: "New category",
      addTodo: "Add todo",
      cancel: "Cancel",
      createCategory: "Create category",
      selectVisible: "Select visible",
      clearSelection: "Clear selection",
      completeSelected: "Complete selected",
      reopenSelected: "Reopen selected",
      deleteSelected: "Delete selected",
      deleteCompleted: "Delete completed",
      delete: "Delete",
    },
    sections: {
      quickAdd: "Quick add",
      filtersSorting: "Filters and sorting",
      bulkActions: "Bulk actions",
      reactiveList: "Reactive list",
      overview: "Overview",
      debugLog: "store:change log",
    },
    fields: {
      colorScheme: "Color scheme",
      colorTheme: "Color theme",
      language: "Language",
      search: "Search",
      status: "Status",
      category: "Category",
      priority: "Priority",
      sortBy: "Sort by",
      direction: "Direction",
      title: "Title",
      notes: "Notes",
      dueDate: "Due date",
      name: "Name",
    },
    labels: {
      select: "Select",
      done: "Done",
      pauseLog: "Pause log",
    },
    stats: {
      total: "Total",
      open: "Open",
      done: "Done",
      visible: "Visible",
      selected: "Selected",
    },
    placeholders: {
      search: "Search title, notes, category...",
      todoTitle: "What needs to happen?",
      categoryName: "Research",
    },
    modal: {
      eyebrow: "Store driven dialog",
      title: "New category",
      description:
        "Add it once and every category dropdown updates on the next render cycle.",
      help: "Use a unique label so filters and editors stay aligned.",
    },
    messages: {
      visibleSummary: "{count} visible item(s), sorted by {sortBy}",
    },
    errors: {
      emptyCategory: "Enter a category name.",
      duplicateCategory: "That category already exists.",
      missingMount: "Missing application mount node.",
    },
    options: {
      colorScheme: {
        system: "System",
        light: "Light",
        dark: "Dark",
      },
      colorTheme: {
        amber: "Amber",
        cyberpunk: "Cyberpunk",
        wood: "Wood",
        sage: "Sage",
        rose: "Rose",
      },
      priority: {
        all: "All priorities",
        low: "Low",
        medium: "Medium",
        high: "High",
      },
      status: {
        all: "All",
        open: "Open",
        done: "Done",
      },
      direction: {
        asc: "Ascending",
        desc: "Descending",
      },
      sortBy: {
        createdAt: "Created date",
        title: "Title",
        priority: "Priority",
        dueDate: "Due date",
        category: "Category",
      },
      category: {
        all: "All categories",
      },
    },
  },
  it: {
    app: {
      eyebrow: "Stato HTML, segnali, proxy store",
      title: "Vanilla Todo List",
      subcopyPrimary:
        "Una demo todo vanilla in cui i form scrivono direttamente in uno store basato su proxy.",
      subcopySecondary:
        "Lista, filtri, contatori e log di debug si aggiornano con signals e DOM parts.",
    },
    buttons: {
      resetDemo: "Reimposta demo",
      newCategory: "Nuova categoria",
      addTodo: "Aggiungi todo",
      cancel: "Annulla",
      createCategory: "Crea categoria",
      selectVisible: "Seleziona visibili",
      clearSelection: "Azzera selezione",
      completeSelected: "Completa selezionate",
      reopenSelected: "Riapri selezionate",
      deleteSelected: "Elimina selezionate",
      deleteCompleted: "Elimina completate",
      delete: "Elimina",
    },
    sections: {
      quickAdd: "Aggiunta rapida",
      filtersSorting: "Filtri e ordinamento",
      bulkActions: "Azioni di gruppo",
      reactiveList: "Lista reattiva",
      overview: "Panoramica",
      debugLog: "Log store:change",
    },
    fields: {
      colorScheme: "Schema colore",
      colorTheme: "Tema colore",
      language: "Lingua",
      search: "Cerca",
      status: "Stato",
      category: "Categoria",
      priority: "Priorita",
      sortBy: "Ordina per",
      direction: "Direzione",
      title: "Titolo",
      notes: "Note",
      dueDate: "Scadenza",
      name: "Nome",
    },
    labels: {
      select: "Seleziona",
      done: "Fatto",
      pauseLog: "Metti in pausa il log",
    },
    stats: {
      total: "Totali",
      open: "Aperte",
      done: "Fatte",
      visible: "Visibili",
      selected: "Selezionate",
    },
    placeholders: {
      search: "Cerca per titolo, note, categoria...",
      todoTitle: "Cosa deve succedere?",
      categoryName: "Ricerca",
    },
    modal: {
      eyebrow: "Dialog guidato dallo store",
      title: "Nuova categoria",
      description:
        "Aggiungila una volta e ogni menu categoria si aggiorna al ciclo di render successivo.",
      help: "Usa un'etichetta unica per mantenere allineati filtri ed editor.",
    },
    messages: {
      visibleSummary: "{count} elementi visibili, ordinati per {sortBy}",
    },
    errors: {
      emptyCategory: "Inserisci un nome categoria.",
      duplicateCategory: "Questa categoria esiste gia.",
      missingMount: "Manca il nodo di mount dell'applicazione.",
    },
    options: {
      colorScheme: {
        system: "Sistema",
        light: "Chiaro",
        dark: "Scuro",
      },
      colorTheme: {
        amber: "Ambra",
        cyberpunk: "Cyberpunk",
        wood: "Legno",
        sage: "Salvia",
        rose: "Rosa",
      },
      priority: {
        all: "Tutte le priorita",
        low: "Bassa",
        medium: "Media",
        high: "Alta",
      },
      status: {
        all: "Tutte",
        open: "Aperte",
        done: "Fatte",
      },
      direction: {
        asc: "Crescente",
        desc: "Decrescente",
      },
      sortBy: {
        createdAt: "Data di creazione",
        title: "Titolo",
        priority: "Priorita",
        dueDate: "Scadenza",
        category: "Categoria",
      },
      category: {
        all: "Tutte le categorie",
      },
    },
  },
  fr: {
    app: {
      eyebrow: "Etat HTML, signaux, proxy store",
      title: "Vanilla Todo List",
      subcopyPrimary:
        "Une demo todo vanilla ou les formulaires ecrivent directement dans un store base sur proxy.",
      subcopySecondary:
        "La liste, les filtres, les compteurs et le journal de debug se mettent a jour avec signals et DOM parts.",
    },
    buttons: {
      resetDemo: "Reinitialiser la demo",
      newCategory: "Nouvelle categorie",
      addTodo: "Ajouter le todo",
      cancel: "Annuler",
      createCategory: "Creer la categorie",
      selectVisible: "Selectionner les visibles",
      clearSelection: "Effacer la selection",
      completeSelected: "Terminer la selection",
      reopenSelected: "Reouvrir la selection",
      deleteSelected: "Supprimer la selection",
      deleteCompleted: "Supprimer les termines",
      delete: "Supprimer",
    },
    sections: {
      quickAdd: "Ajout rapide",
      filtersSorting: "Filtres et tri",
      bulkActions: "Actions de groupe",
      reactiveList: "Liste reactive",
      overview: "Vue d'ensemble",
      debugLog: "Journal store:change",
    },
    fields: {
      colorScheme: "Schema de couleurs",
      colorTheme: "Theme couleur",
      language: "Langue",
      search: "Recherche",
      status: "Statut",
      category: "Categorie",
      priority: "Priorite",
      sortBy: "Trier par",
      direction: "Direction",
      title: "Titre",
      notes: "Notes",
      dueDate: "Date limite",
      name: "Nom",
    },
    labels: {
      select: "Selectionner",
      done: "Fait",
      pauseLog: "Mettre le journal en pause",
    },
    stats: {
      total: "Total",
      open: "Ouverts",
      done: "Faits",
      visible: "Visibles",
      selected: "Selectionnes",
    },
    placeholders: {
      search: "Rechercher dans le titre, les notes, la categorie...",
      todoTitle: "Que faut-il faire ?",
      categoryName: "Recherche",
    },
    modal: {
      eyebrow: "Dialogue pilote par le store",
      title: "Nouvelle categorie",
      description:
        "Ajoutez-la une fois et chaque menu de categorie se met a jour au prochain cycle de rendu.",
      help: "Utilisez un libelle unique pour garder filtres et editeurs alignes.",
    },
    messages: {
      visibleSummary: "{count} element(s) visibles, tries par {sortBy}",
    },
    errors: {
      emptyCategory: "Saisissez un nom de categorie.",
      duplicateCategory: "Cette categorie existe deja.",
      missingMount: "Le noeud de montage de l'application est introuvable.",
    },
    options: {
      colorScheme: {
        system: "Systeme",
        light: "Clair",
        dark: "Sombre",
      },
      colorTheme: {
        amber: "Ambre",
        cyberpunk: "Cyberpunk",
        wood: "Bois",
        sage: "Sauge",
        rose: "Rose",
      },
      priority: {
        all: "Toutes les priorites",
        low: "Basse",
        medium: "Moyenne",
        high: "Haute",
      },
      status: {
        all: "Tous",
        open: "Ouverts",
        done: "Faits",
      },
      direction: {
        asc: "Croissant",
        desc: "Decroissant",
      },
      sortBy: {
        createdAt: "Date de creation",
        title: "Titre",
        priority: "Priorite",
        dueDate: "Date limite",
        category: "Categorie",
      },
      category: {
        all: "Toutes les categories",
      },
    },
  },
  de: {
    app: {
      eyebrow: "HTML Zustand, Signale, Proxy Store",
      title: "Vanilla Todo List",
      subcopyPrimary:
        "Eine Vanilla Todo Demo, in der Formulare direkt in einen Proxy Store schreiben.",
      subcopySecondary:
        "Liste, Filter, Zaehler und Debug Log werden mit Signals und DOM Parts neu gerendert.",
    },
    buttons: {
      resetDemo: "Demo zuruecksetzen",
      newCategory: "Neue Kategorie",
      addTodo: "Todo hinzufuegen",
      cancel: "Abbrechen",
      createCategory: "Kategorie erstellen",
      selectVisible: "Sichtbare auswaehlen",
      clearSelection: "Auswahl aufheben",
      completeSelected: "Auswahl abschliessen",
      reopenSelected: "Auswahl wieder oeffnen",
      deleteSelected: "Auswahl loeschen",
      deleteCompleted: "Erledigte loeschen",
      delete: "Loeschen",
    },
    sections: {
      quickAdd: "Schnell erfassen",
      filtersSorting: "Filter und Sortierung",
      bulkActions: "Sammelaktionen",
      reactiveList: "Reaktive Liste",
      overview: "Ueberblick",
      debugLog: "store:change Protokoll",
    },
    fields: {
      colorScheme: "Farbschema",
      colorTheme: "Farbthema",
      language: "Sprache",
      search: "Suche",
      status: "Status",
      category: "Kategorie",
      priority: "Prioritaet",
      sortBy: "Sortieren nach",
      direction: "Richtung",
      title: "Titel",
      notes: "Notizen",
      dueDate: "Faelligkeit",
      name: "Name",
    },
    labels: {
      select: "Auswaehlen",
      done: "Erledigt",
      pauseLog: "Protokoll pausieren",
    },
    stats: {
      total: "Gesamt",
      open: "Offen",
      done: "Erledigt",
      visible: "Sichtbar",
      selected: "Ausgewaehlt",
    },
    placeholders: {
      search: "Titel, Notizen, Kategorie durchsuchen...",
      todoTitle: "Was muss passieren?",
      categoryName: "Recherche",
    },
    modal: {
      eyebrow: "Store gesteuerter Dialog",
      title: "Neue Kategorie",
      description:
        "Einmal hinzufuegen und jedes Kategorie Menue aktualisiert sich im naechsten Render Zyklus.",
      help: "Verwende eine eindeutige Bezeichnung, damit Filter und Editoren synchron bleiben.",
    },
    messages: {
      visibleSummary: "{count} sichtbare Eintraege, sortiert nach {sortBy}",
    },
    errors: {
      emptyCategory: "Gib einen Kategorienamen ein.",
      duplicateCategory: "Diese Kategorie existiert bereits.",
      missingMount: "Der Mount Knoten der Anwendung fehlt.",
    },
    options: {
      colorScheme: {
        system: "System",
        light: "Hell",
        dark: "Dunkel",
      },
      colorTheme: {
        amber: "Bernstein",
        cyberpunk: "Cyberpunk",
        wood: "Holz",
        sage: "Salbei",
        rose: "Rosa",
      },
      priority: {
        all: "Alle Prioritaeten",
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
      },
      status: {
        all: "Alle",
        open: "Offen",
        done: "Erledigt",
      },
      direction: {
        asc: "Aufsteigend",
        desc: "Absteigend",
      },
      sortBy: {
        createdAt: "Erstellt am",
        title: "Titel",
        priority: "Prioritaet",
        dueDate: "Faelligkeit",
        category: "Kategorie",
      },
      category: {
        all: "Alle Kategorien",
      },
    },
  },
  es: {
    app: {
      eyebrow: "Estado HTML, senales, proxy store",
      title: "Vanilla Todo List",
      subcopyPrimary:
        "Una demo todo vanilla donde los formularios escriben directamente en un store basado en proxy.",
      subcopySecondary:
        "La lista, los filtros, los contadores y el log de depuracion se actualizan con signals y DOM parts.",
    },
    buttons: {
      resetDemo: "Reiniciar demo",
      newCategory: "Nueva categoria",
      addTodo: "Anadir todo",
      cancel: "Cancelar",
      createCategory: "Crear categoria",
      selectVisible: "Seleccionar visibles",
      clearSelection: "Limpiar seleccion",
      completeSelected: "Completar seleccionadas",
      reopenSelected: "Reabrir seleccionadas",
      deleteSelected: "Eliminar seleccionadas",
      deleteCompleted: "Eliminar completadas",
      delete: "Eliminar",
    },
    sections: {
      quickAdd: "Alta rapida",
      filtersSorting: "Filtros y orden",
      bulkActions: "Acciones masivas",
      reactiveList: "Lista reactiva",
      overview: "Resumen",
      debugLog: "Log store:change",
    },
    fields: {
      colorScheme: "Esquema de color",
      colorTheme: "Tema de color",
      language: "Idioma",
      search: "Buscar",
      status: "Estado",
      category: "Categoria",
      priority: "Prioridad",
      sortBy: "Ordenar por",
      direction: "Direccion",
      title: "Titulo",
      notes: "Notas",
      dueDate: "Fecha limite",
      name: "Nombre",
    },
    labels: {
      select: "Seleccionar",
      done: "Hecho",
      pauseLog: "Pausar log",
    },
    stats: {
      total: "Total",
      open: "Abiertas",
      done: "Hechas",
      visible: "Visibles",
      selected: "Seleccionadas",
    },
    placeholders: {
      search: "Buscar por titulo, notas, categoria...",
      todoTitle: "Que tiene que pasar?",
      categoryName: "Investigacion",
    },
    modal: {
      eyebrow: "Dialogo guiado por el store",
      title: "Nueva categoria",
      description:
        "Anadela una vez y cada menu de categoria se actualizara en el siguiente ciclo de render.",
      help: "Usa una etiqueta unica para mantener alineados filtros y editores.",
    },
    messages: {
      visibleSummary: "{count} elemento(s) visibles, ordenados por {sortBy}",
    },
    errors: {
      emptyCategory: "Introduce un nombre de categoria.",
      duplicateCategory: "Esa categoria ya existe.",
      missingMount: "Falta el nodo de montaje de la aplicacion.",
    },
    options: {
      colorScheme: {
        system: "Sistema",
        light: "Claro",
        dark: "Oscuro",
      },
      colorTheme: {
        amber: "Ambar",
        cyberpunk: "Cyberpunk",
        wood: "Madera",
        sage: "Salvia",
        rose: "Rosa",
      },
      priority: {
        all: "Todas las prioridades",
        low: "Baja",
        medium: "Media",
        high: "Alta",
      },
      status: {
        all: "Todas",
        open: "Abiertas",
        done: "Hechas",
      },
      direction: {
        asc: "Ascendente",
        desc: "Descendente",
      },
      sortBy: {
        createdAt: "Fecha de creacion",
        title: "Titulo",
        priority: "Prioridad",
        dueDate: "Fecha limite",
        category: "Categoria",
      },
      category: {
        all: "Todas las categorias",
      },
    },
  },
};

const timeFormatterCache = new Map();

/**
 * Safely resolves a nested key inside a dictionary branch.
 * @param {Record<string, unknown>} source
 * @param {string} key
 * @returns {string | undefined}
 */
function lookup(source, key) {
  const segments = key.split(".");
  let cursor = /** @type {unknown} */ (source);
  for (const segment of segments) {
    if (typeof cursor !== "object" || cursor === null) return undefined;
    cursor = /** @type {Record<string, unknown>} */ (cursor)[segment];
  }
  return typeof cursor === "string" ? cursor : undefined;
}

/**
 * Replaces named placeholders inside a translated template.
 * @param {string} template
 * @param {Record<string, string | number>} params
 * @returns {string}
 */
function interpolate(template, params) {
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    String(params[name] ?? ""),
  );
}

/**
 * Returns the locale tag for the current UI language.
 * @param {LanguageCode} language
 * @returns {string}
 */
export function localeForLanguage(language) {
  return localeByLanguage[language] ?? localeByLanguage.en;
}

/**
 * Resolves a translated UI string with optional placeholder interpolation.
 * @param {LanguageCode} language
 * @param {string} key
 * @param {Record<string, string | number>} [params={}]
 * @returns {string}
 */
export function t(language, key, params = {}) {
  const messages = dictionary[language] ?? dictionary.en;
  const template = lookup(messages, key) ?? lookup(dictionary.en, key) ?? key;
  return interpolate(template, params);
}

/**
 * Returns a translated label for enum-like option groups.
 * @param {LanguageCode} language
 * @param {string} group
 * @param {string} value
 * @returns {string}
 */
export function optionLabel(language, group, value) {
  return t(language, `options.${group}.${value}`);
}

/**
 * Builds the translated summary label shown above the list.
 * @param {LanguageCode} language
 * @param {number} count
 * @param {string} sortBy
 * @returns {string}
 */
export function visibleSummaryLabel(language, count, sortBy) {
  return t(language, "messages.visibleSummary", {
    count,
    sortBy: optionLabel(language, "sortBy", sortBy),
  });
}

/**
 * Formats debug log timestamps using the active locale.
 * @param {LanguageCode} language
 * @param {Date} [value=new Date()]
 * @returns {string}
 */
export function formatDebugTime(language, value = new Date()) {
  const locale = localeForLanguage(language);
  let formatter = timeFormatterCache.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    timeFormatterCache.set(locale, formatter);
  }
  return formatter.format(value);
}
