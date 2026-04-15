/** @typedef {{ value: string, label: string }} NamedOption */

export const colorSchemeValues = ["system", "light", "dark"];
export const themeValues = [
  "studio",
  "atelier",
  "cabinet",
  "grove",
  "signal",
  "nocturne",
];
export const priorityValues = ["low", "medium", "high"];
export const statusValues = ["all", "open", "done"];
export const directionValues = ["asc", "desc"];
export const sortByValues = [
  "createdAt",
  "title",
  "priority",
  "dueDate",
  "category",
];

/** @type {NamedOption[]} */
export const languageOptionList = [
  { value: "it", label: "🇮🇹 Italiano" },
  { value: "en", label: "🇬🇧 English" },
  { value: "fr", label: "🇫🇷 Français" },
  { value: "de", label: "🇩🇪 Deutsch" },
  { value: "es", label: "🇪🇸 Español" },
];
