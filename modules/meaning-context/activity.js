import { conclusions, contextCases, diagnosticCases, relationCases } from "./data.js";
import { contextInterpretationCorrect, diagnosticCorrect, meaningConclusionCorrect, relationCorrect } from "./logic.js";
import { $, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let activeRelation = relationCases[0];
let activeDiagnostic = diagnosticCases[0];
let activeContext = contextCases[0];

function clearRadios(name) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(input => { input.checked = false; });
}

function renderRelation() {
  activeRelation = relationCases.find(item => item.id === $("#relation-picker").value);
  $("#first-sentence").textContent = activeRelation.first;
  $("#second-sentence").textContent = activeRelation.second;
  clearRadios("relation");
  $("#relation-feedback").hidden = true;
}

function renderDiagnostic() {
  activeDiagnostic = diagnosticCases.find(item => item.id === $("#diagnostic-picker").value);
  $("#diagnostic-text").textContent = activeDiagnostic.text;
  clearRadios("diagnostic");
  $("#diagnostic-feedback").hidden = true;
}

function renderContext() {
  activeContext = contextCases.find(item => item.id === $("#context-picker").value);
  $("#context-utterance").textContent = activeContext.utterance;
  $("#context-description").textContent = activeContext.context;
  clearRadios("context-reading");
  $("#context-feedback").hidden = true;
}

$("#relation-picker").innerHTML = relationCases.map((item, index) => `<option value="${item.id}">Pair ${index + 1}</option>`).join("");
$("#diagnostic-picker").innerHTML = diagnosticCases.map((item, index) => `<option value="${item.id}">Continuation ${index + 1}</option>`).join("");
$("#context-picker").innerHTML = contextCases.map((item, index) => `<option value="${item.id}">Context ${index + 1}</option>`).join("");
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "meaning-conclusion" });

$("#relation-picker").addEventListener("change", renderRelation);
$("#diagnostic-picker").addEventListener("change", renderDiagnostic);
$("#context-picker").addEventListener("change", renderContext);
$("#check-relation").addEventListener("click", () => {
  const correct = relationCorrect(radioValue("relation"), activeRelation);
  setFeedback("#relation-feedback", correct, correct ? "Relationship identified" : "Apply the necessity and cancellation tests", correct ? activeRelation.explanation : "Ask whether the second sentence must be true, is treated as background, or is only a defeasible suggestion.");
});
$("#check-diagnostic").addEventListener("click", () => {
  const correct = diagnosticCorrect(radioValue("diagnostic"), activeDiagnostic);
  setFeedback("#diagnostic-feedback", correct, correct ? "Diagnostic interpreted" : "Distinguish cancellation from conflict", correct ? activeDiagnostic.explanation : "Entailments cannot be denied consistently; presuppositions resist direct denial; implicatures are normally cancellable.");
});
$("#check-context").addEventListener("click", () => {
  const correct = contextInterpretationCorrect(radioValue("context-reading"), activeContext);
  setFeedback("#context-feedback", correct, correct ? "Contextual function identified" : "Use the participants’ immediate task", correct ? activeContext.explanation : "Keep the literal form available, then ask what action the utterance reasonably performs in this particular setting.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = meaningConclusionCorrect(radioValue("meaning-conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "A layered account of meaning" : "The claim removes a necessary constraint", correct ? "The exercises distinguish encoded content from structured, context-supported inference without making interpretation arbitrary." : "Meaning is neither context-free nor unlimited: linguistic form, shared knowledge, and interactional goals jointly constrain interpretation.");
});

renderRelation();
renderDiagnostic();
renderContext();
