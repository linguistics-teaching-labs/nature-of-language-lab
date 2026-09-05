export const modules = [
  {
    id: "language-change",
    sequence: 1,
    shortTitle: "Language change",
    title: "Language Change: Evolution or Decay?",
    topic: "Change and evidence",
    category: "change-society",
    status: "available",
    description: "Interrogate a deterioration claim, trace systematic changes, model social diffusion, and decide what the evidence actually warrants.",
    concepts: ["Language change", "Social networks", "Claim evaluation"],
    href: "modules/language-change/"
  },
  {
    id: "animal-communication",
    sequence: 2,
    shortTitle: "Animal communication",
    title: "What Counts as Language? Human and Animal Communication",
    topic: "Communication systems",
    category: "communication-cognition",
    status: "proposed",
    description: "Compare design features across human language and animal communication, then decide which similarities and differences the evidence supports.",
    concepts: ["Design features", "Animal communication", "Comparative reasoning"],
    href: null
  },
  {
    id: "language-thought",
    sequence: 3,
    shortTitle: "Language and thought",
    title: "Does Language Shape Thought?",
    topic: "Language and cognition",
    category: "communication-cognition",
    status: "proposed",
    description: "Match claims about color, time, and grammatical categories to evidence, separating linguistic influence from linguistic determinism.",
    concepts: ["Sapir–Whorf", "Categorization", "Causal claims"],
    href: null
  },
  {
    id: "language-comparison",
    sequence: 4,
    shortTitle: "Comparing languages",
    title: "Are Some Languages Better Than Others?",
    topic: "Structure and complexity",
    category: "structure-diversity",
    status: "proposed",
    description: "Compare how languages package meaning across sound, word, and sentence structure without ranking one system as inherently better.",
    concepts: ["Typology", "Complexity", "Structural gaps"],
    href: null
  },
  {
    id: "spelling-reform",
    sequence: 5,
    shortTitle: "Spelling reform",
    title: "Should English Spelling Be Reformed?",
    topic: "Writing systems",
    category: "change-society",
    status: "proposed",
    description: "Test competing spelling reforms against pronunciation coverage, learnability, historical information, and implementation costs.",
    concepts: ["Orthography", "Sound–symbol mapping", "Policy trade-offs"],
    href: null
  },
  {
    id: "english-variation",
    sequence: 6,
    shortTitle: "English variation",
    title: "Dialect, Accent, or “Just Slang”?",
    topic: "Variation and ideology",
    category: "variation-identity",
    status: "proposed",
    description: "Classify accent, dialect, variety, and slang; inspect patterned variation; and separate linguistic description from social evaluation.",
    concepts: ["Dialect and accent", "Patterned variation", "Language ideology"],
    href: null
  },
  {
    id: "language-gender",
    sequence: 7,
    shortTitle: "Language and gender",
    title: "Language and Gender: Form, Function, and Bias",
    topic: "Identity and interpretation",
    category: "variation-identity",
    status: "proposed",
    description: "Interpret the same feature across contexts and examine how expectations about gender shape judgments about speakers.",
    concepts: ["Form and function", "Gender ideology", "Listener perception"],
    href: null
  }
];

export const moduleCategories = [
  { id: "communication-cognition", label: "Communication & cognition" },
  { id: "structure-diversity", label: "Structure & diversity" },
  { id: "change-society", label: "Change, writing & society" },
  { id: "variation-identity", label: "Variation, identity & ideology" }
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
