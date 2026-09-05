export function errorInterpretationCorrect(selected, item) {
  return selected === item.answer;
}

export function stageOrderCorrect(selected, expected) {
  return selected.length === expected.length
    && selected.every((value, index) => value === expected[index]);
}

export function hypothesisCorrect(selected) {
  return selected === "rule-memory";
}

export function evidencePlanCorrect(selected, items) {
  const required = items.filter(item => item.required).map(item => item.id).sort();
  return [...selected].sort().join("|") === required.join("|");
}

export function learningConclusionCorrect(selected) {
  return selected === "evidence";
}
