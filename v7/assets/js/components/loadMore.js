/**
 * Lazy load карточек
 * Показываем 20 сразу, остальное по кнопке/скроллу
 */
function initLoadMore() {
  const container = document.getElementById('response-cred-card');
  if (!container) return;

  let showMoreBtn = document.getElementById('showMoreBtn');
  if (!showMoreBtn) {
    showMoreBtn = document.createElement('button');
    showMoreBtn.id = 'showMoreBtn';
    showMoreBtn.className = 'load-daha load_more_btn btn btn-outline-primary';
    showMoreBtn.textContent = 'Показать ещё';
    const creditsList = container.closest('.credits__list');
    if (creditsList) creditsList.appendChild(showMoreBtn);
  }

  const allCards = Array.from(container.querySelectorAll('.card.mb-4.query__card'));
  if (!allCards.length) {
    showMoreBtn.style.display = 'none';
    return;
  }

  const initialCount = 20;
  const batchSize = 20;
  let currentCount = Math.min(initialCount, allCards.length);

  allCards.forEach((card, index) => {
    if (index >= initialCount) {
      card.style.display = 'none';
      card.classList.add('lazy-card');
    }
  });

  function updateCounter() {
    document.querySelectorAll('.variants_count').forEach((el) => {
      el.textContent = String(currentCount);
    });
  }

  function showMoreCards() {
    const hiddenCards = Array.from(container.querySelectorAll('.lazy-card'));
    let shown = 0;

    hiddenCards.forEach((card) => {
      if (shown < batchSize) {
        card.style.display = '';
        card.classList.remove('lazy-card');
        shown += 1;
      }
    });

    currentCount = container.querySelectorAll('.card.mb-4.query__card:not(.lazy-card)').length;
    updateCounter();

    if (!container.querySelector('.lazy-card')) {
      showMoreBtn.style.display = 'none';
    }
  }

  updateCounter();

  if (!container.querySelector('.lazy-card')) {
    showMoreBtn.style.display = 'none';
    return;
  }

  showMoreBtn.addEventListener('click', showMoreCards);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showMoreCards();
      }
    });
  }, { rootMargin: '200px' });

  observer.observe(showMoreBtn);
}
