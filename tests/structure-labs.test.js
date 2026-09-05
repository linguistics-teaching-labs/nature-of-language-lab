import test from "node:test";
import assert from "node:assert/strict";
import { contrastSets, phonotacticData, sounds } from "../modules/speech-sounds/data.js";
import { contrastClassificationCorrect, featuresMatch, obeysSingleOnset, predictionCorrect } from "../modules/speech-sounds/logic.js";
import { pluralChallenges, wugCases } from "../modules/word-structure/data.js";
import { makeTurkishPlural, pluralPredictionCorrect, turkishPluralSuffix, wugPredictionCorrect } from "../modules/word-structure/logic.js";
import { ambiguityCases, judgmentCases, testCases } from "../modules/sentence-structure/data.js";
import { ambiguityReadingCorrect, constituencyTestCorrect, judgmentCorrect } from "../modules/sentence-structure/logic.js";
import { contextCases, diagnosticCases, relationCases } from "../modules/meaning-context/data.js";
import { contextInterpretationCorrect, diagnosticCorrect, relationCorrect } from "../modules/meaning-context/logic.js";

test("speech-sound analysis distinguishes features, contrast, and sequencing", () => {
  assert.equal(featuresMatch(sounds[0].features, sounds[0]), true);
  assert.equal(contrastClassificationCorrect("contrast", contrastSets[0]), true);
  assert.equal(contrastClassificationCorrect("predictable", contrastSets[1]), true);
  assert.equal(obeysSingleOnset("nif"), true);
  assert.equal(obeysSingleOnset("bnif"), false);
  assert.equal(predictionCorrect("nif", phonotacticData), true);
  for (const item of phonotacticData.candidates) assert.equal(obeysSingleOnset(item.text), item.allowed);
});

test("morphological rules extend to regular and novel forms", () => {
  assert.equal(turkishPluralSuffix("müzik"), "ler");
  assert.equal(makeTurkishPlural("robot"), "robotlar");
  for (const item of pluralChallenges) assert.equal(pluralPredictionCorrect(item.answer, item), true);
  for (const item of wugCases) assert.equal(wugPredictionCorrect(item.answer, item), true);
});

test("syntax tasks keep structure, constituency, and judgment aligned", () => {
  for (const item of ambiguityCases) {
    assert.ok(item.readings.some(reading => reading.id === item.answer));
    assert.equal(ambiguityReadingCorrect(item.answer, item), true);
  }
  for (const item of testCases) assert.equal(constituencyTestCorrect(item.answer, item), true);
  for (const item of judgmentCases) assert.equal(judgmentCorrect(item.answer, item), true);
});

test("meaning diagnostics distinguish encoded and inferred content", () => {
  for (const item of relationCases) assert.equal(relationCorrect(item.answer, item), true);
  for (const item of diagnosticCases) assert.equal(diagnosticCorrect(item.answer, item), true);
  for (const item of contextCases) assert.equal(contextInterpretationCorrect(item.answer, item), true);
});
