import { comparisons, messages, reasoningOptions, studyOptions } from "./data.js";
import { calculateReadings, formatMessage } from "./logic.js";

const $ = selector => document.querySelector(selector);
const controls = ["message", "punctuation", "cue", "relationship", "channel"];

function settingsFromControls() {
  return Object.fromEntries(controls.map(id => [id, $(`#${id}`).value]));
}

function barsMarkup(scores) {
  return Object.entries(scores).map(([label, value]) => `
    <div class="reading-row"><span>${label}</span><div class="reading-track"><div class="reading-fill" style="width:${value}%"></div></div><span class="reading-value">${value}%</span></div>`).join("");
}

function renderExplorer() {
  const settings = settingsFromControls();
  $("#message-preview").textContent = formatMessage(settings);
  $("#reading-bars").innerHTML = barsMarkup(calculateReadings(settings));
  $("#context-caption").textContent = `${$("#relationship").selectedOptions[0].text} · ${$("#channel").selectedOptions[0].text}. Compare patterns, not an individual prediction.`;
}

function renderComparison() {
  $("#comparison-grid").innerHTML = comparisons.map(item => {
    const scores = calculateReadings(item.settings);
    return `<article class="comparison-panel"><h3>${item.label}</h3><p class="compare-message">${formatMessage(item.settings)}</p><div class="mini-bars">${Object.entries(scores).map(([label, value]) => `<div><span>${label}</span><strong>${value}%</strong></div>`).join("")}</div></article>`;
  }).join("");
}

function setFeedback(element, correct, title, text) {
  element.hidden = false;
  element.className = `feedback-panel${correct ? "" : " needs-revision"}`;
  element.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
}

for (const message of messages) $("#message").insertAdjacentHTML("beforeend", `<option>${message}</option>`);
for (const id of controls) $(`#${id}`).addEventListener("input", renderExplorer);
renderExplorer();
renderComparison();

$("#study-options").innerHTML = studyOptions.map(option => `<label class="option-card"><input type="radio" name="study" value="${option.id}"><span><strong>${option.title}</strong>${option.text}</span></label>`).join("");
$("#check-context").addEventListener("click", () => {
  const value = document.querySelector('input[name="context-inference"]:checked')?.value;
  setFeedback($("#context-feedback"), value === "dependent", value === "dependent" ? "Well calibrated" : "Try the comparison again", value === "dependent" ? "The same words and period remain compatible with different readings because relationship and channel supply interpretive context." : "Avoid treating one cue as a context-free code. Ask what changed while the message stayed constant.");
});
$("#check-study").addEventListener("click", () => {
  const value = document.querySelector('input[name="study"]:checked')?.value;
  setFeedback($("#study-feedback"), value === "controlled", value === "controlled" ? "Strongest design" : "Evidence is not yet matched to the claim", value === "controlled" ? "Holding the message constant while varying context makes the proposed context effect testable; diverse participants help reveal community differences." : "The claim concerns interpretation across contexts. The evidence must measure interpretations, compare contexts, and address who is represented.");
});

for (const [id, options] of Object.entries(reasoningOptions)) {
  $(`#reasoning-${id}`).innerHTML = `<option value="">Choose…</option>${options.map((option, index) => `<option value="${index}">${option}</option>`).join("")}`;
}
$("#check-reasoning").addEventListener("click", () => {
  const correct = $("#reasoning-observation").value === "0" && $("#reasoning-limit").value === "0" && $("#reasoning-conclusion").value === "0";
  setFeedback($("#reasoning-feedback"), correct, correct ? "A warranted argument" : "One link overreaches", correct ? "The conclusion stays proportional to the comparison and preserves a limit on generalization." : "Use a patterned observation, retain the study’s limits, and avoid universal claims from context-bound evidence.");
});
