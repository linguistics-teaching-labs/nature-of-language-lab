export const turkishForms = [
  { singular: "ev", gloss: "house", plural: "evler", analysis: "ev + ler" },
  { singular: "göz", gloss: "eye", plural: "gözler", analysis: "göz + ler" },
  { singular: "kitap", gloss: "book", plural: "kitaplar", analysis: "kitap + lar" },
  { singular: "çocuk", gloss: "child", plural: "çocuklar", analysis: "çocuk + lar" }
];

export const ruleOptions = [
  { id: "length", text: "Use <code>-ler</code> after short roots and <code>-lar</code> after long roots." },
  { id: "first", text: "Choose the suffix from the first vowel of the root." },
  { id: "harmony", text: "Use <code>-ler</code> after the last front vowel and <code>-lar</code> after the last back vowel." }
];

export const pluralChallenges = [
  { id: "muzik", root: "müzik", gloss: "music", answer: "müzikler", options: ["müzikler", "müziklar", "müzik"] },
  { id: "robot", root: "robot", gloss: "robot", answer: "robotlar", options: ["robotler", "robotlar", "robot"] },
  { id: "gul", root: "gül", gloss: "rose", answer: "güller", options: ["güllar", "güller", "güler"] },
  { id: "masa", root: "masa", gloss: "table", answer: "masalar", options: ["masaler", "masalar", "maslar"] }
];

export const wugCases = [
  { id: "wug", stem: "wug", prompt: "This is one wug. Now there are two…", answer: "wugs", options: ["wugs", "wug", "wugness"] },
  { id: "niss", stem: "niss", prompt: "This is one niss. Now there are two…", answer: "nisses", options: ["nisss", "nisses", "nissful"] },
  { id: "blick", stem: "blick", prompt: "Today it blicks. Yesterday it…", answer: "blicked", options: ["blicked", "blicken", "blickness"] }
];

export const conclusions = [
  { id: "memory", text: "Speakers can only produce word forms they have previously memorized." },
  { id: "rule", text: "Patterns across known forms can support productive rules that extend to unfamiliar words." },
  { id: "quality", text: "More visible affixes make one language more structured than another." }
];
