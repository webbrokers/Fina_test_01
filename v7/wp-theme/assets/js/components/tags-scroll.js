/**
 * Горизонтальный скролл тегов
 */
function initTagsScroll() {
  const wrapper = document.querySelector('.tags-list_wrapper');
  const prevBtn = document.querySelector('.tags-list_prev');
  const nextBtn = document.querySelector('.tags-list_next');

  if (!wrapper || !prevBtn || !nextBtn) return;

  const scrollAmount = 200;

  prevBtn.addEventListener('click', function () {
    wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}
