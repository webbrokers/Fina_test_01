# CHANGELOG.md — История изменений v1 → v2

**Страница:** `zajmy-s-plohoj-kreditnoj-istoriej/`  
**Репозиторий:** `webbrokers/Fina_test_01`

---

## v1 — Эталонная копия (10.05.2026)

**Статус:** ✅ Заморожена, не изменяется  
**URL:** https://webbrokers.github.io/Fina_test_01/v1/collection/zajmy-s-plohoj-kreditnoj-istoriej/  
**PageSpeed мобайл:** 32

### Что сделано при создании v1
- Страница скачана через `wget --mirror` (85 файлов темы и плагинов)
- Скачаны все картинки МФО из `wp-content/uploads` (94 файла)
- Исправлен lazyload: `data-src` → `src`, все пути локализованы (151 замена)
- Скачан `icons.svg` (SVG-спрайт, 43 КБ), 502 `xlink:href` переведены на локальные пути
- Все ресурсы (CSS, JS, шрифты, картинки) — локальные, без обращений к finabank.ru

### Известные отличия от оригинала
- PageSpeed 32 vs 36 у оригинала — GitHub Pages не имеет CDN finabank
- WordPress AJAX-функции не работают (лайки, комментарии, геотаргетинг) — это ожидаемо
- `ajax-load-more` не подгружает дополнительные карточки (нет бэкенда)

---

## v2 — Оптимизированная версия (в работе)

**Статус:** 🔄 В разработке  
**URL:** https://webbrokers.github.io/Fina_test_01/v2/collection/zajmy-s-plohoj-kreditnoj-istoriej/  
**Цель PageSpeed мобайл:** ≥70  
**Создана:** 10.05.2026, клон v1

### Лог изменений

> *Каждое изменение добавляется сюда в формате:*
> ```
> ### [дата] Название изменения
> **Файлы:** список изменённых файлов
> **Что изменено:** описание
> **Ожидаемый эффект:** что должно улучшиться
> **Результат PageSpeed до:** XX
> **Результат PageSpeed после:** XX (заполняется после теста)
> ```

---

## Сравнительная таблица v1 vs v2

| Параметр | v1 (эталон) | v2 (цель) | Изменение |
|----------|-------------|-----------|-----------|
| Performance | 32 🔴 | ≥70 🟢 | +38 |
| FCP | 4.0s | <1.8s | -2.2s |
| LCP | 34.1s | <2.5s | -31.6s |
| TBT | — | <200ms | — |
| JS-файлов в `<head>` | ~17 blocking | 0 | -17 |
| Лишних библиотек | ~3-4 | 0 | убраны |
| Accessibility | 64 | ≥80 | +16 |
| SEO | 83 | ≥90 | +7 |

> *Колонка v2 заполняется по мере внесения изменений*

---

*Файл ведётся параллельно с разработкой. Каждый коммит в v2/ должен отражаться здесь.*

### v2.1 (10.05.2026) — Оптимизация Блоки 1-4
**Коммит:** `64d54e9`

| Изменение | Файл | Что сделано |
|-----------|------|-------------|
| Preload LCP | `index.html` | `<link rel="preload">` для Screenshot_1-1.png с `fetchpriority="high"` |
| Preconnect | `index.html` | Добавлен preconnect для static.addtoany.com |
| Defer JS | `index.html` | jQuery, jquery-migrate(закомментирован), cookie.js, wt-location.js перенесены в конец body с defer |
| Убран lazyload | `index.html` | Удалён preload-link и тег lazyload.min.js |
| Дубль CSS | `index.html` | Удалён finbank_theme-style-css (дубль style.css) |
| Slick локально | `index.html` + файлы | Скачаны slick.css, slick-theme.css, slick.min.js; CDN-ссылки заменены на локальные |
| font-display | `style.css` | Проверено: уже содержит `font-display: swap` для всех шрифтов Lato ✅ |
| width/height | `index.html` | Добавлены 420x264 для карточек МФО, 40x40 для логотипов навигации |
| aria-label | `index.html` | 80 кнопок `.btn__compare` получили `aria-label="Сравнить"` |
| Alt-тексты | `index.html` | Логотипы банков в навигации получили alt с названиями |


### v2.2 (10.05.2026) — Оптимизация изображений, lazy load, скрипты

| Изменение | Детали |
|-----------|--------|
| WebP конвертация | 74 картинок PNG/JPG → WebP, ресайз до max 800px |
| Lazy loading | loading="lazy" добавлен ко всем img кроме первых 5 |
| Удалены скрипты | test.js, fslightbox_pro.js, jquery-migrate |
| Геотаргетинг | cookie.js + wt-location.js загружаются только по клику на выбор города |
