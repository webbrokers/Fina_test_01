/**
 * v7 Main Entry Point
 */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof initTabs === 'function') initTabs();
  if (typeof initTagsScroll === 'function') initTagsScroll();
  if (typeof initLayoutToggle === 'function') initLayoutToggle();
  if (typeof initFilterModal === 'function') initFilterModal();
  if (typeof initCalcModal === 'function') initCalcModal();
  if (typeof initLoadMore === 'function') initLoadMore();
});
