'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open__dop-btn');
    if (!btn) return;

    const targetId = btn.dataset.tabsTarget;
    if (!targetId) return;

    const tabsEl = document.getElementById(targetId);
    if (!tabsEl) return;

    const isOpen = tabsEl.getAttribute('aria-hidden') === 'false';
    tabsEl.setAttribute('aria-hidden', isOpen ? 'true' : 'false');

    btn.classList.toggle('is-open', !isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

    const textEl = btn.querySelector('.open__dop-btn-text');
    if (textEl) {
      textEl.textContent = isOpen ? (btn.dataset.open || 'Подробнее') : (btn.dataset.close || 'Скрыть');
    }
  });
});
