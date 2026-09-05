import { claims } from "./data.js";
import { evaluateConclusion, evaluateEvidence, evaluateTest, stressScore } from "./logic.js";

const $ = selector => document.querySelector(selector);
let activeClaim = claims[0];

function setFeedback(element, correct, title, text) {
  element.hidden = false;
  element.className = `feedback-panel${correct ? "" : " needs-revision"}`;
  element.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
}

function renderOptions(id, options) {
  $(`#test-${id}`).innerHTML = `<option value="">Choose…</option>${options.map((option, index) => `<option value="${index}">${option}</option>`).join("")}`;
}

function renderClaim() {
  $("#claim-quote").textContent = `“${activeClaim.claim}”`;
  $("#anatomy-grid").innerHTML = Object.entries(activeClaim.anatomy).map(([label, text]) => `<article class="anatomy-card"><span>${label}</span><p>${text}</p></article>`).join("");
  for (const [id, options] of Object.entries(activeClaim.options)) renderOptions(id, options);
  $("#evidence-options").innerHTML = activeClaim.evidence.map(item => `<label class="option-card"><input type="checkbox" value="${item.id}"><span>${item.text}</span></label>`).join("");
  $("#alternative-options").innerHTML = activeClaim.alternatives.map(item => `<label class="option-card"><input type="checkbox" value="${item.id}"><span><strong>Alternative explanation</strong>${item.text}</span></label>`).join("");
  $("#conclusion-options").innerHTML = activeClaim.conclusions.map(item => `<label class="option-card"><input type="radio" name="conclusion" value="${item.id}"><span>${item.text}</span></label>`).join("");
  for (const id of ["test-feedback", "evidence-feedback", "conclusion-feedback"]) $(`#${id}`).hidden = true;
  updateConfidence();
}

function checkedValues(container) {
  return [...container.querySelectorAll("input:checked")].map(input => input.value);
}

function updateConfidence() {
  const selected = checkedValues($("#alternative-options"));
  const score = stressScore(selected, activeClaim.alternatives);
  $("#confidence-output").textContent = `${score}/100`;
  $("#confidence-fill").style.width = `${score}%`;
  $("#confidence-note").textContent = selected.length ? "The claim needs narrowing or additional controls before confidence can recover." : "Start by checking plausible alternatives. This meter is a reasoning heuristic, not a statistical probability.";
}

$("#claim-picker").innerHTML = claims.map(claim => `<option value="${claim.id}">${claim.title}</option>`).join("");
$("#claim-picker").addEventListener("change", event => {
  activeClaim = claims.find(claim => claim.id === event.target.value);
  renderClaim();
});
$("#check-test").addEventListener("click", () => {
  const selections = Object.fromEntries(["measure", "comparison", "coverage"].map(id => [id, $(`#test-${id}`).value]));
  const result = evaluateTest(selections, activeClaim.answers);
  setFeedback($("#test-feedback"), result.correct, result.correct ? "The claim is testable" : "The design has a gap", result.correct ? "The outcome is measurable, the comparison targets the claim, and the coverage matches its scope." : `You matched ${result.correctFields.length} of 3 design elements. Each is necessary for a defensible test.`);
});
$("#check-evidence").addEventListener("click", () => {
  const result = evaluateEvidence(checkedValues($("#evidence-options")), activeClaim.evidence);
  setFeedback($("#evidence-feedback"), result.correct, result.correct ? "Evidence matched" : "Revise the evidence set", result.correct ? "The selected evidence measures the outcome, supports comparison, and addresses the stated scope." : "Select every item needed to test the claim, but leave out material that only repeats a definition or attitude.");
});
$("#alternative-options").addEventListener("change", updateConfidence);
$("#check-conclusion").addEventListener("click", () => {
  const selected = document.querySelector('input[name="conclusion"]:checked')?.value;
  const correct = evaluateConclusion(selected, activeClaim.correctConclusion);
  setFeedback($("#conclusion-feedback"), correct, correct ? "Proportional conclusion" : "The conclusion overreaches", correct ? "This version states what the design can support and preserves unresolved alternatives." : "Choose a conclusion that neither universalizes the finding nor dismisses all possible linguistic influence.");
});

renderClaim();
