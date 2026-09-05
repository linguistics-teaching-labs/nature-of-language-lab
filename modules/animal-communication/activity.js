import { conclusions, evidenceItems, features, systems } from "./data.js";
import { compareSystems, conclusionCorrect, evidencePlanCorrect, featureCounts } from "./logic.js";
import { $, checkedValues, optionCards, radioValue, setFeedback } from "../shared/ui.js";

function system(id) { return systems.find(item => item.id === id); }
function statusLabel(status) { return status === "not-demonstrated" ? "Not demonstrated" : status[0].toUpperCase() + status.slice(1); }

function renderSystem() {
  const active = system($("#system-picker").value);
  $("#feature-body").innerHTML = features.map(feature => {
    const [status, note] = active.features[feature.id];
    return `<tr><td><strong>${feature.label}</strong><br><small>${feature.question}</small></td><td><span class="evidence-status ${status === "clear" ? "" : status === "limited" ? "limited" : "absent"}">${statusLabel(status)}</span></td><td>${note}</td></tr>`;
  }).join("");
  const counts = featureCounts(active);
  $("#feature-summary").innerHTML = `<div class="result-tile"><span>Clear evidence</span><strong>${counts.clear}</strong></div><div class="result-tile"><span>Limited evidence</span><strong>${counts.limited}</strong></div><div class="result-tile"><span>Not demonstrated</span><strong>${counts["not-demonstrated"]}</strong></div>`;
}

function renderComparison() {
  const first = system($("#compare-a").value);
  const second = system($("#compare-b").value);
  const rows = compareSystems(first, second);
  $("#comparison-results").innerHTML = rows.map(row => `<div class="anatomy-card"><span>${features.find(feature => feature.id === row.id).label}</span><p>${first.label}: <strong>${statusLabel(row.first)}</strong><br>${second.label}: <strong>${statusLabel(row.second)}</strong></p></div>`).join("");
}

const options = systems.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#system-picker").innerHTML = options;
$("#compare-a").innerHTML = options;
$("#compare-b").innerHTML = options;
$("#compare-b").value = "bees";
$("#system-picker").addEventListener("change", renderSystem);
$("#compare-a").addEventListener("change", renderComparison);
$("#compare-b").addEventListener("change", renderComparison);
renderSystem(); renderComparison();

$("#evidence-options").innerHTML = optionCards(evidenceItems, { name: "evidence", type: "checkbox" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "conclusion" });
$("#check-evidence").addEventListener("click", () => {
  const correct = evidencePlanCorrect(checkedValues("#evidence-options"), evidenceItems);
  setFeedback("#evidence-feedback", correct, correct ? "Evidence matched to the question" : "The plan needs revision", correct ? "The plan connects signals, contexts, receiver responses, and novelty while avoiding impressionistic evidence." : "A strong plan observes production, tests receiver response, and probes novelty; fame or human-like appearance is not enough.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = conclusionCorrect(radioValue("conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Calibrated conclusion" : "The conclusion is too absolute", correct ? "This conclusion recognizes meaningful overlap without treating one shared feature as proof of system-wide equivalence." : "Separate evidence for particular design features from an all-or-nothing label for the entire communication system.");
});
