import { classificationCases, classificationOptions, conclusions, ideologyItems, ruleCases } from "./data.js";
import { classificationCorrect, conclusionCorrect, ideologySetCorrect, ruleCorrect } from "./logic.js";
import { $, checkedValues, optionCards, radioValue, setFeedback } from "../shared/ui.js";

let activeRule = ruleCases[0]; let activeClassification = classificationCases[0];
function renderRule() {
  activeRule = ruleCases.find(item => item.id === $("#rule-picker").value);
  $("#rule-example").textContent = activeRule.example;
  $("#rule-context").textContent = activeRule.context;
  $("#rule-options").innerHTML = optionCards(activeRule.options, { name: "rule" });
  $("#rule-feedback").hidden = true;
}
function renderClassification() {
  activeClassification = classificationCases.find(item => item.id === $("#classification-picker").value);
  $("#classification-scenario").textContent = activeClassification.label;
  $("#classification-options").innerHTML = optionCards(classificationOptions, { name: "classification" });
  $("#classification-feedback").hidden = true;
}
$("#rule-picker").innerHTML = ruleCases.map(item => `<option value="${item.id}">${item.label}</option>`).join("");
$("#classification-picker").innerHTML = classificationCases.map((item, index) => `<option value="${item.id}">Case ${index + 1}</option>`).join("");
$("#rule-picker").addEventListener("change", renderRule);
$("#classification-picker").addEventListener("change", renderClassification);
$("#ideology-options").innerHTML = optionCards(ideologyItems, { name: "ideology", type: "checkbox" });
$("#conclusion-options").innerHTML = optionCards(conclusions, { name: "conclusion" });
$("#check-rule").addEventListener("click", () => {
  const correct = ruleCorrect(radioValue("rule"), activeRule);
  setFeedback("#rule-feedback", correct, correct ? "Rule recovered" : "Look for the contrast in meaning or environment", correct ? activeRule.context : "A linguistic analysis asks where the form occurs and what contrast it expresses; it does not use social stereotypes as an explanation.");
});
$("#check-classification").addEventListener("click", () => {
  const correct = classificationCorrect(radioValue("classification"), activeClassification);
  setFeedback("#classification-feedback", correct, correct ? "Term fits the evidence" : "Refine the level of difference", correct ? "The label describes which linguistic levels differ in the scenario." : "Pronunciation alone points to accent; differences across grammar and vocabulary indicate a dialect or variety; slang refers primarily to informal vocabulary.");
});
$("#check-ideology").addEventListener("click", () => {
  const correct = ideologySetCorrect(checkedValues("#ideology-options"), ideologyItems);
  setFeedback("#ideology-feedback", correct, correct ? "Description separated from ideology" : "One statement is misclassified", correct ? "The selected statements convert prestige, familiarity, or stigma into unsupported claims about linguistic structure or speakers." : "Select claims that naturalize prestige or link a feature to intelligence; leave empirical pattern and listener-familiarity statements unselected.");
});
$("#check-conclusion").addEventListener("click", () => {
  const correct = conclusionCorrect(radioValue("conclusion"));
  setFeedback("#conclusion-feedback", correct, correct ? "Linguistic and social evidence connected" : "The conclusion reproduces the myth", correct ? "This conclusion recognizes structured variation and explains why social evaluation cannot be read directly from grammar." : "Standard varieties are varieties too; institutional prestige is not evidence of greater structural logic.");
});
renderRule(); renderClassification();
