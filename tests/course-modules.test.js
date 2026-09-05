import test from "node:test";
import assert from "node:assert/strict";
import { systems } from "../modules/animal-communication/data.js";
import { compareSystems, evidencePlanCorrect, featureCounts } from "../modules/animal-communication/logic.js";
import { cases, claimLevels } from "../modules/language-thought/data.js";
import { claimIsCalibrated, confidenceScore, overreach } from "../modules/language-thought/logic.js";
import { profiles, weightSets } from "../modules/language-comparison/data.js";
import { weightedComplexity } from "../modules/language-comparison/logic.js";
import { baseScores, reforms, sampleText } from "../modules/spelling-reform/data.js";
import { reformScores, transformText } from "../modules/spelling-reform/logic.js";
import { ideologyItems, ruleCases } from "../modules/english-variation/data.js";
import { ideologySetCorrect, ruleCorrect } from "../modules/english-variation/logic.js";
import { contexts, features, relationships } from "../modules/language-gender/data.js";
import { functionProfile } from "../modules/language-gender/logic.js";

test("animal communication evidence stays feature-specific", () => {
  assert.equal(featureCounts(systems[0]).clear, 5);
  assert.ok(compareSystems(systems[0], systems[1]).some(row => !row.same));
  const items = [{ id: "a", required: true }, { id: "b", required: false }];
  assert.equal(evidencePlanCorrect(["a"], items), true);
});

test("language-and-thought claims are calibrated below determinism", () => {
  assert.equal(claimIsCalibrated("influence", cases[0].warranted), true);
  assert.equal(overreach("determine", cases[0].warranted, claimLevels), true);
  assert.ok(confidenceScore(["task"], cases[0].alternatives) < 90);
});

test("complexity ranking depends on the selected definition", () => {
  const equal = profiles.map(profile => weightedComplexity(profile, weightSets[0]));
  const wordHeavy = profiles.map(profile => weightedComplexity(profile, weightSets[1]));
  assert.ok(equal[0] < equal[1]);
  assert.ok(wordHeavy[0] > wordHeavy[1]);
});

test("spelling rules transform only selected examples and expose trade-offs", () => {
  const transformed = transformText(sampleText, ["silent", "ough"], reforms);
  assert.match(transformed, /I no/);
  assert.match(transformed, /enuf/);
  assert.ok(reformScores(["ough"], reforms, baseScores).Learnability > baseScores.Learnability);
  assert.ok(reformScores(["ough"], reforms, baseScores).Readability < baseScores.Readability);
});

test("dialect analysis distinguishes a rule from ideology", () => {
  assert.equal(ruleCorrect("habit", ruleCases[0]), true);
  assert.equal(ideologySetCorrect(["logic", "accentless", "intelligence"], ideologyItems), true);
});

test("form-function profiles normalize and respond to context", () => {
  const first = functionProfile(features[0], contexts[0], relationships[0]);
  const second = functionProfile(features[0], contexts[3], relationships[2]);
  assert.equal(Object.values(first).reduce((sum, value) => sum + value, 0), 100);
  assert.notDeepEqual(first, second);
});
