# Отчёт v5

## Что сделано
- Создана структура `v5/` на базе v4 и доработана под требования v5.
- CSS подключён из v3 без изменений: `assets/css/main.css` (копия `v3/.../custom.css?ver=1778234128.css`).
- Vendors CSS скопированы из v3: `fancybox.css`, `slick.css`.
- Добавлен `critical.css` (выжимка начальных правил из main.css, inline-ready).
- HTML страницы в `v5/collection/.../index.html` обновлён до v5, сохранены рабочие классы и структура карточек (20 полных + 21+ skeleton).
- JS переписан и разложен по модулям Vanilla JS (tabs/accordion/filters/loadMore/themeToggle/calculator + main/utils).
- Формула калькулятора приведена к ТЗ: `переплата = сумма * 0.01 * срок`.
- WP-тема обновлена: enqueue, template, подключение ACF/CPT.

## Метрики
- HTML: 685 строк
- CSS (main.css): 10259 строк (источник: v3 custom.css без изменений)

## JS модули и размер

- `assets/js/components/accordion.js` — 30 B
- `assets/js/components/calculator.js` — 605 B
- `assets/js/components/filters.js` — 164 B
- `assets/js/components/loadMore.js` — 691 B
- `assets/js/components/tabs.js` — 551 B
- `assets/js/components/themeToggle.js` — 316 B
- `assets/js/main.js` — 145 B
- `assets/js/utils/debounce.js` — 106 B
- `assets/js/utils/dom.js` — 110 B

## Картинки
- Используются изображения/логотипы из v3 через абсолютные URL `https://webbrokers.github.io/Fina_test_01/v3/wp-content/uploads/...` (включая LCP-логотип).

## Что не доделано / TODO
- Для идеального pixel-perfect может потребоваться полный перенос точной вёрстки header/footer из исходного v3 DOM (сейчас взят clean-variant из v4 с v5-правками).
- Async/defer в WP можно дополнительно усилить через фильтр `script_loader_tag` для гарантии атрибутов во всех версиях WP.
