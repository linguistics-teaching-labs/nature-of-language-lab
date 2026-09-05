import test from "node:test";
import assert from "node:assert/strict";
import { conclusions, errorCases, evidencePlan, hypotheses, stageOrder } from "../modules/language-learning/data.js";
import { errorInterpretationCorrect, evidencePlanCorrect, hypothesisCorrect, learningConclusionCorrect, stageOrderCorrect } from "../modules/language-learning/logic.js";

test("language-learning errors support only evidence-sized inferences", () => {
  for (const item of errorCases) assert.equal(errorInterpretationCorrect(item.answer, item), true);
  assert.equal(stageOrderCorrect(stageOrder, stageOrder), true);
  assert.equal(stageOrderCorrect([stageOrder[1], stageOrder[0], stageOrder[2]], stageOrder), false);
  assert.equal(hypothesisCorrect(hypotheses.find(item => item.id === "rule-memory").id), true);
  assert.equal(evidencePlanCorrect(evidencePlan.filter(item => item.required).map(item => item.id), evidencePlan), true);
  assert.equal(evidencePlanCorrect(evidencePlan.map(item => item.id), evidencePlan), false);
  assert.equal(learningConclusionCorrect(conclusions.find(item => item.id === "evidence").id), true);
});
