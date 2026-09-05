function clamp(value) { return Math.max(2, value); }
export function functionProfile(feature, context, relationship) {
  const scores = { ...feature.base };
  for (const effects of [context.effects, relationship.effects]) {
    for (const [key, value] of Object.entries(effects)) scores[key] = clamp((scores[key] ?? 0) + value);
  }
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const entries = Object.entries(scores).map(([key, value]) => [key, Math.round((value / total) * 100)]);
  entries[entries.length - 1][1] += 100 - entries.reduce((sum, [, value]) => sum + value, 0);
  return Object.fromEntries(entries);
}
export function ideologySetCorrect(selected, items) { return items.every(item => item.ideology === selected.includes(item.id)); }
export function designCorrect(id) { return id === "randomized"; }
export function conclusionCorrect(id) { return id === "context"; }
