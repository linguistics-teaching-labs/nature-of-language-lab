export function evaluateTest(selections, answers) {
  const fields = Object.keys(answers);
  const correctFields = fields.filter(field => selections[field] === answers[field]);
  return { correct: correctFields.length === fields.length, correctFields };
}

export function evaluateEvidence(selectedIds, evidence) {
  const required = evidence.filter(item => item.required).map(item => item.id);
  const selectedRequired = required.filter(id => selectedIds.includes(id));
  const selectedInsufficient = evidence.filter(item => !item.required && selectedIds.includes(item.id)).map(item => item.id);
  return { correct: selectedRequired.length === required.length && selectedInsufficient.length === 0, selectedRequired, selectedInsufficient };
}

export function stressScore(selectedIds, alternatives, initial = 90) {
  const reduction = alternatives.filter(item => selectedIds.includes(item.id)).reduce((sum, item) => sum + item.impact, 0);
  return Math.max(10, initial - reduction);
}

export function evaluateConclusion(selectedId, correctId) {
  return selectedId === correctId;
}
