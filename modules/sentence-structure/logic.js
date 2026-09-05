export function ambiguityReadingCorrect(selected, item) {
  return selected === item.answer;
}

export function constituencyTestCorrect(selected, item) {
  return selected === item.answer;
}

export function judgmentCorrect(selected, item) {
  return selected === item.answer;
}

export function syntaxConclusionCorrect(selected) {
  return selected === "structure";
}
