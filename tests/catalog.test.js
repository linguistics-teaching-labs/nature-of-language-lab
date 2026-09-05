import test from "node:test";
import assert from "node:assert/strict";
import { filterModules, getModules, moduleCategories, modules } from "../modules/catalog.js";

test("catalog exposes one available module and six valid proposals", () => {
  assert.equal(modules.length, 7);
  assert.equal(modules[0].id, "language-change");
  assert.equal(modules.filter(module => module.status === "available").length, 1);
  assert.equal(modules.filter(module => module.status === "proposed").length, 6);
  for (const module of modules) {
    assert.ok(moduleCategories.some(category => category.id === module.category));
    assert.equal(module.status === "available", Boolean(module.href));
  }
});

test("catalog filtering searches concepts and respects category", () => {
  assert.equal(filterModules({ query: "social networks" }).length, 1);
  assert.equal(filterModules({ query: "parsing" }).length, 0);
  assert.equal(filterModules({ query: "gender ideology" }).length, 1);
  assert.equal(filterModules({ category: "change-society" }).length, 2);
  assert.deepEqual(getModules().map(module => module.sequence), [1, 2, 3, 4, 5, 6, 7]);
});
