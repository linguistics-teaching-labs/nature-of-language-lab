export function featureCounts(system) {
  return Object.values(system.features).reduce((counts, [status]) => {
    counts[status] = (counts[status] ?? 0) + 1;
    return counts;
  }, { clear: 0, limited: 0, "not-demonstrated": 0 });
}

export function compareSystems(first, second) {
  return Object.keys(first.features).map(id => ({
    id,
    first: first.features[id][0],
    second: second.features[id][0],
    same: first.features[id][0] === second.features[id][0]
  }));
}

export function evidencePlanCorrect(selected, items) {
  const required = items.filter(item => item.required).map(item => item.id);
  return required.every(id => selected.includes(id)) && items.filter(item => !item.required).every(item => !selected.includes(item.id));
}

export function conclusionCorrect(id) {
  return id === "calibrated";
}
