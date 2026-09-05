import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pages = [
  "index.html",
  "modules/language-change/index.html",
  "modules/animal-communication/index.html",
  "modules/language-thought/index.html",
  "modules/language-comparison/index.html",
  "modules/spelling-reform/index.html",
  "modules/english-variation/index.html",
  "modules/language-gender/index.html",
  "modules/digital-tone/index.html",
  "modules/claim-evidence/index.html",
  "modules/speech-sounds/index.html",
  "modules/word-structure/index.html",
  "modules/sentence-structure/index.html",
  "modules/meaning-context/index.html"
];

function html(path) {
  return readFileSync(resolve(root, path), "utf8");
}

test("HTML pages have core metadata and unique IDs", () => {
  for (const page of pages) {
    const content = html(page);
    assert.match(content, /<html lang="en">/);
    assert.match(content, /name="viewport"/);
    assert.match(content, /name="description"/);
    const ids = [...content.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page} contains duplicate IDs`);
  }
});

test("all local stylesheet and script references resolve", () => {
  for (const page of pages) {
    const content = html(page);
    const references = [...content.matchAll(/(?:href|src)="([^"]+)"/g)]
      .map(match => match[1].split("?")[0])
      .filter(reference => reference && !reference.startsWith("http") && !reference.startsWith("#"));
    for (const reference of references) {
      const target = resolve(root, dirname(page), reference);
      assert.ok(existsSync(target), `${page} references missing file ${reference}`);
    }
  }
});

test("activity selectors resolve to elements in the module page", () => {
  for (const module of ["language-change", "animal-communication", "language-thought", "language-comparison", "spelling-reform", "english-variation", "language-gender", "digital-tone", "claim-evidence", "speech-sounds", "word-structure", "sentence-structure", "meaning-context"]) {
    const script = readFileSync(resolve(root, `modules/${module}/activity.js`), "utf8");
    const content = html(`modules/${module}/index.html`);
    const selectors = [...script.matchAll(/(?:querySelector|\$)\("#([^"]+)"\)/g)].map(match => match[1]);
    for (const selector of new Set(selectors)) {
      assert.match(content, new RegExp(`id="${selector}"`), `${module} is missing #${selector}`);
    }
  }
});

test("public pages do not load third-party scripts or collect submissions", () => {
  for (const page of pages) {
    const content = html(page);
    assert.doesNotMatch(content, /<script[^>]+src="https?:/);
    assert.doesNotMatch(content, /<form\b/i);
  }
});
