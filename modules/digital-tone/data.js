export const messages = ["Sure", "Okay", "Thanks", "Can we talk"];

export const comparisons = [
  {
    label: "Close friend · direct text",
    settings: { message: "Sure", punctuation: "period", cue: "none", relationship: "friend", channel: "text" }
  },
  {
    label: "Instructor · course email",
    settings: { message: "Sure", punctuation: "period", cue: "none", relationship: "instructor", channel: "email" }
  }
];

export const studyOptions = [
  { id: "anecdote", title: "One surprising exchange", text: "Analyze a single message that a friend interpreted as rude." },
  { id: "controlled", title: "Controlled context comparison", text: "Show the same messages in varied contexts to diverse participants and compare patterned judgments." },
  { id: "poll", title: "Open social-media poll", text: "Ask followers whether a period is always rude, without controlling who responds." },
  { id: "count", title: "Punctuation count", text: "Count periods in a corpus without measuring readers’ interpretations or social context." }
];

export const reasoningOptions = {
  observation: [
    "Readers’ judgments changed across controlled context conditions.",
    "One reader disliked one message.",
    "Periods always communicate anger."
  ],
  limit: [
    "The model and task simplify communities, relationships, and platform norms.",
    "There are no meaningful limits.",
    "Every reader interprets cues identically."
  ],
  conclusion: [
    "Digital cues contribute to interpretation, but their effects depend on context and community norms.",
    "A period has one fixed meaning in every digital message.",
    "Punctuation never affects digital tone."
  ]
};
