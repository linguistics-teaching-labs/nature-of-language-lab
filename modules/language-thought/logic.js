export function claimIsCalibrated(selected, warranted) {
  return selected === warranted;
}

export function confidenceScore(selectedIds, alternatives, initial = 90) {
  return Math.max(10, initial - alternatives.filter(item => selectedIds.includes(item.id)).reduce((sum, item) => sum + item.impact, 0));
}

export function evidenceSetCorrect(selectedIds, items) {
  return items.every(item => item.required === selectedIds.includes(item.id));
}

export function overreach(selected, warranted, levels) {
  const chosen = levels.find(level => level.id === selected)?.rank ?? -1;
  const supported = levels.find(level => level.id === warranted)?.rank ?? -1;
  return chosen > supported;
}
