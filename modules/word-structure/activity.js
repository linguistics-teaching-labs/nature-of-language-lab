import { conclusions, pluralChallenges, ruleOptions, turkishForms, wugCases } from "./data.js";
import { morphologyConclusionCorrect, pluralPredictionCorrect, ruleChoiceCorrect, turkishPluralSuffix, wugPredictionCorrect } from "./logic.js";
import { $, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let activeChallenge = pluralChallenges[0];
let activeWug = wugCases[0];

function renderChallenge() {
  activeChallenge = pluralChallenges.find(item => item.id === $("#word-picker").value);
  $("#root-form").textContent = activeChallenge.root;
  $("#root-gloss").textContent = activeChallenge.gloss;
  $("#suffix-options").innerHTML = activeChallenge.options.map(option => `<label class="option-card"><input type="radio" name="plural-form" value="${option}"><span><code>${option}</code></span></label>`).join("");
  $("#prediction-feedback").hidden = true;
}

function renderWug() {
  activeWug = wugCases.find(item => item.id === $("#wug-picker").value);
  $("#wug-prompt").textContent = activeWug.prompt;
  $("#wug-options").innerHTML = activeWug.options.map(option => `<label class="option-card"><input type="radio" name="wug-form" value="${option}"><span><code>${option}</code></span></label>`).join("");
  $("#wug-feedback").hidden = true;
}

$("#morphology-table").innerHTML = turkishForms.map(item => `<tr><td><code>${item.singular}</code></td><td>${item.gloss}</td><td><code>${item.plural}</code></td><td><code>${item.analysis}</code></td></tr>`).join("");
$("#rule-options").innerHTML = optionCards(ruleOptions, { name: "plural-rule" });
$("#word-picker").innerHTML = pluralChallenges.map(item => `<option value="${item.id}">${item.root} ‘${item.gloss}’</option>`).join("");
$("#wug-picker").innerHTML = wugCases.map(item => `<option value="${item.id}">${item.stem}</option>`).join("");
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "morphology-conclusion" });

$("#word-picker").addEventListener("change", renderChallenge);
$("#wug-picker").addEventListener("change", renderWug);
$("#check-rule").addEventListener("click", () => {
  const correct = ruleChoiceCorrect(radioValue("plural-rule"));
  setFeedback("#rule-feedback", correct, correct ? "Rule discovered" : "Track the last vowel", correct ? "The plural suffix harmonizes with the final vowel of the root in this regular teaching dataset." : "Compare ev/göz with kitap/çocuk. Root length and the first vowel do not predict the suffix.");
});
$("#check-prediction").addEventListener("click", () => {
  const selected = radioValue("plural-form");
  const correct = pluralPredictionCorrect(selected, activeChallenge);
  setFeedback("#prediction-feedback", correct, correct ? "New form predicted" : "Apply vowel harmony again", correct ? `${activeChallenge.root} takes -${turkishPluralSuffix(activeChallenge.root)} in this dataset: ${activeChallenge.answer}.` : `Find the final vowel in ${activeChallenge.root}, classify it as front or back, then select the matching suffix.`);
});
$("#check-wug").addEventListener("click", () => {
  const correct = wugPredictionCorrect(radioValue("wug-form"), activeWug);
  setFeedback("#wug-feedback", correct, correct ? "Productive pattern applied" : "Choose the requested grammatical form", correct ? `You extended an English pattern to the novel stem “${activeWug.stem}.” The item need not be memorized first.` : "Separate the stem from the grammatical task: plural or past tense. Derivational forms do not answer that prompt.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = morphologyConclusionCorrect(radioValue("morphology-conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Evidence for productivity" : "The conclusion is not supported", correct ? "The Turkish and English tasks show pattern extension. They do not imply that one morphological system is better." : "Novel-form judgments provide evidence for productive knowledge beyond a list of memorized words.");
});

renderChallenge();
renderWug();
