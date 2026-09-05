export const modules = [
  {
    id: "language-change",
    sequence: 1,
    shortTitle: "Language change",
    title: "Language Change: Evolution or Decay?",
    topic: "Change and evidence",
    category: "change-society",
    description: "Interrogate a deterioration claim, trace systematic changes, model social diffusion, and decide what the evidence actually warrants.",
    concepts: ["Language change", "Social networks", "Claim evaluation"],
    href: "modules/language-change/"
  }
];

export const moduleCategories = [
  { id: "change-society", label: "Change, writing & society" }
];

export const defaultModuleOrder = "sequence";

export const moduleOrderOptions = [
  { id: "sequence", label: "Catalog order" },
  { id: "newest", label: "Newest module first" },
  { id: "title", label: "Title, A–Z" },
  { id: "topic", label: "Topic, A–Z" }
];

const collator = new Intl.Collator("en", { sensitivity: "base" });

export function moduleNumber(module) {
  return String(module.sequence).padStart(2, "0");
}

export function getModules(order = defaultModuleOrder) {
  const sorted = [...modules];
  if (order === "newest") return sorted.sort((a, b) => b.sequence - a.sequence);
  if (order === "title") return sorted.sort((a, b) => collator.compare(a.title, b.title));
  if (order === "topic") return sorted.sort((a, b) => collator.compare(a.topic, b.topic));
  return sorted.sort((a, b) => a.sequence - b.sequence);
}

export function getCategory(categoryId) {
  return moduleCategories.find(category => category.id === categoryId);
}

export function getModulesByCategory(categoryId, order = defaultModuleOrder) {
  return getModules(order).filter(module => module.category === categoryId);
}

export function filterModules({ query = "", category = "", order = defaultModuleOrder } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase("en");
  return getModules(order).filter(module => {
    if (category && module.category !== category) return false;
    if (!normalizedQuery) return true;
    const categoryLabel = getCategory(module.category)?.label ?? "";
    const searchableText = [module.title, module.shortTitle, module.topic, categoryLabel, module.description, ...module.concepts]
      .join(" ")
      .toLocaleLowerCase("en");
    return searchableText.includes(normalizedQuery);
  });
}
