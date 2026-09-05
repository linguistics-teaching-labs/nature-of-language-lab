import test from "node:test";
import assert from "node:assert/strict";
import { changeCases, claimNeeds, diagnosticScenarios } from "../modules/language-change/data.js";
import { evaluateEvidencePlan, evaluateReasoningSelection } from "../modules/language-change/logic.js";

test("teaching data uses unique identifiers", () => {
  for (const collection of [changeCases, claimNeeds, diagnosticScenarios]) {
    assert.equal(new Set(collection.map(item => item.id)).size, collection.length);
  }
});

test("evidence plan requires definition, comparison, and contextual coverage", () => {
  const correct = evaluateEvidencePlan(["define", "comparison", "contexts"]);
  assert.equal(correct.complete, true);

  const anecdotal = evaluateEvidencePlan(["feed", "poll"]);
  assert.equal(anecdotal.complete, false);
  assert.ok(anecdotal.mismatches.length >= 3);
});

test("reasoning evaluation accepts only the calibrated map", () => {
  assert.equal(evaluateReasoningSelection({
    evidence: "systematic",
    criterion: "capacity",
    alternative: "adaptation",
    conclusion: "qualified"
  }).complete, true);

  const result = evaluateReasoningSelection({
    evidence: "anecdotes",
    criterion: "older",
    alternative: "",
    conclusion: "collapse"
  });
  assert.equal(result.complete, false);
  assert.deepEqual(result.missing, ["alternative"]);
  assert.deepEqual(result.mismatches.sort(), ["conclusion", "criterion", "evidence"]);
});
