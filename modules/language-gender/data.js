export const features = [
  { id: "like", label: "Discourse-marker like", utterance: "It was, like, completely unexpected.", base: { Stance: 24, Approximation: 28, Quotation: 10, Solidarity: 18, "Floor management": 20 } },
  { id: "dude", label: "Address term dude", utterance: "Dude, you found it!", base: { Stance: 18, Approximation: 4, Quotation: 4, Solidarity: 52, "Floor management": 22 } },
  { id: "uptalk", label: "Rising intonation", utterance: "I finished the first section… ↗", base: { Stance: 20, Approximation: 6, Quotation: 5, Solidarity: 24, "Floor management": 45 } },
  { id: "creaky", label: "Creaky voice", utterance: "That was the final result.", base: { Stance: 40, Approximation: 5, Quotation: 5, Solidarity: 18, "Floor management": 32 } }
];

export const contexts = [
  { id: "story", label: "Telling a story", effects: { Quotation: 18, Stance: 7 } },
  { id: "planning", label: "Collaborative planning", effects: { Solidarity: 15, "Floor management": 12 } },
  { id: "disagreement", label: "Managing disagreement", effects: { Stance: 17, Solidarity: 6 } },
  { id: "presentation", label: "Formal presentation", effects: { "Floor management": 14, Stance: 8, Solidarity: -8 } }
];

export const relationships = [
  { id: "peer", label: "Close peer", effects: { Solidarity: 12 } },
  { id: "classmate", label: "Unfamiliar classmate", effects: { Stance: 6, "Floor management": 5 } },
  { id: "instructor", label: "Instructor", effects: { Stance: 10, Solidarity: -5, "Floor management": 6 } }
];

export const ideologyItems = [
  { id: "frequency", ideology: false, text: "Estimate how often a feature occurs across comparable contexts and speaker groups." },
  { id: "women", ideology: true, text: "Assume a feature is weak or uncertain because listeners associate it with young women." },
  { id: "function", ideology: false, text: "Analyze what interactional work the feature performs in each context." },
  { id: "binary", ideology: true, text: "Treat women and men as internally uniform groups with opposite speech styles." },
  { id: "listener", ideology: false, text: "Test whether listener expectations change ratings of the same speech." }
];

export const studyDesigns = [
  { id: "randomized", title: "Randomized listener experiment", text: "Hold the recording constant, randomize gender cues or labels, and compare ratings across diverse listeners." },
  { id: "comments", title: "Comment-section sample", text: "Collect critical comments about several speakers without a comparison condition." },
  { id: "count", title: "Unmatched frequency count", text: "Count the feature in different speaker groups without matching contexts or topics." }
];

export const conclusions = [
  { id: "context", text: "A feature can perform multiple functions, while gender ideologies shape which functions listeners notice and how they evaluate speakers." },
  { id: "determines", text: "Gender determines a stable and opposite speech style for every woman and man." },
  { id: "irrelevant", text: "Because stereotypes are unreliable, gender and listener expectations are irrelevant to language variation." }
];
