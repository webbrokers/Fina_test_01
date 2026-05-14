'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-accordion-target]');
    if (!trigger) return;

    const id = trigger.getAttribute('data-accordion-target');
    const panel = id ? document.getElementById(id) : null;
    if (!panel) return;

    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    panel.hidden = expanded;
  });
});
