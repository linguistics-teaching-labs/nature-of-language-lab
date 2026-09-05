export const $ = selector => document.querySelector(selector);

export function setFeedback(selector, correct, title, text) {
  const element = $(selector);
  element.hidden = false;
  element.className = `feedback-panel${correct ? "" : " needs-revision"}`;
  element.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
}

export function radioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value ?? "";
}

export function checkedValues(selector) {
  return [...$(selector).querySelectorAll("input:checked")].map(input => input.value);
}

export function optionCards(items, { name, type = "radio" } = {}) {
  return items.map(item => `<label class="option-card"><input type="${type}" name="${name}" value="${item.id}"><span>${item.title ? `<strong>${item.title}</strong>` : ""}${item.text}</span></label>`).join("");
}

export function selectOptions(items, placeholder = "Choose…") {
  return `<option value="">${placeholder}</option>${items.map(item => `<option value="${item.id}">${item.label}</option>`).join("")}`;
}

export function scoreRows(scores) {
  return Object.entries(scores).map(([label, value]) => `<div class="score-row"><span>${label}</span><div class="score-track"><div class="score-fill" style="width:${value}%"></div></div><span class="score-value">${value}</span></div>`).join("");
}
