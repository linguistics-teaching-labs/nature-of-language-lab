export const sampleText = "I know students don't write enough, though they read through the night.";

export const reforms = [
  { id: "silent", title: "Reduce selected silent letters", text: "know → no; night → nite; write → rite", replacements: { know: "no", night: "nite", write: "rite" }, effects: { Learnability: 14, Readability: -12, "Dialect fairness": -4, "Morphology/history": -7, "Transition ease": -14 } },
  { id: "ough", title: "Regularize selected -ough spellings", text: "enough → enuf; though → tho; through → thru", replacements: { enough: "enuf", though: "tho", through: "thru" }, effects: { Learnability: 18, Readability: -16, "Dialect fairness": -12, "Morphology/history": -6, "Transition ease": -18 } },
  { id: "apostrophe", title: "Remove apostrophes", text: "don't → dont", replacements: { "don't": "dont" }, effects: { Learnability: 5, Readability: -7, "Dialect fairness": 0, "Morphology/history": -13, "Transition ease": -6 } }
];

export const baseScores = { Learnability: 46, Readability: 94, "Dialect fairness": 70, "Morphology/history": 88, "Transition ease": 96 };

export const dialectCases = [
  { id: "cot", label: "cot–caught merger", description: "Many speakers pronounce cot and caught alike; many others maintain a vowel contrast.", correct: "contrast" },
  { id: "rhotic", label: "Rhoticity", description: "Some varieties pronounce /r/ after vowels in car; others generally do not.", correct: "coverage" },
  { id: "pin", label: "pin–pen merger", description: "For some speakers, pin and pen merge before nasal consonants; for others they remain distinct.", correct: "contrast" }
];

export const fairnessOptions = [
  { id: "one", text: "Choose one prestige accent and treat every difference from it as an error." },
  { id: "contrast", text: "Check whether a proposed spelling collapses a contrast maintained by other varieties." },
  { id: "coverage", text: "Test whether the sound-to-spelling rule works across rhotic and non-rhotic varieties." }
];

export const policyEvidence = [
  { id: "dialects", required: true, text: "Test the proposal across multiple dialects and reading communities." },
  { id: "readers", required: true, text: "Measure learning and reading outcomes for novice and experienced readers." },
  { id: "morphology", required: true, text: "Track effects on meaningful word families and grammatical distinctions." },
  { id: "cost", required: true, text: "Estimate transition, accessibility, publishing, and archival costs." },
  { id: "weird", required: false, text: "List spellings that look strange and assume reform must follow." }
];

export const conclusions = [
  { id: "pilot", text: "Pilot a defined proposal, specify the target population, and compare learning benefits with dialect, reading, and transition costs." },
  { id: "replace", text: "Replace English spelling immediately because irregularity proves the current system has no value." },
  { id: "never", text: "Reject every reform because familiar readers may initially dislike change." }
];
