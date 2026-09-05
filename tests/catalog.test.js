import test from "node:test";
import assert from "node:assert/strict";
import { filterModules, getModules, moduleCategories, modules } from "../modules/catalog.js";

test("catalog exposes the language-change module and a valid category", () => {
  assert.equal(modules.length, 1);
  assert.equal(modules[0].id, "language-change");
  assert.ok(moduleCategories.some(category => category.id === modules[0].category));
});

test("catalog filtering searches concepts and respects category", () => {
  assert.equal(filterModules({ query: "social networks" }).length, 1);
  assert.equal(filterModules({ query: "parsing" }).length, 0);
  assert.equal(filterModules({ category: "change-society" }).length, 1);
  assert.deepEqual(getModules().map(module => module.sequence), [1]);
});
