export const claims = [
  {
    id: "thought",
    title: "Language and thought",
    claim: "Grammatical gender causes speakers to think of objects as masculine or feminine.",
    anatomy: { scope: "Speakers of languages with grammatical gender", outcome: "Conceptual judgments about objects", leap: "A causal effect attributed to grammar" },
    options: {
      measure: ["Ratings on a defined object-description task", "Number of grammatical genders", "A memorable quotation"],
      comparison: ["Matched speakers or tasks that differ in the relevant grammatical cue", "Two unrelated dictionary entries", "One speaker before lunch"],
      coverage: ["Multiple items, speakers, and relevant language communities", "One object named by one person", "Only examples supporting the claim"]
    },
    answers: { measure: "0", comparison: "0", coverage: "0" },
    evidence: [
      { id: "task", required: true, text: "A preregistered task measuring the specified judgments" },
      { id: "comparison", required: true, text: "A comparison that isolates the relevant linguistic difference" },
      { id: "coverage", required: true, text: "Participants and items broad enough for the stated scope" },
      { id: "story", required: false, text: "One vivid anecdote from a bilingual speaker" },
      { id: "grammar", required: false, text: "A grammar book confirming that gender categories exist" }
    ],
    alternatives: [
      { id: "culture", impact: 22, text: "Shared cultural associations could influence both language and judgments." },
      { id: "translation", impact: 16, text: "Translation or task wording could make one response easier." },
      { id: "sampling", impact: 18, text: "A narrow sample may not represent the communities named in the claim." }
    ],
    conclusions: [
      { id: "qualified", text: "In this task and sample, grammatical cues were associated with patterned judgments; broader causal claims require additional controls and replication." },
      { id: "universal", text: "Grammar determines how every speaker thinks." },
      { id: "none", text: "Language can never influence thought." }
    ],
    correctConclusion: "qualified"
  },
  {
    id: "variation",
    title: "Language variation",
    claim: "Using a nonstandard dialect makes academic communication less precise.",
    anatomy: { scope: "Students using a named nonstandard variety", outcome: "Precision in academic communication", leap: "A language variety is treated as the cause" },
    options: {
      measure: ["Blind ratings using an explicit precision rubric", "Whether a form is standard", "Teacher preference alone"],
      comparison: ["Matched content expressed in different varieties", "Different topics by different students", "A style guide and a dictionary"],
      coverage: ["Multiple genres, raters, speakers, and dialect features", "One marked sentence", "Only responses from one advocate"]
    },
    answers: { measure: "0", comparison: "0", coverage: "0" },
    evidence: [
      { id: "rubric", required: true, text: "A reliable rubric separating precision from standardness" },
      { id: "matched", required: true, text: "Matched messages so content is held constant" },
      { id: "raters", required: true, text: "Multiple trained raters and representative language samples" },
      { id: "reaction", required: false, text: "A listener says the dialect sounds uneducated" },
      { id: "rulebook", required: false, text: "A handbook labels one form nonstandard" }
    ],
    alternatives: [
      { id: "bias", impact: 25, text: "Raters may confuse familiarity or prestige with precision." },
      { id: "genre", impact: 15, text: "Genre expectations may favor one register independently of clarity." },
      { id: "content", impact: 18, text: "Unequal content knowledge may explain performance differences." }
    ],
    conclusions: [
      { id: "qualified", text: "The study can compare judged precision under its rubric, but must separate structural clarity from social evaluation of the variety." },
      { id: "universal", text: "Standard English is inherently more logical than every dialect." },
      { id: "none", text: "Audience expectations never matter in academic writing." }
    ],
    correctConclusion: "qualified"
  },
  {
    id: "change",
    title: "Language change",
    claim: "Digital communication is making English vocabulary smaller.",
    anatomy: { scope: "English users engaged in digital communication", outcome: "Vocabulary size or diversity", leap: "Digital media are named as the cause" },
    options: {
      measure: ["A defined vocabulary-diversity measure applied consistently", "Screen-time totals", "Opinions about abbreviations"],
      comparison: ["Comparable language samples across media or time", "A novel and a text message", "Two words from different decades"],
      coverage: ["Balanced genres, periods, speaker groups, and sample lengths", "One platform for one week", "Only unusually short posts"]
    },
    answers: { measure: "0", comparison: "0", coverage: "0" },
    evidence: [
      { id: "measure", required: true, text: "A transparent vocabulary measure robust to sample length" },
      { id: "corpus", required: true, text: "Comparable corpora across the relevant conditions" },
      { id: "metadata", required: true, text: "Genre and speaker information needed to test alternatives" },
      { id: "complaint", required: false, text: "A newspaper column complaining about slang" },
      { id: "list", required: false, text: "A list of recent abbreviations without frequency data" }
    ],
    alternatives: [
      { id: "length", impact: 24, text: "Short messages mechanically restrict how many word types appear." },
      { id: "genre", impact: 18, text: "Genre, not the medium itself, may drive vocabulary choices." },
      { id: "population", impact: 15, text: "The compared samples may represent different speaker populations." }
    ],
    conclusions: [
      { id: "qualified", text: "Vocabulary patterns may differ across the sampled media, but causal decline requires comparable data and evidence against genre and sampling explanations." },
      { id: "universal", text: "Digital media are destroying English vocabulary." },
      { id: "none", text: "Communication technology cannot affect language use." }
    ],
    correctConclusion: "qualified"
  }
];
