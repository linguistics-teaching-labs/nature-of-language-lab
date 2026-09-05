function clamp(value) { return Math.max(0, Math.min(100, value)); }

export function transformText(text, selectedIds, reforms) {
  const selected = reforms.filter(reform => selectedIds.includes(reform.id));
  return text.replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, word => {
    const lower = word.toLowerCase();
    const replacement = selected.reduce((current, reform) => reform.replacements[current] ?? current, lower);
    return word[0] === word[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;
  });
}

export function reformScores(selectedIds, reforms, baseScores) {
  const scores = { ...baseScores };
  for (const reform of reforms.filter(item => selectedIds.includes(item.id))) {
    for (const [metric, effect] of Object.entries(reform.effects)) scores[metric] = clamp(scores[metric] + effect);
  }
  return scores;
}

export function changedTokens(original, transformed) {
  const tokenize = text => text.match(/[A-Za-z]+(?:'[A-Za-z]+)?|[^A-Za-z\s]+/g) ?? [];
  const before = tokenize(original); const after = tokenize(transformed);
  return after.map((token, index) => ({ token, changed: token !== before[index] }));
}

export function policyEvidenceCorrect(selected, items) { return items.every(item => item.required === selected.includes(item.id)); }
export function conclusionCorrect(id) { return id === "pilot"; }
