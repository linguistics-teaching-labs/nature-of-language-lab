export const errorCases = [
  {
    id: "goed",
    label: "Case 1 · goed",
    context: "After using walked, jumped, and played correctly, a child says:",
    learner: "Yesterday Maya goed home.",
    target: "Yesterday Maya went home.",
    answer: "productive-rule",
    explanation: "The unattested form goed combines a familiar stem with the regular past-tense pattern. It is evidence of productive generalization, not simple copying."
  },
  {
    id: "mouses",
    label: "Case 2 · mouses",
    context: "A child who regularly produces cats and dogs says:",
    learner: "I saw two mouses.",
    target: "I saw two mice.",
    answer: "productive-rule",
    explanation: "Mouses applies the productive plural pattern to an irregular noun. The form is non-adult, but its internal structure is systematic."
  },
  {
    id: "bare-verb",
    label: "Case 3 · bare verbs",
    context: "Across ten comparable descriptions, a learner omits third-person -s eight times:",
    learner: "She walk to school. He play outside.",
    target: "She walks to school. He plays outside.",
    answer: "developing-pattern",
    explanation: "Repeated omission in the same grammatical environment supports a developing pattern. It should not be treated as a random lapse from one utterance."
  },
  {
    id: "single-slip",
    label: "Case 4 · one omission",
    context: "A child says two dogs correctly in nine observations, then produces this once while interrupted:",
    learner: "Two dog.",
    target: "Two dogs.",
    answer: "insufficient",
    explanation: "One exceptional token against a stable pattern is insufficient to diagnose a grammatical generalization. Attention, planning, or recording context could matter."
  }
];

export const stageItems = [
  { id: "memorized", label: "Uses went in familiar expressions, but shows little evidence of applying -ed to new verbs." },
  { id: "rule", label: "Applies -ed to new verbs and sometimes overregularizes irregulars: goed, comed." },
  { id: "integrated", label: "Keeps productive -ed for regular verbs while retrieving went and came reliably." }
];

export const stageOrder = ["memorized", "rule", "integrated"];

export const hypothesisEvidence = [
  { observation: "The learner produces daxed for the unfamiliar verb dax.", implication: "A form that was not memorized can receive a productive ending." },
  { observation: "Goed appears alongside many correct regular past-tense forms.", implication: "The error shares structure with a broader grammatical pattern." },
  { observation: "Overregularization changes across repeated observations.", implication: "Development is patterned rather than a fixed rate of random mistakes." },
  { observation: "Adult input contains went, not goed.", implication: "Direct imitation alone does not generate the observed form." }
];

export const hypotheses = [
  { id: "copying", title: "Copying only", text: "Learners reproduce stored adult utterances; forms absent from the input should not be generated." },
  { id: "random", title: "Random mistakes", text: "Errors are unsystematic production failures with no stable relationship to grammatical categories." },
  { id: "rule-memory", title: "Productive rule plus stored exceptions", text: "Learners generalize a regular pattern and gradually coordinate it with irregular forms." }
];

export const evidencePlan = [
  { id: "longitudinal", required: true, text: "Collect repeated samples from the same learners so change over time is observable." },
  { id: "contrast", required: true, text: "Compare regular, irregular, and unfamiliar forms in matched contexts." },
  { id: "input", required: true, text: "Document relevant input and elicitation conditions before inferring what was learned." },
  { id: "comparison", required: true, text: "Check whether the pattern recurs across learners while preserving individual variation." },
  { id: "memorable", required: false, text: "Select only the most amusing errors because they make the theory easy to remember." },
  { id: "single", required: false, text: "Infer a learner's grammar from one isolated utterance without a comparison sample." }
];

export const conclusions = [
  { id: "deficit", text: "Non-adult forms show that a learner has no grammar yet." },
  { id: "correction", text: "Once adults correct an error, the learner should immediately adopt the target form." },
  { id: "evidence", text: "Systematic errors can reveal interim generalizations, but the inference requires repeated and contextualized evidence." }
];
