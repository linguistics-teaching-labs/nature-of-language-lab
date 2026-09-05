import { baseScores, conclusions, dialectCases, fairnessOptions, policyEvidence, reforms, sampleText } from "./data.js";
import { changedTokens, conclusionCorrect, policyEvidenceCorrect, reformScores, transformText } from "./logic.js";
import { $, checkedValues, optionCards, radioValue, scoreRows, setFeedback } from "../shared/ui.js";

function selectedReforms() { return checkedValues("#reform-options"); }
function renderSandbox() {
  const selected = selectedReforms();
  const transformed = transformText(sampleText, selected, reforms);
  $("#original-line").innerHTML = changedTokens(sampleText, sampleText).map(item => `<span class="word-token">${item.token}</span>`).join("");
  $("#reformed-line").innerHTML = changedTokens(sampleText, transformed).map(item => `<span class="word-token${item.changed ? " changed" : ""}">${item.token}</span>`).join("");
  $("#reform-scores").innerHTML = scoreRows(reformScores(selected, reforms, baseScores));
  $("#reform-count").textContent = `${selected.length} proposal${selected.length === 1 ? "" : "s"} active`;
}

let dialectCase = dialectCases[0];
function renderDialect() {
  dialectCase = dialectCases.find(item => item.id === $("#dialect-picker").value);
  $("#dialect-description").textContent = dialectCase.description;
  $("#fairness-options").innerHTML = optionCards(fairnessOptions, { name: "fairness" });
  $("#fairness-feedback").hidden = true;
}

$("#reform-options").innerHTML = optionCards(reforms, { name: "reform", type: "checkbox" });
$("#reform-options").addEventListener("change", renderSandbox);
$("#dialect-picker").innerHTML = dialectCases.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#dialect-picker").addEventListener("change", renderDialect);
$("#policy-options").innerHTML = optionCards(policyEvidence, { name: "policy", type: "checkbox" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "conclusion" });
$("#check-fairness").addEventListener("click", () => {
  const correct = radioValue("fairness") === dialectCase.correct;
  setFeedback("#fairness-feedback", correct, correct ? "Dialect consequence identified" : "Test more than one pronunciation system", correct ? "A sound-based reform must specify whose contrasts and pronunciations it represents." : "A spelling that is transparent for one variety can merge distinctions or introduce silent material for another.");
});
$("#check-policy").addEventListener("click", () => {
  const correct = policyEvidenceCorrect(checkedValues("#policy-options"), policyEvidence);
  setFeedback("#policy-feedback", correct, correct ? "Evaluation plan is balanced" : "The plan omits a stakeholder or outcome", correct ? "The plan tests learning, experienced reading, dialect coverage, morphological information, and transition costs." : "Irregular examples can motivate reform, but policy requires comparative outcomes and implementation evidence.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = conclusionCorrect(radioValue("conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Proposal ready for a test" : "The policy claim is too absolute", correct ? "This conclusion turns a preference into a testable, bounded proposal." : "Neither irregularity nor familiarity alone settles whether a particular reform produces net benefits.");
});
renderSandbox(); renderDialect();
