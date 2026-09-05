import { claimNeeds } from "./data.js";

export function evaluateEvidencePlan(selectedIds) {
  const selected = new Set(selectedIds);
  const mismatches = claimNeeds.filter(item => selected.has(item.id) !== item.needed);
  return {
    complete: mismatches.length === 0,
    mismatches
  };
}

export function evaluateReasoningSelection(selection) {
  const expected = {
    evidence: "systematic",
    criterion: "capacity",
    alternative: "adaptation",
    conclusion: "qualified"
  };
  const missing = Object.entries(selection)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  const mismatches = Object.entries(expected)
    .filter(([key, value]) => selection[key] && selection[key] !== value)
    .map(([key]) => key);
  return {
    complete: missing.length === 0 && mismatches.length === 0,
    missing,
    mismatches
  };
}
