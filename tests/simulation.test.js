import test from "node:test";
import assert from "node:assert/strict";
import { adoptionSeries, buildNetwork, simulateDiffusion } from "../modules/language-change/simulation.js";

test("network generation is deterministic and contains no duplicate edges", () => {
  const first = buildNetwork({ pattern: "clustered", seed: 42 });
  const second = buildNetwork({ pattern: "clustered", seed: 42 });
  assert.deepEqual(first, second);
  assert.equal(first.nodes.length, 24);
  const keys = first.edges.map(({ a, b }) => `${a}-${b}`);
  assert.equal(new Set(keys).size, keys.length);
});

test("diffusion never reverses adoption and retains initial innovators", () => {
  const network = buildNetwork({ pattern: "bridged" });
  const result = simulateDiffusion(network, { innovators: 3, threshold: 0.34, rounds: 8 });
  const sizes = result.history.map(round => round.size);
  assert.equal(sizes[0], 3);
  for (let index = 1; index < sizes.length; index += 1) {
    assert.ok(sizes[index] >= sizes[index - 1]);
  }
  assert.equal(sizes.length, 9);
});

test("adoption series reports shares using the network size", () => {
  const history = [new Set([0]), new Set([0, 1, 2])];
  assert.deepEqual(adoptionSeries(history, 4), [
    { round: 0, count: 1, share: 0.25 },
    { round: 1, count: 3, share: 0.75 }
  ]);
});
