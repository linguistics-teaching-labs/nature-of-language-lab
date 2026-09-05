export function ruleCorrect(selected, activeCase) { return selected === activeCase.correct; }
export function classificationCorrect(selected, activeCase) { return selected === activeCase.answer; }
export function ideologySetCorrect(selected, items) { return items.every(item => item.ideology === selected.includes(item.id)); }
export function conclusionCorrect(id) { return id === "systematic"; }
