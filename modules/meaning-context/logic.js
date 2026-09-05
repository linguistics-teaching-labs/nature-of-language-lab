export function relationCorrect(selected, item) {
  return selected === item.answer;
}

export function diagnosticCorrect(selected, item) {
  return selected === item.answer;
}

export function contextInterpretationCorrect(selected, item) {
  return selected === item.answer;
}

export function meaningConclusionCorrect(selected) {
  return selected === "layers";
}
