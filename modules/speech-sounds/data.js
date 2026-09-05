export const sounds = [
  {
    id: "p",
    symbol: "p",
    example: "spin [spɪn]",
    clue: "The lips close completely; air is released without vocal-fold vibration.",
    features: { voicing: "voiceless", place: "bilabial", manner: "stop" }
  },
  {
    id: "m",
    symbol: "m",
    example: "map [mæp]",
    clue: "The lips close while vibrating air flows through the nose.",
    features: { voicing: "voiced", place: "bilabial", manner: "nasal" }
  },
  {
    id: "s",
    symbol: "s",
    example: "sip [sɪp]",
    clue: "The tongue forms a narrow channel near the alveolar ridge, producing friction without voicing.",
    features: { voicing: "voiceless", place: "alveolar", manner: "fricative" }
  },
  {
    id: "k",
    symbol: "k",
    example: "skill [skɪl]",
    clue: "The tongue body makes a complete closure at the soft palate without voicing.",
    features: { voicing: "voiceless", place: "velar", manner: "stop" }
  }
];

export const featureOptions = {
  voicing: ["voiced", "voiceless"],
  place: ["bilabial", "alveolar", "velar"],
  manner: ["stop", "nasal", "fricative"]
};

export const contrastSets = [
  {
    id: "english-pb",
    label: "English [p] and [b]",
    observations: ["[pɪn] ‘pin’ / [bɪn] ‘bin’", "[kæp] ‘cap’ / [kæb] ‘cab’"],
    answer: "contrast",
    explanation: "Changing [p] to [b] can change word identity in the same environment, so the sounds contrast in English."
  },
  {
    id: "english-aspiration",
    label: "English [pʰ] and [p]",
    observations: ["[pʰɪn] ‘pin’", "[spɪn] ‘spin’"],
    answer: "predictable",
    explanation: "In this simplified dataset, aspiration follows a position rule: [pʰ] begins a stressed syllable, while [p] follows [s]."
  },
  {
    id: "spanish-r",
    label: "Spanish [ɾ] and [r]",
    observations: ["[ˈpeɾo] ‘but’", "[ˈpero] ‘dog’"],
    answer: "contrast",
    explanation: "The tap and trill distinguish words between vowels in Spanish, so they contrast in this environment."
  }
];

export const phonotacticData = {
  permitted: ["mip", "lat", "nok", "sav"],
  excluded: ["lmip", "tnak", "msav"],
  candidates: [
    { id: "nif", text: "nif", allowed: true },
    { id: "bnif", text: "bnif", allowed: false },
    { id: "lkop", text: "lkop", allowed: false }
  ],
  rule: "Words in this teaching language begin with one consonant, not a two-consonant cluster."
};

export const conclusions = [
  { id: "inventory", text: "A language with more consonants is necessarily more advanced." },
  { id: "system", text: "Languages organize possible speech sounds into different contrast and sequencing systems." },
  { id: "spelling", text: "A spelling difference proves that speakers pronounce different sounds." }
];
