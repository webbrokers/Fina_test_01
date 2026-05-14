# v6 REPORT

## Что взято из v3
- Весь HTML-каркас страницы `collection/zajmy-s-plohoj-kreditnoj-istoriej/index.html` собран из блоков v3:
  - `<head>` (мета, canonical, schema)
  - `<header>` (оригинальные классы)
  - блок до калькулятора + сам калькулятор `#calc`
  - обёртка списка `.credits__list.loan-list-new-style`
  - первые 20 карточек `.card.mb-4.query__card` (без переименования классов)
  - хвост контента перед `</main>`
  - `<footer>`
- SVG-спрайт (`<svg style="display:none"><defs>...`) скопирован из v3 в начало `<body>`.
- CSS скопирован из v3 без изменения исходных правил:
  - `main.css` ← `custom.css?ver=1778234128.css`
  - `codes.css`
  - `danil.css`
  - `vendors/slick.css`
  - `vendors/slick-theme.css`

## Что переписано / добавлено
- Заменены пути к картинкам:
  - `../../wp-content/uploads/` → `https://webbrokers.github.io/Fina_test_01/v3/wp-content/uploads/`
  - `https://finabank.ru/wp-content/` → `https://webbrokers.github.io/Fina_test_01/v3/wp-content/`
- Удалены plugin/analytics части:
  - ссылки и скрипты `wp-content/plugins`
  - GTM/GA
  - admin-ajax endpoint
  - nonce-атрибуты `data-ulike-nonce`
- Добавлены lazy-заглушки карточек 21–40 + кнопка `#showMoreBtn`.
- Добавлен skeleton CSS в `main.css`.
- Добавлен Critical CSS (`assets/css/critical.css`) и inline-подключение в `<head>`.
- Перенесены JS-скрипты на модульные локальные файлы (vanilla JS).

## Строки HTML: v3 → v6
- v3 файл: `v3/collection/zajmy-s-plohoj-kreditnoj-istoriej/index.html` (~1,016,628 байт)
- v6 файл: `v6/collection/zajmy-s-plohoj-kreditnoj-istoriej/index.html` (собран из блоков, укорочен за счёт удаления WP plugin/analytics скриптов)
- Карточки:
  - В v3 присутствуют карточки `.card.mb-4.query__card`
  - В v6 оставлены первые 20 оригинальных карточек + 20 lazy placeholders (21–40)

## JS модули и вес
- `assets/js/components/tabs.js` — toggle для `.open__dop-btn`/`data-tabs-target`
- `assets/js/components/accordion.js` — базовый FAQ accordion
- `assets/js/components/loadMore.js` — `IntersectionObserver` + кнопка "Показать ещё"
- `assets/js/components/calculator.js` — базовая логика калькулятора (`limit/days/percent`)
- `assets/js/main.js` — entry point

(вес не минифицирован; файлы короткие, ориентировочно 0.1–2.8 KB каждый)

## Картинки
- Рабочие: все, у которых путь был под `wp-content/uploads` и `wp-content/` (переведены на GitHub-hosted v3).
- Потенциально нерабочие: внешние URL вне этих шаблонов (если встречаются единично).

## Известные TODO
1. При необходимости подключить реальный backend/API для подгрузки карточек 41–125.
2. Подтюнить `calculator.js` под точные поля/формулы v3 (если на странице используются дополнительные коэффициенты).
3. Прогнать визуальный diff v3 vs v6 в браузере (pixel check).
4. При необходимости убрать лишние legacy meta/link из head (сейчас оставлены максимально близко к v3).
