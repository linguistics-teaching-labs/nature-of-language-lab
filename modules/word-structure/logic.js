const frontVowels = new Set(["e", "i", "ö", "ü"]);
const allVowels = new Set(["a", "e", "ı", "i", "o", "ö", "u", "ü"]);

export function lastVowel(word) {
  return [...word.toLocaleLowerCase("tr")].reverse().find(letter => allVowels.has(letter)) ?? "";
}

export function turkishPluralSuffix(word) {
  return frontVowels.has(lastVowel(word)) ? "ler" : "lar";
}

export function makeTurkishPlural(word) {
  return `${word}${turkishPluralSuffix(word)}`;
}

export function ruleChoiceCorrect(selected) {
  return selected === "harmony";
}

export function pluralPredictionCorrect(selected, challenge) {
  return selected === challenge.answer && makeTurkishPlural(challenge.root) === challenge.answer;
}

export function wugPredictionCorrect(selected, item) {
  return selected === item.answer;
}

export function morphologyConclusionCorrect(selected) {
  return selected === "rule";
}
