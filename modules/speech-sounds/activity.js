import { conclusions, contrastSets, featureOptions, phonotacticData, sounds } from "./data.js";
import { contrastClassificationCorrect, featuresMatch, predictionCorrect, soundConclusionCorrect } from "./logic.js";
import { $, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let activeSound = sounds[0];
let activeContrast = contrastSets[0];

function optionList(values) {
  return `<option value="">Choose…</option>${values.map(value => `<option value="${value}">${value[0].toUpperCase()}${value.slice(1)}</option>`).join("")}`;
}

function renderSound() {
  activeSound = sounds.find(sound => sound.id === $("#sound-picker").value);
  $("#ipa-symbol").textContent = activeSound.symbol;
  $("#sound-example").textContent = activeSound.example;
  $("#sound-clue").textContent = activeSound.clue;
  for (const feature of Object.keys(featureOptions)) $("#" + feature).value = "";
  $("#feature-feedback").hidden = true;
}

function renderContrast() {
  activeContrast = contrastSets.find(dataset => dataset.id === $("#contrast-picker").value);
  $("#contrast-observations").innerHTML = activeContrast.observations.map(item => `<li><code>${item}</code></li>`).join("");
  document.querySelectorAll('input[name="contrast-type"]').forEach(input => { input.checked = false; });
  $("#contrast-feedback").hidden = true;
}

$("#sound-picker").innerHTML = sounds.map(sound => `<option value="${sound.id}">[${sound.symbol}] · ${sound.example}</option>`).join("");
for (const [feature, values] of Object.entries(featureOptions)) $("#" + feature).innerHTML = optionList(values);
$("#contrast-picker").innerHTML = contrastSets.map(dataset => `<option value="${dataset.id}">${dataset.label}</option>`).join("");
$("#prediction-options").innerHTML = optionCards(phonotacticData.candidates.map(item => ({ id: item.id, text: `<code>${item.text}</code>` })), { name: "prediction" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "sound-conclusion" });
$("#permitted-forms").textContent = phonotacticData.permitted.join(", ");
$("#excluded-forms").textContent = phonotacticData.excluded.join(", ");

$("#sound-picker").addEventListener("change", renderSound);
$("#contrast-picker").addEventListener("change", renderContrast);
$("#check-features").addEventListener("click", () => {
  const selected = Object.fromEntries(Object.keys(featureOptions).map(feature => [feature, $("#" + feature).value]));
  const correct = featuresMatch(selected, activeSound);
  setFeedback("#feature-feedback", correct, correct ? "Feature bundle identified" : "Revise the feature bundle", correct ? `[${activeSound.symbol}] is ${activeSound.features.voicing}, ${activeSound.features.place}, and a ${activeSound.features.manner}.` : "Use the airflow, articulator, and vibration clues separately: manner, place, then voicing.");
});
$("#check-contrast").addEventListener("click", () => {
  const correct = contrastClassificationCorrect(radioValue("contrast-type"), activeContrast);
  setFeedback("#contrast-feedback", correct, correct ? "Pattern classified" : "Look for a controlled comparison", correct ? activeContrast.explanation : "A minimal pair supports contrast. A predictable distribution supports a context-conditioned variant in this simplified dataset.");
});
$("#check-prediction").addEventListener("click", () => {
  const correct = predictionCorrect(radioValue("prediction"), phonotacticData);
  setFeedback("#prediction-feedback", correct, correct ? "Prediction follows the pattern" : "Test the initial sequence", correct ? `${phonotacticData.rule} “nif” follows that pattern.` : `${phonotacticData.rule} Compare the first two sounds of each candidate.`);
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = soundConclusionCorrect(radioValue("sound-conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "System, not hierarchy" : "The conclusion overreaches", correct ? "Inventories and sequencing rules differ, but those differences do not rank languages or their speakers." : "Sound counts and spelling conventions do not measure a language’s advancement, logic, or expressive power.");
});

renderSound();
renderContrast();
