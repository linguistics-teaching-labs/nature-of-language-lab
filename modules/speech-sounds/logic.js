export function featuresMatch(selected, sound) {
  return ["voicing", "place", "manner"].every(feature => selected[feature] === sound.features[feature]);
}

export function contrastClassificationCorrect(selected, dataset) {
  return selected === dataset.answer;
}

export function obeysSingleOnset(word) {
  return !/^[^aeiouıöü]{2}/i.test(word);
}

export function predictionCorrect(selected, dataset) {
  const candidate = dataset.candidates.find(item => item.id === selected);
  return Boolean(candidate?.allowed) && obeysSingleOnset(candidate.text);
}

export function soundConclusionCorrect(selected) {
  return selected === "system";
}
