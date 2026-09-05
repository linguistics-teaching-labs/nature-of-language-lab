import {
  conclusions,
  errorCases,
  evidencePlan,
  hypotheses,
  hypothesisEvidence,
  stageItems,
  stageOrder
} from "./data.js";
import {
  errorInterpretationCorrect,
  evidencePlanCorrect,
  hypothesisCorrect,
  learningConclusionCorrect,
  stageOrderCorrect
} from "./logic.js";
import { $, checkedValues, optionCards, radioValue, selectOptions, setFeedback } from "../shared/ui.js";

let activeError = errorCases[0];

function clearRadios(name) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(input => { input.checked = false; });
}

function renderError() {
  activeError = errorCases.find(item => item.id === $("#error-picker").value);
  $("#error-context").textContent = activeError.context;
  $("#learner-form").textContent = activeError.learner;
  $("#target-form").textContent = activeError.target;
  clearRadios("error-reading");
  $("#error-feedback").hidden = true;
}

$("#error-picker").innerHTML = errorCases.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#hypothesis-options").innerHTML = optionCards(hypotheses, { name: "hypothesis" });
$("#evidence-options").innerHTML = optionCards(evidencePlan, { name: "evidence-plan", type: "checkbox" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "learning-conclusion" });
$("#hypothesis-evidence").innerHTML = hypothesisEvidence.map(item => `<tr><td>${item.observation}</td><td>${item.implication}</td></tr>`).join("");

for (const select of document.querySelectorAll("[data-stage-select]")) {
  select.innerHTML = selectOptions(stageItems, "Choose an observation…");
}

$("#error-picker").addEventListener("change", renderError);

$("#check-error").addEventListener("click", () => {
  const correct = errorInterpretationCorrect(radioValue("error-reading"), activeError);
  setFeedback(
    "#error-feedback",
    correct,
    correct ? "Inference matches the evidence" : "Separate the form from the evidence pattern",
    correct ? activeError.explanation : "Ask whether the form applies a recognizable rule, repeats across comparable contexts, or appears only once against otherwise stable performance."
  );
});

$("#check-order").addEventListener("click", () => {
  const selected = [$("#stage-early").value, $("#stage-middle").value, $("#stage-later").value];
  const correct = stageOrderCorrect(selected, stageOrder);
  setFeedback(
    "#order-feedback",
    correct,
    correct ? "A U-shaped learning path" : "Track both productivity and exceptions",
    correct
      ? "Early correct use can reflect a stored form. Overregularization emerges when a productive rule becomes available; later performance integrates that rule with irregular exceptions."
      : "Place limited familiar use first, productive overgeneralization second, and coordinated use of rules and exceptions last."
  );
});

$("#check-hypothesis").addEventListener("click", () => {
  const correct = hypothesisCorrect(radioValue("hypothesis"));
  setFeedback(
    "#hypothesis-feedback",
    correct,
    correct ? "The hypothesis explains all four observations" : "Test the hypothesis against novel and unattested forms",
    correct
      ? "A productive rule explains novel regular forms and overregularizations; stored exceptions explain why irregular targets become reliable."
      : "Copying cannot produce unattested forms such as goed, while a random-error account does not predict the shared structure or developmental trajectory."
  );
});

$("#check-evidence").addEventListener("click", () => {
  const correct = evidencePlanCorrect(checkedValues("#evidence-options"), evidencePlan);
  setFeedback(
    "#evidence-feedback",
    correct,
    correct ? "The design can distinguish learning from isolated performance" : "The evidence base is incomplete or selectively sampled",
    correct
      ? "Repeated observations, controlled contrasts, input documentation, and cross-learner comparison make a developmental inference more credible."
      : "Use all four comparative evidence sources and exclude memorable-case selection and single-utterance inference."
  );
});

$("#check-conclusion").addEventListener("click", () => {
  const correct = learningConclusionCorrect(radioValue("learning-conclusion"));
  setFeedback(
    "#conclusion-feedback",
    correct,
    correct ? "A warranted conclusion" : "The conclusion is stronger than the evidence",
    correct
      ? "Errors are informative when their structure, frequency, context, and developmental trajectory support the same interpretation."
      : "A non-adult form is not automatically a deficit, and correction does not by itself establish the mechanism or timing of learning."
  );
});

renderError();
