/**
 * Модальные окна: Фильтр и Калькулятор
 */
function initFilterModal() {
  const filtrBtn = document.querySelector('.filtr-butt');
  const filterModal = document.querySelector('.new-filter-modal');
  const filterClose = document.querySelector('.new-filter-modal-close');
  const filterSubmit = filterModal ? filterModal.querySelector('.submit-button') : null;

  if (filtrBtn && filterModal) {
    filtrBtn.addEventListener('click', function () {
      filterModal.classList.toggle('active');
    });

    if (filterClose) {
      filterClose.addEventListener('click', function () {
        filterModal.classList.remove('active');
      });
    }

    if (filterSubmit) {
      filterSubmit.addEventListener('click', function () {
        filterModal.classList.remove('active');
      });
    }
  }
}

function initCalcModal() {
  const calcBtn = document.querySelector('.calc-butt');
  const calcModal = document.querySelector('.new-calc-modal');
  const calcClose = document.querySelectorAll('.new-calc-close, .new-calc-btn-close');

  if (calcBtn && calcModal) {
    calcBtn.addEventListener('click', function () {
      calcModal.classList.toggle('active');
      initCalculator();
    });

    calcClose.forEach((btn) => {
      btn.addEventListener('click', function () {
        calcModal.classList.remove('active');
      });
    });
  }

  document.addEventListener('click', function (event) {
    if (calcModal && calcModal.classList.contains('active')) {
      if (!event.target.closest('.new-calc-content') && !event.target.closest('.calc-butt')) {
        calcModal.classList.remove('active');
      }
    }
  });
}
