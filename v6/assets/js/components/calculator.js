'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calc');
  if (!calc) return;

  const inputs = Array.from(calc.querySelectorAll('input[type="range"][data-field]'));
  const valueInputs = Array.from(calc.querySelectorAll('input[type="text"][data-field]'));

  const getField = (name) => {
    const range = calc.querySelector(`input[type="range"][data-field="${name}"]`);
    return range ? Number(range.value || 0) : 0;
  };

  const updateProgress = (el) => {
    const min = Number(el.min || 0);
    const max = Number(el.max || 100);
    const val = Number(el.value || 0);
    const pct = max > min ? ((val - min) * 100) / (max - min) : 0;
    el.style.setProperty('--range-progress', `${Math.max(0, Math.min(100, pct))}%`);
  };

  const syncText = (field, value) => {
    const txt = calc.querySelector(`input[type="text"][data-field="${field}"]`);
    if (txt) txt.value = String(Math.round(value));
  };

  const render = () => {
    const amount = getField('limit');
    const days = getField('days') || getField('term');
    const rate = getField('percent') || 0.8;
    const overpay = (amount * rate / 100) * (days / 365);
    const total = amount + overpay;

    const overpayEl = calc.querySelector('[data-calc="overpay"]');
    const totalEl = calc.querySelector('[data-calc="total"]');
    if (overpayEl) overpayEl.textContent = Math.round(overpay).toLocaleString('ru-RU');
    if (totalEl) totalEl.textContent = Math.round(total).toLocaleString('ru-RU');
  };

  inputs.forEach((range) => {
    updateProgress(range);
    syncText(range.dataset.field, Number(range.value || 0));
    range.addEventListener('input', () => {
      updateProgress(range);
      syncText(range.dataset.field, Number(range.value || 0));
      render();
    });
  });

  valueInputs.forEach((txt) => {
    txt.addEventListener('change', () => {
      const field = txt.dataset.field;
      const range = calc.querySelector(`input[type="range"][data-field="${field}"]`);
      if (!range) return;
      const min = Number(range.min || 0);
      const max = Number(range.max || 1000000);
      const next = Math.max(min, Math.min(max, Number(txt.value.replace(/\s+/g, '')) || min));
      range.value = String(next);
      updateProgress(range);
      txt.value = String(Math.round(next));
      render();
    });
  });

  render();
});
