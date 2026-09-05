import { ambiguityCases, conclusions, judgmentCases, testCases } from "./data.js";
import { ambiguityReadingCorrect, constituencyTestCorrect, judgmentCorrect, syntaxConclusionCorrect } from "./logic.js";
import { $, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let activeAmbiguity = ambiguityCases[0];
let activeTest = testCases[0];
let activeJudgment = judgmentCases[0];

function renderAmbiguity() {
  activeAmbiguity = ambiguityCases.find(item => item.id === $("#sentence-picker").value);
  $("#ambiguous-sentence").textContent = activeAmbiguity.sentence;
  $("#target-reading").textContent = activeAmbiguity.target;
  $("#reading-options").innerHTML = activeAmbiguity.readings.map(reading => `<label class="option-card"><input type="radio" name="structure-reading" value="${reading.id}"><span><strong>${reading.label}</strong>${reading.paraphrase}</span></label>`).join("");
  $("#bracket-view").textContent = "Choose an analysis to reveal its brackets.";
  $("#reading-feedback").hidden = true;
}

function showSelectedBrackets() {
  const reading = activeAmbiguity.readings.find(item => item.id === radioValue("structure-reading"));
  $("#bracket-view").textContent = reading?.bracket ?? "Choose an analysis to reveal its brackets.";
}

function renderTest() {
  activeTest = testCases.find(item => item.id === $("#test-picker").value);
  $("#test-sentence").textContent = activeTest.text;
  document.querySelectorAll('input[name="test-reading"]').forEach(input => { input.checked = false; });
  $("#test-feedback").hidden = true;
}

function renderJudgment() {
  activeJudgment = judgmentCases.find(item => item.id === $("#judgment-picker").value);
  $("#judgment-sentence").textContent = activeJudgment.sentence;
  document.querySelectorAll('input[name="judgment"]').forEach(input => { input.checked = false; });
  $("#judgment-feedback").hidden = true;
}

$("#sentence-picker").innerHTML = ambiguityCases.map(item => `<option value="${item.id}">${item.sentence}</option>`).join("");
$("#test-picker").innerHTML = testCases.map((item, index) => `<option value="${item.id}">Test ${index + 1}</option>`).join("");
$("#judgment-picker").innerHTML = judgmentCases.map((item, index) => `<option value="${item.id}">Sentence ${index + 1}</option>`).join("");
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "syntax-conclusion" });

$("#sentence-picker").addEventListener("change", renderAmbiguity);
$("#reading-options").addEventListener("change", showSelectedBrackets);
$("#test-picker").addEventListener("change", renderTest);
$("#judgment-picker").addEventListener("change", renderJudgment);
$("#check-reading").addEventListener("click", () => {
  const correct = ambiguityReadingCorrect(radioValue("structure-reading"), activeAmbiguity);
  const reading = activeAmbiguity.readings.find(item => item.id === activeAmbiguity.answer);
  setFeedback("#reading-feedback", correct, correct ? "Structure matches the target" : "The brackets yield the other reading", correct ? reading.paraphrase : `For the target, choose the analysis paraphrased as: ${reading.paraphrase}`);
});
$("#check-test").addEventListener("click", () => {
  const correct = constituencyTestCorrect(radioValue("test-reading"), activeTest);
  setFeedback("#test-feedback", correct, correct ? "Test linked to an analysis" : "Recheck what moves or is replaced", correct ? activeTest.explanation : "A constituency test supplies evidence for a grouping; it does not erase the sentence’s other possible analysis.");
});
$("#check-judgment").addEventListener("click", () => {
  const correct = judgmentCorrect(radioValue("judgment"), activeJudgment);
  setFeedback("#judgment-feedback", correct, correct ? "Form and interpretation separated" : "Do not equate odd meaning with bad structure", correct ? activeJudgment.explanation : "Ask two questions independently: does the sequence follow the grammar, and is a plausible meaning readily available?");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = syntaxConclusionCorrect(radioValue("syntax-conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Ambiguity explained structurally" : "Ambiguity is not structural failure", correct ? "A grammar can generate more than one structure for a word sequence; context and constituency evidence help select a reading." : "Multiple interpretations reveal structured alternatives, not an absence of rules or logic.");
});

renderAmbiguity();
renderTest();
renderJudgment();
