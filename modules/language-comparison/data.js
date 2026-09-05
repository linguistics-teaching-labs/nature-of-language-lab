export const phenomena = [
  { id: "dual", label: "Obligatory dual number", level: "morphology", prompt: "A language marks exactly two objects with a dedicated number form.", meaning: "Exactly two kayaks arrived.", source: "A dual suffix on the noun", english: "Use the phrase “two kayaks” or “both kayaks.”" },
  { id: "evidential", label: "Reported-information marker", level: "morphology", prompt: "A language marks whether information was witnessed or reported.", meaning: "It rained, according to someone else.", source: "A reported-evidence suffix", english: "Use a phrase such as “apparently” or “I was told that.”" },
  { id: "inclusive", label: "Inclusive/exclusive “we”", level: "lexicon", prompt: "A pronoun distinguishes whether the addressee is included in “we.”", meaning: "We—including you—will leave.", source: "A dedicated inclusive pronoun", english: "Add wording such as “all of us, including you.”" },
  { id: "word-order", label: "Question word order", level: "syntax", prompt: "A language changes constituent order to mark many information questions.", meaning: "What did the student read?", source: "A sentence-level ordering pattern", english: "English uses auxiliary placement and a fronted question word." }
];

export const levels = [
  { id: "phonology", text: "Sound-system pattern" },
  { id: "morphology", text: "Structure inside words" },
  { id: "syntax", text: "Organization of phrases and sentences" },
  { id: "lexicon", text: "Distinct conventional word choices" }
];

export const strategies = [
  { id: "phrase", text: "Use lexical wording or a short paraphrase to make the distinction explicit." },
  { id: "impossible", text: "Conclude that English speakers cannot understand or express the meaning." },
  { id: "borrow", text: "The meaning is available only after borrowing the other language’s exact form." }
];

export const profiles = [
  { id: "a", label: "Pattern A", scores: { "Sound inventory": 2, "Word structure": 5, "Sentence constraints": 2, "Lexical distinctions": 3 } },
  { id: "b", label: "Pattern B", scores: { "Sound inventory": 4, "Word structure": 1, "Sentence constraints": 5, "Lexical distinctions": 3 } }
];

export const weightSets = [
  { id: "equal", label: "Equal weight", weights: { "Sound inventory": 1, "Word structure": 1, "Sentence constraints": 1, "Lexical distinctions": 1 } },
  { id: "word", label: "Emphasize word structure", weights: { "Sound inventory": 1, "Word structure": 3, "Sentence constraints": 1, "Lexical distinctions": 1 } },
  { id: "sentence", label: "Emphasize sentence constraints", weights: { "Sound inventory": 1, "Word structure": 1, "Sentence constraints": 3, "Lexical distinctions": 1 } }
];

export const conclusions = [
  { id: "tradeoff", text: "Languages distribute distinctions and structural work differently; a gap in one form can be addressed by another strategy." },
  { id: "advanced", text: "The language with more inflection is inherently more advanced." },
  { id: "simple", text: "A language with fewer grammatical categories has no grammar." }
];
