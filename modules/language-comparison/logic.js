export function classifyLevel(selected, phenomenon) {
  return selected === phenomenon.level;
}

export function strategyCorrect(selected) {
  return selected === "phrase";
}

export function weightedComplexity(profile, weightSet) {
  const entries = Object.entries(profile.scores);
  const weighted = entries.reduce((sum, [key, value]) => sum + value * weightSet.weights[key], 0);
  const possible = entries.reduce((sum, [key]) => sum + 5 * weightSet.weights[key], 0);
  return Math.round((weighted / possible) * 100);
}

export function conclusionCorrect(id) {
  return id === "tradeoff";
}
