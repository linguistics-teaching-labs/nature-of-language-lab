export const cases = [
  {
    id: "color", label: "Color categories",
    finding: "In a speeded color task, speakers with a lexical boundary distinguished some color pairs faster near that boundary.",
    design: "Controlled task with matched visual stimuli",
    warranted: "influence",
    caution: "Task effects do not show that speakers cannot perceive or learn distinctions their language does not name.",
    alternatives: [
      { id: "task", impact: 16, text: "The speeded verbal task may encourage covert naming." },
      { id: "sample", impact: 12, text: "The sampled speakers may differ in education or bilingual experience." },
      { id: "boundary", impact: 14, text: "Stimulus spacing may exaggerate category-boundary effects." }
    ]
  },
  {
    id: "time", label: "Talking about time",
    finding: "Speakers of different languages used different spatial arrangements when asked to order temporal sequences.",
    design: "Cross-linguistic comparison across communities",
    warranted: "association",
    caution: "Language, culture, writing direction, task instructions, and environment may vary together.",
    alternatives: [
      { id: "writing", impact: 19, text: "Writing direction may influence spatial arrangement." },
      { id: "culture", impact: 18, text: "Cultural practices may vary with language." },
      { id: "translation", impact: 13, text: "Translated instructions may not be pragmatically equivalent." }
    ]
  },
  {
    id: "gender", label: "Grammatical gender",
    finding: "Object descriptions differed modestly when a task made grammatical gender salient.",
    design: "Prompting experiment within a constrained task",
    warranted: "influence",
    caution: "A task-specific association does not establish stable beliefs or societal sexism.",
    alternatives: [
      { id: "priming", impact: 20, text: "The task itself may prime grammatical labels." },
      { id: "translation", impact: 15, text: "Translation choices may carry different connotations." },
      { id: "items", impact: 12, text: "A narrow set of objects may drive the pattern." }
    ]
  }
];

export const claimLevels = [
  { id: "none", rank: 0, label: "No relationship", text: "The evidence shows no relationship between linguistic patterns and task behavior." },
  { id: "association", rank: 1, label: "Association", text: "Language patterns and responses differ together in this comparison." },
  { id: "influence", rank: 2, label: "Context-bound influence", text: "Language may guide attention or processing in this task, without fixing what people can think." },
  { id: "determine", rank: 3, label: "Determination", text: "Language fixes or limits the thoughts its speakers can have." }
];

export const evidenceItems = [
  { id: "outcome", required: true, text: "A defined behavioral outcome rather than an impressionistic example" },
  { id: "comparison", required: true, text: "A comparison that targets the relevant linguistic contrast" },
  { id: "alternatives", required: true, text: "Controls or measurements for plausible cultural and task explanations" },
  { id: "translation", required: false, text: "One difficult-to-translate word presented as proof" },
  { id: "movie", required: false, text: "A fictional portrayal of language changing cognition" }
];
