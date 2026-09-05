import { conclusions, levels, phenomena, profiles, strategies, weightSets } from "./data.js";
import { classifyLevel, conclusionCorrect, strategyCorrect, weightedComplexity } from "./logic.js";
import { $, optionCards, radioValue, scoreRows, setFeedback } from "../shared/ui.js";

let active = phenomena[0];

function renderPhenomenon() {
  active = phenomena.find(item => item.id === $("#phenomenon-picker").value);
  $("#phenomenon-prompt").textContent = active.prompt;
  $("#meaning-target").textContent = active.meaning;
  $("#source-strategy").textContent = active.source;
  $("#english-strategy").textContent = active.english;
  $("#level-options").innerHTML = optionCards(levels, { name: "level" });
  $("#level-feedback").hidden = true;
  $("#strategy-feedback").hidden = true;
}

function renderProfiles() {
  const weights = weightSets.find(item => item.id === $("#weight-picker").value);
  $("#profile-results").innerHTML = profiles.map(profile => `<article class="tool-panel"><h3>${profile.label} · index ${weightedComplexity(profile, weights)}</h3><div class="score-list">${scoreRows(Object.fromEntries(Object.entries(profile.scores).map(([key, value]) => [key, value * 20])))}</div></article>`).join("");
  $("#weight-note").textContent = weights.id === "equal" ? "With equal weights, the profiles may look similar overall while differing sharply by level." : "Changing the definition changes the ranking. The index reflects the chosen weights, not an inherent property of a language.";
}

$("#phenomenon-picker").innerHTML = phenomena.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#weight-picker").innerHTML = weightSets.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#strategy-options").innerHTML = optionCards(strategies, { name: "strategy" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "conclusion" });
$("#phenomenon-picker").addEventListener("change", renderPhenomenon);
$("#weight-picker").addEventListener("change", renderProfiles);
$("#check-level").addEventListener("click", () => {
  const correct = classifyLevel(radioValue("level"), active);
  setFeedback("#level-feedback", correct, correct ? "Level identified" : "Look at where the contrast is encoded", correct ? `This example locates the contrast primarily in ${active.level}.` : "Ask whether the contrast lies in sounds, inside words, sentence organization, or a dedicated word choice.");
});
$("#check-strategy").addEventListener("click", () => {
  const correct = strategyCorrect(radioValue("strategy"));
  setFeedback("#strategy-feedback", correct, correct ? "Meaning preserved by another route" : "A formal gap is not a conceptual impossibility", correct ? active.english : "Languages can use morphology, syntax, lexical items, or paraphrase to package a distinction differently.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = conclusionCorrect(radioValue("conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Comparison without ranking" : "The conclusion confuses difference with deficiency", correct ? "This conclusion separates how meaning is packaged from whether it can be expressed." : "More marking at one linguistic level can coexist with less marking or different constraints elsewhere.");
});
renderPhenomenon(); renderProfiles();
