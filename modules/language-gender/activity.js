import { conclusions, contexts, features, ideologyItems, relationships, studyDesigns } from "./data.js";
import { conclusionCorrect, designCorrect, functionProfile, ideologySetCorrect } from "./logic.js";
import { $, checkedValues, optionCards, radioValue, scoreRows, setFeedback } from "../shared/ui.js";

function find(items, id) { return items.find(item => item.id === id); }
function renderExplorer() {
  const feature = find(features, $("#feature-picker").value);
  const context = find(contexts, $("#context-picker").value);
  const relationship = find(relationships, $("#relationship-picker").value);
  $("#utterance").textContent = feature.utterance;
  $("#function-profile").innerHTML = scoreRows(functionProfile(feature, context, relationship));
  $("#function-note").textContent = `${context.label} · ${relationship.label}. The profile represents possible interactional work, not a speaker diagnosis.`;
}
function renderComparison() {
  const feature = find(features, $("#compare-feature").value);
  const presets = [
    { label: "Story with a close peer", context: contexts[0], relationship: relationships[0] },
    { label: "Formal presentation to an instructor", context: contexts[3], relationship: relationships[2] }
  ];
  $("#comparison-results").innerHTML = presets.map(preset => `<article class="tool-panel"><h3>${preset.label}</h3><p class="compare-message">${feature.utterance}</p><div class="score-list">${scoreRows(functionProfile(feature, preset.context, preset.relationship))}</div></article>`).join("");
}
const optionMarkup = items => items.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#feature-picker").innerHTML = optionMarkup(features); $("#compare-feature").innerHTML = optionMarkup(features);
$("#context-picker").innerHTML = optionMarkup(contexts); $("#relationship-picker").innerHTML = optionMarkup(relationships);
for (const id of ["feature-picker", "context-picker", "relationship-picker"]) $(`#${id}`).addEventListener("change", renderExplorer);
$("#compare-feature").addEventListener("change", renderComparison);
$("#ideology-options").innerHTML = optionCards(ideologyItems, { name: "ideology", type: "checkbox" });
$("#study-options").innerHTML = optionCards(studyDesigns, { name: "study" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "conclusion" });
$("#check-ideology").addEventListener("click", () => {
  const correct = ideologySetCorrect(checkedValues("#ideology-options"), ideologyItems);
  setFeedback("#ideology-feedback", correct, correct ? "Ideology separated from analysis" : "One item needs reconsideration", correct ? "The selected claims treat stereotypes or binary categories as explanations rather than objects of investigation." : "Empirical frequency, contextual function, and listener response can be tested; a stereotype should not be assumed as the explanation.");
});
$("#check-study").addEventListener("click", () => {
  const correct = designCorrect(radioValue("study"));
  setFeedback("#study-feedback", correct, correct ? "Design isolates listener expectations" : "The design confounds speaker and context", correct ? "Holding the speech constant while randomizing the social cue targets the effect of listener expectations." : "To test perception bias, keep the linguistic signal constant and vary the perceived social information.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = conclusionCorrect(radioValue("conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Form, function, and ideology connected" : "The conclusion returns to a binary", correct ? "This conclusion recognizes multifunctionality and treats gender ideology as part of the interpretive context." : "Rejecting a strict women-men dichotomy does not make identity or social expectations irrelevant.");
});
renderExplorer(); renderComparison();
