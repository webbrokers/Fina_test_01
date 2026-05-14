/**
 * Переключение cards / horisont
 */
function initLayoutToggle() {
  const horisBtns = document.querySelectorAll('.horisont-butt');
  const cardsBtns = document.querySelectorAll('.cards-butt');
  const listPosts = document.querySelectorAll('.list_posts');

  function setLayout(layout) {
    if (layout === 'horisont') {
      horisBtns.forEach((el) => el.classList.add('active'));
      cardsBtns.forEach((el) => el.classList.remove('active'));
      listPosts.forEach((el) => {
        el.classList.add('horisont');
        el.classList.remove('cards');
      });
    } else {
      cardsBtns.forEach((el) => el.classList.add('active'));
      horisBtns.forEach((el) => el.classList.remove('active'));
      listPosts.forEach((el) => {
        el.classList.add('cards');
        el.classList.remove('horisont');
      });
    }

    try {
      localStorage.setItem('layout', layout);
    } catch (e) {
      // ignore
    }
  }

  try {
    const saved = localStorage.getItem('layout');
    if (saved) setLayout(saved);
  } catch (e) {
    // ignore
  }

  horisBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      setLayout('horisont');
    });
  });

  cardsBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      setLayout('cards');
    });
  });
}
