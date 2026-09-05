export const modules = [
  {
    id: "language-change",
    sequence: 1,
    shortTitle: "Language change",
    title: "Language Change: Evolution or Decay?",
    topic: "Change and evidence",
    category: "change-society",
    status: "available",
    description: "Test claims of linguistic decline by tracing patterned change, modeling social diffusion, and distinguishing change from loss.",
    concepts: ["Change", "Diffusion", "Evidence"],
    href: "modules/language-change/"
  },
  {
    id: "animal-communication",
    sequence: 2,
    shortTitle: "Animal communication",
    title: "Animal Communication Evidence Lab",
    topic: "Communication systems",
    category: "communication-cognition",
    status: "available",
    description: "Compare human language and animal signaling through design features, then judge what the evidence can and cannot establish.",
    concepts: ["Design features", "Signaling", "Comparison"],
    href: "modules/animal-communication/"
  },
  {
    id: "language-thought",
    sequence: 3,
    shortTitle: "Language and thought",
    title: "Language and Thought: How Strong Is the Claim?",
    topic: "Language and cognition",
    category: "communication-cognition",
    status: "available",
    description: "Match claims about color, time, and grammatical categories to evidence, separating linguistic influence from linguistic determinism.",
    concepts: ["Relativity", "Categorization", "Causality"],
    href: "modules/language-thought/"
  },
  {
    id: "language-comparison",
    sequence: 4,
    shortTitle: "Comparing languages",
    title: "How Languages Package Meaning",
    topic: "Structure and complexity",
    category: "structure-diversity",
    status: "available",
    description: "Compare how languages organize sounds, words, and sentences without ranking one system as inherently better.",
    concepts: ["Typology", "Complexity", "Expression"],
    href: "modules/language-comparison/"
  },
  {
    id: "spelling-reform",
    sequence: 5,
    shortTitle: "Spelling reform",
    title: "Spelling Reform Sandbox",
    topic: "Writing systems",
    category: "change-society",
    status: "available",
    description: "Test spelling reforms against pronunciation coverage, dialect fairness, readability, morphology, and transition costs.",
    concepts: ["Orthography", "Dialect fairness", "Trade-offs"],
    href: "modules/spelling-reform/"
  },
  {
    id: "english-variation",
    sequence: 6,
    shortTitle: "English variation",
    title: "Dialect Rule Detective",
    topic: "Variation and ideology",
    category: "variation-identity",
    status: "available",
    description: "Identify rules in stigmatized varieties and separate linguistic description from social judgments about accents, dialects, and slang.",
    concepts: ["Variation", "Dialect rules", "Ideology"],
    href: "modules/english-variation/"
  },
  {
    id: "language-gender",
    sequence: 7,
    shortTitle: "Language and gender",
    title: "Form, Function, and Gender Stereotypes",
    topic: "Identity and interpretation",
    category: "variation-identity",
    status: "available",
    description: "Interpret the same feature across contexts and examine how expectations about gender shape judgments about speakers.",
    concepts: ["Form/function", "Gender ideology", "Perception"],
    href: "modules/language-gender/"
  },
  {
    id: "digital-tone",
    sequence: 8,
    shortTitle: "Digital tone",
    title: "Digital Tone and Context Explorer",
    topic: "Digital pragmatics",
    category: "change-society",
    status: "available",
    description: "Test how punctuation, emoji, relationship, and platform context change the plausible interpretations of a short digital message.",
    concepts: ["Pragmatics", "Digital cues", "Context"],
    href: "modules/digital-tone/"
  },
  {
    id: "claim-evidence",
    sequence: 9,
    shortTitle: "Claim and evidence",
    title: "Claim and Evidence Inspector",
    topic: "Critical reasoning",
    category: "evidence-reasoning",
    status: "available",
    description: "Build and stress-test linguistic arguments by matching claims with measures, comparisons, alternatives, and warranted conclusions.",
    concepts: ["Claims", "Evidence", "Inference"],
    href: "modules/claim-evidence/"
  },
  {
    id: "speech-sounds",
    sequence: 10,
    shortTitle: "Speech sounds",
    title: "Speech Sounds: Find the Pattern",
    topic: "Phonetics and phonology",
    category: "structure-diversity",
    status: "available",
    description: "Match IPA and articulation clues, identify sound contrasts, and infer which sequences a language permits.",
    concepts: ["Phonetics", "Phonology"],
    href: "modules/speech-sounds/"
  },
  {
    id: "word-structure",
    sequence: 11,
    shortTitle: "Word structure",
    title: "Word Structure: Build the Rule",
    topic: "Morphology and productivity",
    category: "structure-diversity",
    status: "available",
    description: "Segment unfamiliar words into morphemes, infer a harmony rule, and extend productive patterns to novel forms.",
    concepts: ["Morphology", "Productivity"],
    href: "modules/word-structure/"
  },
  {
    id: "sentence-structure",
    sequence: 12,
    shortTitle: "Sentence structure",
    title: "Sentence Structure: Find the Ambiguity",
    topic: "Syntax and constituency",
    category: "structure-diversity",
    status: "available",
    description: "Build alternative structures, test constituents, and connect identical word sequences to different interpretations.",
    concepts: ["Syntax", "Constituency"],
    href: "modules/sentence-structure/"
  },
  {
    id: "meaning-context",
    sequence: 13,
    shortTitle: "Meaning in context",
    title: "Meaning in Context: Said or Implied?",
    topic: "Semantics and pragmatics",
    category: "communication-cognition",
    status: "available",
    description: "Separate entailment, presupposition, and implicature by testing what context allows speakers to cancel or imply.",
    concepts: ["Semantics", "Pragmatics"],
    href: "modules/meaning-context/"
  }
];

export const moduleCategories = [
  { id: "communication-cognition", label: "Communication & cognition" },
  { id: "structure-diversity", label: "Structure & diversity" },
  { id: "change-society", label: "Change, writing & society" },
  { id: "variation-identity", label: "Variation, identity & ideology" },
  { id: "evidence-reasoning", label: "Evidence & reasoning" }
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
