const labels = ["warm", "neutral", "abrupt", "formal"];

function clamp(value) {
  return Math.max(2, value);
}

export function formatMessage({ message, punctuation, cue }) {
  const endings = { none: "", period: ".", exclamation: "!" };
  const cues = { none: "", smile: " 🙂", thumbs: " 👍" };
  return `${message}${endings[punctuation] ?? ""}${cues[cue] ?? ""}`;
}

export function calculateReadings({ message, punctuation, cue, relationship, channel }) {
  const score = { warm: 24, neutral: 32, abrupt: 22, formal: 22 };

  if (punctuation === "period") { score.abrupt += 9; score.formal += 6; score.warm -= 5; }
  if (punctuation === "exclamation") { score.warm += 13; score.abrupt -= 5; score.formal -= 3; }
  if (cue === "smile") { score.warm += 17; score.abrupt -= 9; score.formal -= 3; }
  if (cue === "thumbs") { score.neutral += 7; score.abrupt += 3; score.formal -= 3; }
  if (relationship === "friend") { score.warm += 8; score.formal -= 7; }
  if (relationship === "instructor") { score.formal += 14; score.neutral += 5; score.warm -= 6; }
  if (channel === "group") { score.neutral += 7; score.formal += 3; }
  if (channel === "email") { score.formal += 15; score.abrupt -= 3; }
  if (message === "Can we talk") { score.formal += 5; score.abrupt += 4; score.warm -= 4; }
  if (message === "Thanks") { score.warm += 8; score.abrupt -= 4; }

  const raw = labels.map(label => clamp(score[label]));
  const total = raw.reduce((sum, value) => sum + value, 0);
  const normalized = raw.map(value => Math.round((value / total) * 100));
  normalized[normalized.length - 1] += 100 - normalized.reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(labels.map((label, index) => [label, normalized[index]]));
}

export function strongestReading(scores) {
  return labels.reduce((best, label) => scores[label] > scores[best] ? label : best, labels[0]);
}
