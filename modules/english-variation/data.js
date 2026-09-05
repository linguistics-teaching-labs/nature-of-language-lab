export const ruleCases = [
  {
    id: "habitual", label: "Habitual be", example: "They be studying in the library.", context: "The intended meaning is that studying there happens regularly, not necessarily right now.", correct: "habit",
    options: [
      { id: "habit", text: "Invariant be marks a recurring or habitual situation in this use." },
      { id: "random", text: "The speaker inserts be randomly because the variety has no tense system." },
      { id: "present", text: "The sentence can only mean they are studying at this moment." }
    ]
  },
  {
    id: "negative", label: "Negative concord", example: "She didn't tell nobody nothing.", context: "Multiple negative forms contribute to one semantic negation in a rule-governed construction.", correct: "concord",
    options: [
      { id: "positive", text: "Two grammatical negatives cancel and force a positive meaning." },
      { id: "concord", text: "Negative elements agree with a single semantic negation." },
      { id: "mistake", text: "The number of negatives varies without any grammatical pattern." }
    ]
  },
  {
    id: "copula", label: "Copula absence", example: "The students Ø ready.", context: "In varieties that license this pattern, absence is constrained; it does not occur in every context where standard English has is or are.", correct: "constraint",
    options: [
      { id: "constraint", text: "Copula absence is conditioned by grammatical and discourse environments." },
      { id: "delete", text: "Speakers simply forget forms at unpredictable points." },
      { id: "always", text: "Every form of be must be absent in the variety." }
    ]
  },
  {
    id: "cluster", label: "Consonant-cluster reduction", example: "past week → pas' week", context: "Reduction is more likely in some phonological and grammatical environments than others.", correct: "phonology",
    options: [
      { id: "spelling", text: "Speakers pronounce only the letters they notice." },
      { id: "phonology", text: "A patterned phonological process is sensitive to neighboring sounds and word structure." },
      { id: "lazy", text: "The form measures how carefully or intelligently a person speaks." }
    ]
  }
];

export const classificationCases = [
  { id: "accent", label: "Two speakers differ mainly in systematic pronunciation while sharing the compared grammar and vocabulary.", answer: "accent" },
  { id: "dialect", label: "A community variety has patterned pronunciation, grammar, and vocabulary differences.", answer: "dialect" },
  { id: "slang", label: "A rapidly changing set of informal words is used within particular groups or situations.", answer: "slang" }
];

export const classificationOptions = [
  { id: "accent", text: "Accent: patterned pronunciation features" },
  { id: "dialect", text: "Dialect/variety: patterned differences across multiple linguistic levels" },
  { id: "slang", text: "Slang: socially situated informal vocabulary" }
];

export const ideologyItems = [
  { id: "pattern", ideology: false, text: "The feature occurs more often before consonants than vowels in this sample." },
  { id: "logic", ideology: true, text: "A prestigious variety is more logical because schools teach it." },
  { id: "accentless", ideology: true, text: "People from my region do not have an accent." },
  { id: "audience", ideology: false, text: "Listeners’ familiarity may affect comprehension and evaluation." },
  { id: "intelligence", ideology: true, text: "Using a stigmatized feature reveals lower intelligence." }
];

export const conclusions = [
  { id: "systematic", text: "English varieties are systematic; judgments of correctness and status also reflect institutions, history, and listener expectations." },
  { id: "slang", text: "A variety with informal vocabulary is only slang and therefore lacks grammar." },
  { id: "accentless", text: "Standard English is neutral and accentless, while other varieties add deviations." }
];
