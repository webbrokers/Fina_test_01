# REPORT — v7 реализация

Дата: 2026-05-14

## Что сделано

### 1) Создана структура `v7/`
- `v7/index.html` (редирект на collection)
- `v7/collection/zajmy-s-plohoj-kreditnoj-istoriej/index.html`
- `v7/assets/css/*`, `v7/assets/js/*`, `v7/assets/img/*`
- `v7/wp-theme/*`

### 2) CSS скопирован из v3 (без переписывания)
Скопированы файлы:
- `custom.css?ver=1778234128.css` → `v7/assets/css/main.css`
- `style.css?ver=1778234128.css` → `v7/assets/css/style.css`
- `codes.css?ver=1778234128.css` → `v7/assets/css/codes.css`
- `danil.css?ver=1778234128.css` → `v7/assets/css/danil.css`
- `slick.css` → `v7/assets/css/vendors/slick.css`
- `slick-theme.css` → `v7/assets/css/vendors/slick-theme.css`

### 3) Favicon и SVG спрайт
- Скопированы favicons в `v7/assets/img/favicons/`
- Скопирован `icons.svg` в:
  - `v7/assets/img/icons.svg`
  - `v7/wp-theme/assets/img/icons.svg`
- В `index.html` оставлен inline SVG-спрайт в начале `<body>` (как в v3)

### 4) HTML страницы v7
- Базой взят оригинальный HTML из `v3/collection/.../index.html`
- Обновлён `<head>` под v7:
  - Lato font
  - canonical на v7
  - CSS подключается из `../../assets/css/*`
- Сохранены оригинальные классы карточек и блоков:
  - `.card.mb-4.query__card`, `.item-content`, `.item-about`, `.item-image`, `.item-column`, `.item-buttons`, `.open__dop-btn`, `.credits__list.loan-list-new-style`
- Все пути к ресурсам `../../wp-content/` и `../../wp-includes/` переведены в абсолютные URL вида:
  - `https://webbrokers.github.io/Fina_test_01/v3/wp-content/...`
  - `https://webbrokers.github.io/Fina_test_01/v3/wp-includes/...`

### 5) JavaScript модули созданы
- `v7/assets/js/components/tabs.js`
- `v7/assets/js/components/calculator.js`
- `v7/assets/js/components/loadMore.js`
- `v7/assets/js/components/filter.js`
- `v7/assets/js/components/tags-scroll.js`
- `v7/assets/js/components/layout-toggle.js`
- `v7/assets/js/main.js`

И подключены внизу страницы перед `</body>`.

### 6) Реализовано поведение
- Табы через `.open__dop-btn + data-tabs-target`
- Калькулятор (базовый расчёт и синхронизация range/text)
- Фильтр и модалка калькулятора
- Горизонтальный скролл тегов
- Переключение cards/horisont
- Lazy load: первые 20 карточек сразу, остальные через кнопку/IntersectionObserver
  - На странице 40 карточек (из оригинала)
  - Кнопка `#showMoreBtn` создаётся скриптом, если отсутствует в HTML

### 7) WordPress шаблон в `v7/wp-theme/`
Созданы файлы:
- `style.css`
- `functions.php`
- `page-collection.php`
- `template-parts/card-mfo.php`
- `template-parts/calculator.php`
- `template-parts/filter-modal.php`

Скопированы assets:
- `cp -r v7/assets/* v7/wp-theme/assets/`

## Проверки

Быстрые проверки по коду:
- Найдено карточек `.card.mb-4.query__card`: **40**
- Ключевые контейнеры и классы присутствуют
- `open__dop-btn` и `tabs-more-*` присутствуют
- `new-calc-modal` присутствует
- Абсолютные пути к `v3/wp-content` и `v3/wp-includes` выставлены

## Примечания
- Из-за требования «не придумывать классы» и «копировать CSS как есть», за основу взят оригинальный HTML v3 с минимальными правками путей/подключений под v7.
- Для Lazy Load использован JS-слой без изменения структуры карточек.
