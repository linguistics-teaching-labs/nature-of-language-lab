import test from "node:test";
import assert from "node:assert/strict";
import { calculateReadings, formatMessage, strongestReading } from "../modules/digital-tone/logic.js";

const base = { message: "Sure", punctuation: "period", cue: "none", relationship: "friend", channel: "text" };

test("digital message formatting combines cues without stray spaces", () => {
  assert.equal(formatMessage(base), "Sure.");
  assert.equal(formatMessage({ ...base, punctuation: "exclamation", cue: "smile" }), "Sure! 🙂");
});

test("reading weights remain normalized and respond to context", () => {
  const friend = calculateReadings(base);
  const instructor = calculateReadings({ ...base, relationship: "instructor", channel: "email" });
  assert.equal(Object.values(friend).reduce((sum, value) => sum + value, 0), 100);
  assert.equal(Object.values(instructor).reduce((sum, value) => sum + value, 0), 100);
  assert.notDeepEqual(friend, instructor);
  assert.equal(strongestReading(instructor), "formal");
});
