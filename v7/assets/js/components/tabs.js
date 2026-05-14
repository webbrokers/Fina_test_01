/**
 * Табы в карточках МФО
 * Оригинальная логика: .open__dop-btn + data-tabs-target
 */
function initTabs() {
  document.addEventListener('click', function (event) {
    const btn = event.target.closest('.open__dop-btn');
    if (!btn) return;

    event.stopPropagation();

    const tabsTarget = btn.getAttribute('data-tabs-target');
    const parent = btn.closest('.tabs-and-btns');

    let tabs;
    if (tabsTarget) {
      tabs = document.getElementById(tabsTarget);
    } else if (parent) {
      tabs = parent.parentElement.querySelector('.tabs');
    }

    if (!tabs) return;

    const isVisible = tabs.style.display !== 'none' && tabs.offsetParent !== null;

    document.querySelectorAll('.tabs').forEach((t) => {
      t.style.display = 'none';
    });
    document.querySelectorAll('.open__dop-btn').forEach((b) => {
      b.classList.remove('active');
    });

    if (!isVisible) {
      tabs.style.display = 'block';
      btn.classList.add('active');
    }
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.new-tab-content, .open__dop-btn')) {
      document.querySelectorAll('.tabs').forEach((t) => {
        t.style.display = 'none';
      });
      document.querySelectorAll('.open__dop-btn').forEach((b) => {
        b.classList.remove('active');
      });
    }
  });

  document.addEventListener('click', function (event) {
    const tabItem = event.target.closest('.tab-item');
    if (!tabItem) return;

    const parent = tabItem.closest('.new-tab-content');
    const tabId = tabItem.getAttribute('data-tab');
    const content = document.getElementById(tabId);

    if (!parent || !content) return;

    parent.querySelectorAll('.tab-item.active').forEach((el) => el.classList.remove('active'));
    parent.querySelectorAll('.tab-pane.active').forEach((el) => el.classList.remove('active'));

    tabItem.classList.add('active');
    content.classList.add('active');
  });
}
