import test from "node:test";
import assert from "node:assert/strict";
import { claims } from "../modules/claim-evidence/data.js";
import { evaluateConclusion, evaluateEvidence, evaluateTest, stressScore } from "../modules/claim-evidence/logic.js";

test("claim test requires measure, comparison, and coverage", () => {
  const claim = claims[0];
  assert.equal(evaluateTest({ measure: "0", comparison: "0", coverage: "0" }, claim.answers).correct, true);
  assert.equal(evaluateTest({ measure: "0", comparison: "1", coverage: "0" }, claim.answers).correct, false);
});

test("evidence matching excludes merely illustrative items", () => {
  const claim = claims[0];
  assert.equal(evaluateEvidence(["task", "comparison", "coverage"], claim.evidence).correct, true);
  assert.equal(evaluateEvidence(["task", "comparison", "coverage", "story"], claim.evidence).correct, false);
});

test("alternative explanations lower only the teaching heuristic", () => {
  const claim = claims[0];
  assert.equal(stressScore([], claim.alternatives), 90);
  assert.equal(stressScore(["culture", "translation"], claim.alternatives), 52);
  assert.equal(evaluateConclusion("qualified", claim.correctConclusion), true);
});
