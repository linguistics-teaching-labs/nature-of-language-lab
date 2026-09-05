import { cases, claimLevels, evidenceItems } from "./data.js";
import { claimIsCalibrated, confidenceScore, evidenceSetCorrect, overreach } from "./logic.js";
import { $, checkedValues, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let active = cases[0];

function renderCase() {
  active = cases.find(item => item.id === $("#case-picker").value);
  $("#finding-text").textContent = active.finding;
  $("#design").textContent = active.design;
  $("#caution").textContent = active.caution;
  $("#claim-ladder").innerHTML = claimLevels.map((level, index) => `<label class="claim-rung"><input type="radio" name="claim-level" value="${level.id}"><span>${index + 1}</span><p><strong>${level.label}</strong><br>${level.text}</p></label>`).join("");
  $("#alternative-options").innerHTML = optionCards(active.alternatives, { name: "alternative", type: "checkbox" });
  $("#claim-feedback").hidden = true;
  updateConfidence();
}

function updateConfidence() {
  const score = confidenceScore(checkedValues("#alternative-options"), active.alternatives);
  $("#confidence-output").textContent = `${score}/100`;
  $("#confidence-fill").style.width = `${score}%`;
  $("#confidence-note").textContent = score === 90 ? "Check alternative explanations to stress-test the first interpretation. This is a reasoning heuristic, not a probability." : "Unchecked alternatives narrow the conclusion the evidence can support.";
}

$("#case-picker").innerHTML = cases.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#case-picker").addEventListener("change", renderCase);
$("#alternative-options").addEventListener("change", updateConfidence);
$("#evidence-options").innerHTML = optionCards(evidenceItems, { name: "evidence", type: "checkbox" });
$("#check-claim").addEventListener("click", () => {
  const selected = radioValue("claim-level");
  const correct = claimIsCalibrated(selected, active.warranted);
  const tooStrong = overreach(selected, active.warranted, claimLevels);
  setFeedback("#claim-feedback", correct, correct ? "Claim matches the evidence" : tooStrong ? "The claim overreaches" : "The claim misses the pattern", correct ? `The ${active.warranted === "association" ? "association" : "context-bound influence"} claim preserves the observed result and the study’s limits.` : tooStrong ? "The evidence does not establish that language determines or limits possible thought." : "The finding supports a relationship in this task; do not erase that evidence while rejecting determinism.");
});
$("#check-evidence").addEventListener("click", () => {
  const correct = evidenceSetCorrect(checkedValues("#evidence-options"), evidenceItems);
  setFeedback("#evidence-feedback", correct, correct ? "Evidence plan is proportional" : "Revise the evidence plan", correct ? "The plan measures behavior, creates a relevant comparison, and investigates competing explanations." : "A translation curiosity or fictional example can motivate a question, but cannot replace a behavioral measure, comparison, and controls.");
});

renderCase();
