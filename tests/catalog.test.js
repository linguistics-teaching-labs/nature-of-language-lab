import test from "node:test";
import assert from "node:assert/strict";
import { filterModules, getModules, moduleCategories, modules } from "../modules/catalog.js";

test("catalog exposes nine available modules", () => {
  assert.equal(modules.length, 9);
  assert.equal(modules[0].id, "language-change");
  assert.equal(modules.filter(module => module.status === "available").length, 9);
  assert.equal(modules.filter(module => module.status === "proposed").length, 0);
  for (const module of modules) {
    assert.ok(moduleCategories.some(category => category.id === module.category));
    assert.equal(module.status === "available", Boolean(module.href));
    assert.equal(module.concepts.length, 3);
    assert.ok(module.description.split(/\s+/).length >= 12);
    assert.ok(module.description.split(/\s+/).length <= 22);
  }
});

test("catalog filtering searches concepts and respects category", () => {
  assert.equal(filterModules({ query: "digital cues" }).length, 1);
  assert.equal(filterModules({ query: "parsing" }).length, 0);
  assert.equal(filterModules({ query: "gender ideology" }).length, 1);
  assert.equal(filterModules({ category: "change-society" }).length, 3);
  assert.equal(filterModules({ category: "evidence-reasoning" }).length, 1);
  assert.deepEqual(getModules().map(module => module.sequence), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
