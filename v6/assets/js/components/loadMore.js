'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.js-lazy-card'));
  const btn = document.getElementById('showMoreBtn');
  if (!cards.length) return;

  const revealCard = (card) => {
    card.classList.remove('js-lazy-card');
    const content = card.querySelector('.item-content');
    if (content) {
      content.classList.remove('skeleton-pulse');
      if (!content.innerHTML.trim()) {
        content.innerHTML = '<div class="item-about"><div class="item-info">Данные загружаются…</div></div>';
      }
    }
  };

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealCard(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px 0px' })
    : null;

  cards.forEach((card, i) => {
    if (observer) observer.observe(card);
    if (i < 5) revealCard(card);
  });

  if (btn) {
    btn.addEventListener('click', () => {
      cards.forEach(revealCard);
      btn.remove();
    });
  }
});
