function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function edgeKey(a, b) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

export function buildNetwork({ pattern = "clustered", size = 24, seed = 100 } = {}) {
  const random = seededRandom(seed + (pattern === "bridged" ? 1000 : 0));
  const groupSize = Math.max(4, Math.floor(size / 4));
  const nodes = Array.from({ length: size }, (_, id) => ({
    id,
    group: Math.min(3, Math.floor(id / groupSize))
  }));
  const edges = [];
  const seen = new Set();

  const addEdge = (a, b) => {
    if (a === b) return;
    const key = edgeKey(a, b);
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ a: Math.min(a, b), b: Math.max(a, b) });
  };

  if (pattern === "clustered") {
    for (let group = 0; group < 4; group += 1) {
      const start = group * groupSize;
      const end = Math.min(start + groupSize, size);
      for (let id = start; id < end; id += 1) addEdge(id, id + 1 < end ? id + 1 : start);
    }
    for (let group = 0; group < 3; group += 1) addEdge(group * groupSize, (group + 1) * groupSize);
  } else {
    for (let id = 0; id < size; id += 1) addEdge(id, (id + 1) % size);
    for (let group = 0; group < 4; group += 1) addEdge(group * groupSize, ((group + 2) % 4) * groupSize + 1);
  }

  for (let a = 0; a < size; a += 1) {
    for (let b = a + 1; b < size; b += 1) {
      const sameGroup = nodes[a].group === nodes[b].group;
      const probability = pattern === "clustered"
        ? (sameGroup ? 0.46 : 0.015)
        : (sameGroup ? 0.18 : 0.11);
      if (random() < probability) addEdge(a, b);
    }
  }

  return { nodes, edges, pattern };
}

export function chooseInnovators(count, size = 24) {
  const preferred = [0, 6, 12, 18, 3, 9, 15, 21];
  return new Set(preferred.filter(id => id < size).slice(0, Math.max(1, count)));
}

export function simulateDiffusion(network, { innovators = 2, threshold = 0.34, rounds = 8 } = {}) {
  const neighbors = new Map(network.nodes.map(node => [node.id, []]));
  for (const { a, b } of network.edges) {
    neighbors.get(a).push(b);
    neighbors.get(b).push(a);
  }

  let adopted = chooseInnovators(innovators, network.nodes.length);
  const history = [new Set(adopted)];

  for (let round = 0; round < rounds; round += 1) {
    const next = new Set(adopted);
    for (const node of network.nodes) {
      if (adopted.has(node.id)) continue;
      const contacts = neighbors.get(node.id);
      if (!contacts.length) continue;
      const share = contacts.filter(id => adopted.has(id)).length / contacts.length;
      if (share >= threshold) next.add(node.id);
    }
    adopted = next;
    history.push(new Set(adopted));
  }

  return { adopted, history, neighbors };
}

export function adoptionSeries(history, size) {
  return history.map((round, index) => ({
    round: index,
    count: round.size,
    share: round.size / size
  }));
}
