import {
  changeCases,
  claimNeeds,
  diagnosticLabels,
  diagnosticScenarios,
  reasoningOptions,
  sourceNotes
} from "./data.js";
import { evaluateEvidencePlan, evaluateReasoningSelection } from "./logic.js";
import { adoptionSeries, buildNetwork, chooseInnovators, simulateDiffusion } from "./simulation.js";

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showFeedback(container, { title, paragraphs = [], items = [], success = false }) {
  container.replaceChildren();
  container.classList.toggle("needs-revision", !success);
  container.append(element("h3", "", title));
  for (const paragraph of paragraphs) container.append(element("p", "", paragraph));
  if (items.length) {
    const list = element("ul");
    for (const item of items) list.append(element("li", "", item));
    container.append(list);
  }
  container.hidden = false;
}

// Step 1: evidence requirements
const claimNeedsContainer = document.querySelector("#claim-needs");
for (const item of claimNeeds) {
  const label = element("label", "evidence-choice");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = item.id;
  label.append(input, element("span", "", item.label));
  claimNeedsContainer.append(label);
}

const claimFeedback = document.querySelector("#claim-feedback");
document.querySelector("#check-claim").addEventListener("click", () => {
  const selected = [...claimNeedsContainer.querySelectorAll("input:checked")].map(input => input.value);
  const result = evaluateEvidencePlan(selected);
  if (result.complete) {
    showFeedback(claimFeedback, {
      title: "This plan can test a deterioration claim.",
      paragraphs: ["It defines the outcome, compares evidence over time, and checks whether the pattern extends beyond one speaker or setting. Attitudes may still matter—but they answer a different question."],
      success: true
    });
    return;
  }
  showFeedback(claimFeedback, {
    title: "Revise the evidence plan.",
    paragraphs: ["A useful example is not automatically sufficient evidence for a broad historical claim."],
    items: result.mismatches.map(item => item.feedback)
  });
});

document.querySelector("#reset-claim").addEventListener("click", () => {
  for (const input of claimNeedsContainer.querySelectorAll("input")) input.checked = false;
  claimFeedback.hidden = true;
  claimFeedback.replaceChildren();
});

// Step 2: change cases
const caseTabs = document.querySelector("#case-tabs");
const caseNodes = {
  kind: document.querySelector("#case-kind"),
  title: document.querySelector("#case-title"),
  index: document.querySelector("#case-index"),
  prompt: document.querySelector("#case-prompt"),
  earlierLabel: document.querySelector("#earlier-label"),
  earlier: document.querySelector("#earlier-text"),
  laterLabel: document.querySelector("#later-label"),
  later: document.querySelector("#later-text"),
  observation: document.querySelector("#case-observation"),
  inference: document.querySelector("#case-inference"),
  caution: document.querySelector("#case-caution"),
  source: document.querySelector("#case-source")
};

function renderCase(selectedCase) {
  const index = changeCases.findIndex(item => item.id === selectedCase.id);
  caseNodes.kind.textContent = selectedCase.kind;
  caseNodes.title.textContent = selectedCase.title;
  caseNodes.index.textContent = `${index + 1} of ${changeCases.length}`;
  caseNodes.prompt.textContent = selectedCase.prompt;
  caseNodes.earlierLabel.textContent = selectedCase.earlierLabel;
  caseNodes.earlier.textContent = selectedCase.earlier;
  caseNodes.laterLabel.textContent = selectedCase.laterLabel;
  caseNodes.later.textContent = selectedCase.later;
  caseNodes.observation.textContent = selectedCase.observation;
  caseNodes.inference.textContent = selectedCase.inference;
  caseNodes.caution.textContent = selectedCase.caution;
  caseNodes.source.replaceChildren(document.createTextNode("Source: "));
  if (selectedCase.sourceUrl) {
    const link = element("a", "", selectedCase.source);
    link.href = selectedCase.sourceUrl;
    link.target = "_blank";
    link.rel = "noopener";
    caseNodes.source.append(link);
  } else {
    caseNodes.source.append(document.createTextNode(selectedCase.source));
  }
}

for (const [index, changeCase] of changeCases.entries()) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "change-case";
  input.value = changeCase.id;
  input.checked = index === 0;
  input.addEventListener("change", () => renderCase(changeCase));
  label.append(input, element("span", "", changeCase.tab));
  caseTabs.append(label);
}
renderCase(changeCases[0]);

// Step 3: network diffusion
const svgNamespace = "http://www.w3.org/2000/svg";
const networkGraph = document.querySelector("#network-graph");
const patternInput = document.querySelector("#network-pattern");
const innovatorsInput = document.querySelector("#innovators");
const thresholdInput = document.querySelector("#threshold");
const roundsInput = document.querySelector("#rounds");
const innovatorsOutput = document.querySelector("#innovators-output");
const thresholdOutput = document.querySelector("#threshold-output");
const roundsOutput = document.querySelector("#rounds-output");
const adoptionCount = document.querySelector("#adoption-count");
const roundChart = document.querySelector("#round-chart");
const networkLabel = document.querySelector("#network-label");
const simulationInterpretation = document.querySelector("#simulation-interpretation");

function networkPosition(node, pattern) {
  if (pattern === "bridged") {
    const angle = (node.id / 24) * Math.PI * 2 - Math.PI / 2;
    return { x: 310 + Math.cos(angle) * 145, y: 180 + Math.sin(angle) * 140 };
  }
  const centers = [
    { x: 165, y: 105 }, { x: 455, y: 105 },
    { x: 165, y: 270 }, { x: 455, y: 270 }
  ];
  const withinGroup = node.id % 6;
  const angle = (withinGroup / 6) * Math.PI * 2 - Math.PI / 2;
  const center = centers[node.group];
  return { x: center.x + Math.cos(angle) * 62, y: center.y + Math.sin(angle) * 55 };
}

function svgElement(tag, attributes = {}) {
  const node = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
  return node;
}

function renderNetwork(network, result, innovators) {
  networkGraph.querySelectorAll(".network-drawing").forEach(node => node.remove());
  const drawing = svgElement("g", { class: "network-drawing" });
  const positions = new Map(network.nodes.map(node => [node.id, networkPosition(node, network.pattern)]));

  for (const edge of network.edges) {
    const start = positions.get(edge.a);
    const end = positions.get(edge.b);
    drawing.append(svgElement("line", {
      x1: start.x, y1: start.y, x2: end.x, y2: end.y, class: "network-edge"
    }));
  }

  for (const node of network.nodes) {
    const position = positions.get(node.id);
    const classes = ["network-node"];
    if (result.adopted.has(node.id)) classes.push("adopted");
    if (innovators.has(node.id)) classes.push("innovator");
    const circle = svgElement("circle", {
      cx: position.x,
      cy: position.y,
      r: 13,
      class: classes.join(" "),
      tabindex: 0
    });
    const title = svgElement("title");
    title.textContent = `Speaker ${node.id + 1}: ${result.adopted.has(node.id) ? "uses" : "does not use"} the new form${innovators.has(node.id) ? "; initial innovator" : ""}`;
    circle.append(title);
    drawing.append(circle);
  }
  networkGraph.append(drawing);
}

function renderRoundChart(series) {
  roundChart.replaceChildren();
  for (const point of series) {
    const row = element("div", "round-row");
    row.append(element("span", "", `R${point.round}`));
    const track = element("div", "round-track");
    const fill = element("div", "round-fill");
    fill.style.width = `${point.share * 100}%`;
    track.append(fill);
    row.append(track, element("span", "round-value", String(point.count)));
    roundChart.append(row);
  }
}

function runSimulation() {
  const pattern = patternInput.value;
  const innovators = Number(innovatorsInput.value);
  const threshold = Number(thresholdInput.value) / 100;
  const rounds = Number(roundsInput.value);
  const network = buildNetwork({ pattern });
  const result = simulateDiffusion(network, { innovators, threshold, rounds });
  const initialInnovators = chooseInnovators(innovators, network.nodes.length);
  const series = adoptionSeries(result.history, network.nodes.length);
  const finalCount = result.adopted.size;
  const additional = finalCount - innovators;

  renderNetwork(network, result, initialInnovators);
  renderRoundChart(series);
  adoptionCount.textContent = `${finalCount} of ${network.nodes.length}`;
  networkLabel.textContent = pattern === "clustered" ? "Close-knit clusters" : "More cross-group bridges";

  if (additional === 0) {
    simulationInterpretation.textContent = "At this threshold, exposure never became strong enough for another speaker to adopt the form. This does not mean diffusion is impossible under different assumptions.";
  } else if (finalCount === network.nodes.length) {
    simulationInterpretation.textContent = `The form reached the full teaching network in ${rounds} rounds. The model shows how local exposure can accumulate; it does not establish that real change is inevitable.`;
  } else {
    simulationInterpretation.textContent = `${additional} additional ${additional === 1 ? "speaker adopted" : "speakers adopted"} the form. Network ties and the decision threshold constrain where diffusion stops.`;
  }
}

function updateSimulationOutputs() {
  innovatorsOutput.value = innovatorsInput.value;
  thresholdOutput.value = `${thresholdInput.value}%`;
  roundsOutput.value = roundsInput.value;
}

for (const input of [innovatorsInput, thresholdInput, roundsInput]) {
  input.addEventListener("input", updateSimulationOutputs);
}
document.querySelector("#run-simulation").addEventListener("click", runSimulation);
document.querySelector("#compare-network").addEventListener("click", () => {
  patternInput.value = patternInput.value === "clustered" ? "bridged" : "clustered";
  runSimulation();
});
updateSimulationOutputs();
runSimulation();

// Step 4: diagnostic cases
const scenarioNumber = document.querySelector("#scenario-number");
const scenarioDots = document.querySelector("#scenario-dots");
const scenarioText = document.querySelector("#scenario-text");
const diagnosticOptions = document.querySelector("#diagnostic-options");
const diagnosisFeedback = document.querySelector("#diagnosis-feedback");
const nextScenario = document.querySelector("#next-scenario");
let scenarioIndex = 0;

for (const option of diagnosticLabels) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "diagnosis";
  input.value = option.id;
  label.append(input, element("span", "", option.label));
  diagnosticOptions.append(label);
}

function renderScenario() {
  const scenario = diagnosticScenarios[scenarioIndex];
  scenarioNumber.textContent = `Case ${scenarioIndex + 1} of ${diagnosticScenarios.length}`;
  scenarioDots.textContent = diagnosticScenarios.map((_, index) => index === scenarioIndex ? "●" : "○").join("");
  scenarioText.textContent = scenario.text;
  for (const input of diagnosticOptions.querySelectorAll("input")) input.checked = false;
  diagnosisFeedback.hidden = true;
  diagnosisFeedback.replaceChildren();
  nextScenario.hidden = true;
}

document.querySelector("#check-diagnosis").addEventListener("click", () => {
  const scenario = diagnosticScenarios[scenarioIndex];
  const selected = diagnosticOptions.querySelector("input:checked")?.value;
  if (!selected) {
    showFeedback(diagnosisFeedback, {
      title: "Choose the most precise diagnosis.",
      paragraphs: ["Focus on what the evidence directly describes before evaluating it."]
    });
    return;
  }
  const correct = selected === scenario.answer;
  const correctLabel = diagnosticLabels.find(option => option.id === scenario.answer).label;
  showFeedback(diagnosisFeedback, {
    title: correct ? "Well calibrated." : `A more precise diagnosis is ${correctLabel.toLowerCase()}.`,
    paragraphs: [scenario.explanation],
    success: correct
  });
  nextScenario.hidden = false;
  nextScenario.textContent = scenarioIndex === diagnosticScenarios.length - 1 ? "Restart cases" : "Next case";
});

nextScenario.addEventListener("click", () => {
  scenarioIndex = (scenarioIndex + 1) % diagnosticScenarios.length;
  renderScenario();
});
renderScenario();

// Step 5: reasoning map
const reasoningSelects = {
  evidence: document.querySelector("#reasoning-evidence"),
  criterion: document.querySelector("#reasoning-criterion"),
  alternative: document.querySelector("#reasoning-alternative"),
  conclusion: document.querySelector("#reasoning-conclusion")
};

for (const [key, options] of Object.entries(reasoningOptions)) {
  const select = reasoningSelects[key];
  for (const option of options) {
    const optionNode = document.createElement("option");
    optionNode.value = option.id;
    optionNode.textContent = option.label;
    select.append(optionNode);
  }
}

const reasoningFeedback = document.querySelector("#reasoning-feedback");
const reasoningPrompts = {
  evidence: "Use representative, comparable observations rather than selected anecdotes.",
  criterion: "A testable criterion cannot define every difference from an older norm as damage.",
  alternative: "A strong argument considers whether new forms serve contextual, social, or grammatical functions.",
  conclusion: "The conclusion should distinguish evidence of change from evidence of general decline."
};

document.querySelector("#check-reasoning").addEventListener("click", () => {
  const selection = Object.fromEntries(Object.entries(reasoningSelects).map(([key, select]) => [key, select.value]));
  const result = evaluateReasoningSelection(selection);
  if (result.complete) {
    showFeedback(reasoningFeedback, {
      title: "The conclusion is calibrated to the evidence.",
      paragraphs: ["This map recognizes systematic change, uses a testable standard for deterioration, considers a plausible alternative explanation, and avoids claiming either collapse or complete stability."],
      success: true
    });
    return;
  }
  const items = [
    ...result.missing.map(key => `Complete the ${key} connection.`),
    ...result.mismatches.map(key => reasoningPrompts[key])
  ];
  showFeedback(reasoningFeedback, {
    title: "At least one connection needs revision.",
    paragraphs: ["A defensible conclusion depends on the quality of the evidence and the assumptions linking it to the claim."],
    items
  });
});

const sourceNotesContainer = document.querySelector("#source-notes");
const sourceList = element("ul");
for (const note of sourceNotes) sourceList.append(element("li", "", note));
sourceNotesContainer.append(sourceList);
