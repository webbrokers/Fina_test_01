# AUDIT.md — SEO и Performance аудит страницы

**Страница:** `https://finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/`  
**Эталон (v1):** `https://webbrokers.github.io/Fina_test_01/v1/collection/zajmy-s-plohoj-kreditnoj-istoriej/`  
**Дата аудита:** 10.05.2026  
**Аудитор:** Джон (анализ HTML + файловой структуры) + ревью Гения

---

## 📊 Метрики PageSpeed (baseline v1, 10.05.2026)

| Метрика | Мобайл | Норма |
|---------|--------|-------|
| Performance | **32** 🔴 | ≥90 |
| First Contentful Paint | **4.0s** 🔴 | <1.8s |
| Largest Contentful Paint | **34.1s** 🔴 | <2.5s |
| Accessibility | **64** 🟡 | ≥90 |
| Best Practices | **96** 🟢 | ≥90 |
| SEO | **83** 🟡 | ≥90 |

---

## ⚡ Производительность (Performance)

### 🔴 Render-Blocking ресурсы (блокируют отрисовку страницы)

Все перечисленные скрипты находятся в `<head>` **без** атрибутов `defer` или `async`:

| Файл | Размер | Проблема |
|------|--------|---------|
| `wp-includes/js/jquery/jquery.min.js` | **88 КБ** | Блокирует парсинг — самый тяжёлый |
| `wp-includes/js/jquery/jquery-migrate.min.js` | **16 КБ** | Блокирует парсинг |
| `wp-content/plugins/wt_geotargeting_pro/js/cookie.js` | 4 КБ | Геотаргетинг, блокирует |
| `wp-content/plugins/wt_geotargeting_pro/js/wt-location.js` | 8 КБ | Геотаргетинг, блокирует |
| `slick-carousel@1.8.1/slick/slick.min.js` (CDN) | ~50 КБ | Внешний, блокирует |

**CSS, блокирующие рендер** (без `media=print` или `onload`):

| Файл | Примечание |
|------|-----------|
| `wp-postratings/css/postratings-css.css` | |
| `wp-ulike/assets/css/wp-ulike.min.css` | |
| `finbank_theme/style.css?ver=1.0.0` | Дубль основного CSS |
| `finbank_theme/css/style.css?ver=1778234128` | **Основной CSS — огромный** |
| `slick-carousel/slick/slick.css` + `slick-theme.css` | Внешние с CDN |
| `add-to-any/addtoany.min.css` | |
| `ajax-load-more-anything/assets/styles.min.css` | |

> ✅ CSS файлы `custom.css`, `danil.css`, `codes.css`, `fancybox.css`, `exit_popup.css` находятся в `<noscript>` — это правильно, они НЕ блокируют рендер.

---

### 🔴 LCP — Largest Contentful Paint (34.1 сек)

**Причина:** LCP = первое изображение карточки МФО (логотип "Займер", файл `Screenshot_1-1.png`, строка ~999 HTML).

**Почему 34 секунды:**
1. Браузер должен сначала загрузить и выполнить jQuery (88 КБ) и другие блокирующие скрипты
2. Только после этого начинается отрисовка контента
3. Изображение не имеет `preload` — браузер узнаёт о нём поздно
4. GitHub Pages не имеет CDN как у оригинального сайта — задержки больше

**Решение для v2:**
```html
<!-- Добавить в <head> -->
<link rel="preload" as="image" href="../../wp-content/uploads/2022/09/Screenshot_1-1.png">
```

---

### JavaScript — полный список (24 файла)

| Файл | Размер | Статус |
|------|--------|--------|
| `jquery.min.js` | 88 КБ | ✅ Нужен (основа всего) |
| `jquery-migrate.min.js` | 16 КБ | ⚠️ Можно убрать (только для старого кода) |
| `slick.min.js` (CDN) | ~50 КБ | ✅ Нужен (слайдеры есть) |
| `custom-script.js` | **100 КБ** | ✅ Нужен (логика страницы) |
| `fancybox.umd.js` | **140 КБ** | ✅ Нужен (лайтбоксы используются) |
| `fslightbox_pro.js` | 56 КБ | ⚠️ Дубль? Проверить — есть ли вызовы |
| `tiny-slider.js` | 32 КБ | ✅ Нужен (6 вызовов в custom-script.js) |
| `cookie.js` (геотаргетинг) | 4 КБ | ⚠️ Можно defer |
| `wt-location.js` (геотаргетинг) | 8 КБ | ⚠️ Можно defer |
| `addtoany.min.js` | ~15 КБ | ⚠️ Соцсети — можно defer |
| `static.addtoany.com/menu/page.js` | внешний | ⚠️ Внешний, defer |
| `scripts.js` (ajax-load-more) | ~10 КБ | ⚠️ Можно defer |
| `easy-affiliate-links/dist/public.js` | ~5 КБ | ⚠️ Можно defer |
| `lazyload.min.js` | ~5 КБ | ⚠️ Можно убрать в v2 (мы уже убрали lazyload) |
| `wp-ulike.min.js` | ~20 КБ | ⚠️ Лайки — можно defer |
| `postratings-js.js` | ~10 КБ | ⚠️ Рейтинги — можно defer |
| `ratings.js` | ~5 КБ | ⚠️ Можно defer |
| `new-listing.js` | ~5 КБ | ⚠️ Можно defer |
| `test.js` | ~5 КБ | ❓ Что это? Скорее всего можно убрать |
| `jquery.inputmask.min.js` | ~30 КБ | ⚠️ Только для форм, можно defer |
| `jquery.validate.min.js` | ~20 КБ | ⚠️ Только для форм, можно defer |
| `comment-reply.min.js` | ~5 КБ | ⚠️ Только для комментариев |
| `additional-comment-ajax.js` | ~5 КБ | ⚠️ Только для комментариев |
| `additional-comment-like-dislike.js` | ~5 КБ | ⚠️ Только для комментариев |
| `additional-comment-reply-ajax.js` | ~5 КБ | ⚠️ Только для комментариев |

**Итого JS:** ~700+ КБ загружается при открытии страницы.  
**Из них блокирующих:** ~170 КБ (jQuery + геотаргетинг + slick с CDN)

---

### CSS — полный список

| Файл | Статус |
|------|--------|
| `finbank_theme/style.css?ver=1.0.0` | ⚠️ **Дубль** — то же самое что `css/style.css` |
| `finbank_theme/css/style.css` | ✅ Основной, нужен |
| `finbank_theme/css/custom.css` | ✅ в `<noscript>` — ОК |
| `finbank_theme/css/danil.css` | ✅ в `<noscript>` — ОК |
| `finbank_theme/css/codes.css` | ✅ в `<noscript>` — ОК |
| `finbank_theme/css/fancybox.css` | ✅ в `<noscript>` — ОК |
| `finbank_theme/css/exit_popup.css` | ✅ в `<noscript>` — ОК |
| `slick.css` + `slick-theme.css` (CDN) | ⚠️ Внешние, блокируют |
| `wp-postratings/css/postratings-css.css` | ⚠️ Только для рейтингов |
| `wp-ulike/assets/css/wp-ulike.min.css` | ⚠️ Только для лайков |
| `addtoany.min.css` | ⚠️ Только для соцсетей |
| `ajax-load-more-anything/assets/styles.min.css` | ⚠️ |

**Критично:** `style.css` подключён **дважды** (с разными ver параметрами).

---

### Шрифты

| Шрифт | font-display | Статус |
|-------|-------------|--------|
| Lato Regular, Medium, Semibold, Bold | **НЕТ** | 🔴 FOIT — текст невидим до загрузки |
| Mulish Regular, Medium, Semibold | `swap` | ✅ ОК |

**Проблема:** Основной шрифт Lato (используется для всего контента) не имеет `font-display: swap`. Браузер ждёт загрузки шрифта, прежде чем показать текст → ухудшает FCP.

**Решение для v2:** добавить `font-display: swap;` во все `@font-face` для Lato в `style.css`.

---

### Изображения

- **Всего `<img>` тегов:** 59
- **С атрибутами width/height:** 8 (только 14%!)
- **Без width/height:** 51 изображение — **причина CLS** (контент скачет при загрузке)

**Форматы:**
- Логотипы МФО: смесь PNG, WebP, JPEG — нет единого стандарта
- Некоторые PNG можно конвертировать в WebP (экономия 30-50%)

**Lazyload на первом экране:**
- После нашего фикса все `data-src` заменены на `src` — ✅
- Но первое изображение карточки (LCP) не имеет `fetchpriority="high"` и `preload`

---

## 🔎 SEO (Поисковая оптимизация)

### Технический SEO

| Элемент | Значение | Оценка |
|---------|---------|--------|
| **Title** | "Займы с плохой кредитной историей \| Микрозаймы с плохой КИ" (62 символа) | 🟡 Чуть длинно |
| **Meta description** | "Одобрение микрозаймов с плохой кредитной историей! Заполняйте онлайн-заявку и получите быстрый займ в день обращения наличными или на карту." | ✅ Хорошо |
| **H1** | Присутствует (класс `page__heading-title`, строка 597) | ✅ |
| **Canonical** | `index.html` (относительный!) | 🔴 Для GitHub Pages неверно |
| **Robots meta** | `index, follow, max-image-preview:large` | ✅ |
| **Structured Data** | ✅ Schema.org (WebPage + BreadcrumbList + WebSite) от Yoast | ✅ |
| **Open Graph** | ✅ Присутствует | ✅ |
| **Twitter Card** | ✅ Присутствует | ✅ |

**Canonical проблема:** В v1 canonical установлен как `index.html` (относительный). Для SEO-тестов это ок, но при переносе на продакшн нужно поправить на полный URL.

### Alt-тексты у изображений

Большинство логотипов МФО в навигации имеют пустые alt="" — это снижает Accessibility score. Основные карточки имеют alt с названием МФО.

### Структура заголовков H1-H6

- H1: ✅ Один, релевантный
- H2-H6: Предположительно правильная иерархия (нужна дополнительная проверка)

---

## ♿ Доступность (Accessibility, score 64)

Основные причины низкого score:

1. **Кнопки без текста/aria-label** — кнопки сравнения (`.btn__compare`), лайков, навигации содержат только SVG иконки без текстового описания для скринридеров
2. **Изображения в навигации с `alt=""`** — логотипы банков в мегаменю (строка 382 и далее)
3. **Контрастность** — серый текст (`var(--gray-600)`) на белом фоне может не проходить WCAG AA
4. **Отсутствие `<label>`** у некоторых полей форм
5. **Кнопка бургер-меню** без `aria-label`
6. **Интерактивные SVG** без `role="img"` и `aria-label`

---

## ✅ Чек-лист Core Web Vitals

- [x] LCP < 2.5s — ❌ (34.1s — критично)
- [x] FCP < 1.8s — ❌ (4.0s)
- [ ] TBT < 200ms — не измерено (ожидаем высокий из-за JS)
- [ ] CLS < 0.1 — риск высокий (51 img без width/height)
- [ ] INP < 200ms — не измерено

## ✅ Чек-лист технического SEO

- [x] Title оптимален (50-60 символов) — 🟡 62 символа, чуть длинно
- [x] Meta description есть и информативен — ✅
- [x] H1 один, релевантен — ✅
- [x] Canonical корректен — ❌ относительный путь
- [x] Alt-тексты у всех значимых картинок — 🟡 частично
- [x] Structured data присутствует — ✅ Schema.org
- [x] Мобильная версия корректна — ✅
- [x] Страница индексируема — ✅

## ✅ Чек-лист производительности

- [x] Нет render-blocking JS в `<head>` — ❌ jQuery + геотаргетинг + slick
- [x] CSS не блокирует рендер — ❌ дубль style.css + CDN slick CSS
- [x] LCP-изображение preload — ❌ нет
- [x] Изображения в WebP — 🟡 частично
- [x] Шрифты с `font-display: swap` — ❌ Lato без swap
- [x] Critical CSS inline — ❌ нет
- [x] Сторонние скрипты отложены — ❌ геотаргетинг блокирует
- [x] Нет неиспользуемых библиотек — 🟡 fslightbox и lazyload под вопросом

---

## 📋 План действий для v2

### 🔴 Приоритет 1 — Render-blocking JS (~+10-15 баллов)

**Задача:** Перенести все скрипты из `<head>` в конец `<body>` с `defer`

```html
<!-- Убираем из <head>, добавляем перед </body> -->
<script defer src="...jquery.min.js"></script>
<script defer src="...jquery-migrate.min.js"></script>  <!-- или убрать совсем -->
<script defer src="...slick.min.js"></script>
<!-- и все остальные JS -->
```

**Исключения — оставить в head:**
- Яндекс.Метрика (уже async, нормально)
- GTM (уже async)
- JSON-LD Schema.org (не JS)

---

### 🔴 Приоритет 2 — Preload LCP-изображения (~+5-8 баллов)

```html
<link rel="preload" as="image" 
      href="../../wp-content/uploads/2022/09/Screenshot_1-1.png"
      fetchpriority="high">
```

---

### 🔴 Приоритет 3 — font-display: swap для Lato (~+3-5 баллов)

В файле `v2/wp-content/themes/finbank_theme/css/style.css` добавить в каждый `@font-face` для Lato:
```css
font-display: swap;
```

---

### 🟡 Приоритет 4 — Убрать дубль CSS (~+2-3 балла)

Удалить дублирующий тег:
```html
<!-- УДАЛИТЬ эту строку -->
<link rel='stylesheet' href='../../wp-content/themes/finbank_theme/style.css?ver=1.0.0.css'/>
```

---

### 🟡 Приоритет 5 — Перенести внешние CSS в локальные с defer (~+3-5 баллов)

```html
<!-- Вместо синхронной загрузки с CDN: -->
<link rel="preload" as="style" href="slick.css" onload="this.onload=null;this.rel='stylesheet'">
```
Или скачать slick CSS локально и подключить с `media="print"` + JS swap.

---

### 🟡 Приоритет 6 — width/height у изображений (CLS)

Добавить атрибуты `width` и `height` ко всем 51 изображениям без них. Особенно важно для карточек МФО (420x264 пикселей судя по SVG-заглушкам).

---

### 🟢 Приоритет 7 — Accessibility (+20-25 баллов, цель ≥80)

1. Добавить `aria-label` к кнопкам `.btn__compare`, лайков, бургер-меню
2. Добавить осмысленный `alt` к логотипам банков в навигации
3. Проверить контрастность серого текста

---

### 🟢 Приоритет 8 — Удалить лишние скрипты

- `lazyload.min.js` — можно убрать (мы уже убрали lazyload из HTML)
- `test.js` — изучить и удалить если не нужен
- `jquery-migrate.min.js` — попробовать убрать (нужно тестирование)
- `fslightbox_pro.js` — проверить вызовы, возможно дублирует fancybox

---

## 📈 Ожидаемый результат после всех изменений

| Метрика | v1 (сейчас) | v2 (прогноз) |
|---------|-------------|--------------|
| Performance | 32 🔴 | **60-75** 🟡 |
| FCP | 4.0s | **1.5-2.0s** |
| LCP | 34.1s | **3-6s** (CDN GitHub Pages медленный) |
| Accessibility | 64 | **80-85** |
| SEO | 83 | **88-92** |

> Примечание: GitHub Pages не имеет CDN и HTTP/2 push как оригинал finabank.ru, поэтому LCP будет выше чем на продакшне. На реальном сервере с CDN результаты будут значительно лучше.

---

*Следующий шаг: отдать план на ревью Гению, затем приступить к реализации в v2.*

---

## 🧠 Ревью Гения

**Дата ревью:** 10.05.2026  
**Статус:** ✅ Аудит качественный, но требует корректировок

---

### 🔴 КРИТИЧЕСКИЕ ОШИБКИ

#### 1. Неверное утверждение о GitHub Pages

> ❌ "GitHub Pages не имеет CDN и HTTP/2 push как оригинал finabank.ru"

**Факт:** GitHub Pages использует **Fastly CDN** с полной поддержкой **HTTP/2**. Это быстрый хостинг с edge-серверами по всему миру. Утверждение о "медленном GitHub Pages" — ошибка, которая ведёт к неверным прогнозам.

**Влияние:** Прогноз LCP 3-6s слишком пессимистичен. При корректных оптимизациях LCP должен быть **1.5-3.0s**.

---

#### 2. Прогнозы Performance некорректны

**Проблема логики:**
- Если LCP = 6s, Performance **не может быть** 60-75. LCP > 4s = провал по Core Web Vitals
- PageSpeed Insights даёт ~25 баллов штрафа за каждую секунду LCP сверх 2.5s

**Корректный прогноз:**

| Метрика | v1 | v2 (реалистично) | v2 (оптимистично) |
|---------|-----|------------------|-------------------|
| Performance | 32 | **55-65** 🟡 | **70-80** 🟢 |
| FCP | 4.0s | **1.2-1.8s** | **<1.0s** |
| LCP | 34.1s | **2.5-4.0s** | **2.0-2.5s** |
| Accessibility | 64 | **78-85** | **88+** |
| SEO | 83 | **90-95** | **95+** |

---

### 🟡 НЕТОЧНОСТИ И НЕДОЧЁТЫ

#### 3. Размеры файлов требуют уточнения

| Файл | В аудите | Фактически (gzip) | Примечание |
|------|----------|-------------------|------------|
| jquery.min.js | 88 КБ | ~30 КБ | 88 КБ — uncompressed |
| slick.min.js | ~50 КБ | ~8 КБ | CDN отдаёт gzip |
| fancybox.umd.js | 140 КБ | ~40 КБ | Проверить версию |

**Почему важно:** Transfer size (с gzip) важнее для времени загрузки. Parse size важен для TBT. Нужно указывать оба.

---

#### 4. Пропущено: preconnect/dns-prefetch

Для внешних ресурсов **критически важно** добавить в `<head>`:

```html
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="preconnect" href="https://static.addtoany.com" crossorigin>
<link rel="dns-prefetch" href="https://mc.yandex.ru">
```

Это сэкономит 100-300ms на DNS + TCP + TLS handshake.

---

#### 5. Пропущено: Critical CSS (Inline)

Упомянуто в чеклисте ("Critical CSS inline — ❌ нет"), но **нет плана реализации**.

**Рекомендация:** Выделить CSS для above-the-fold контента (~15-30 КБ) и inline в `<style>` в `<head>`. Это даст **+5-10 баллов Performance** и существенно улучшит FCP.

Инструменты:
- https://critical.github.io/
- `npx critical index.html --inline`

---

#### 6. Приоритизация требует корректировки

**Текущая проблема:** font-display: swap — это Приоритет 3, но влияет на FCP **напрямую**. Должен быть **Приоритет 1** вместе с render-blocking JS.

**Исправленная приоритизация:**

| Приоритет | Задача | Влияние |
|-----------|--------|----------|
| **1** | defer всех JS из `<head>` | LCP, TBT |
| **1** | font-display: swap для Lato | FCP |
| **1** | preload LCP-изображения + preconnect | LCP |
| **2** | Critical CSS inline | FCP |
| **2** | Убрать дубль CSS | Parse time |
| **3** | width/height для images | CLS |
| **3** | Локализовать CDN-ресурсы | Reliability |
| **4** | Accessibility fixes | Score |
| **5** | Удалить мёртвый код | Maintenance |

---

### 🟢 ЧТО СДЕЛАНО ХОРОШО

1. ✅ **Детальный анализ render-blocking** — все скрипты перечислены, размеры указаны
2. ✅ **Правильная диагностика LCP** — найдено изображение-виновник
3. ✅ **Анализ шрифтов** — корректно выявлено отсутствие font-display: swap
4. ✅ **SEO-аудит** — все ключевые элементы проверены
5. ✅ **Accessibility** — выявлены основные проблемы (aria-label, alt, contrast)
6. ✅ **Правильное замечание** про CSS в `<noscript>` — это действительно не блокирует рендер

---

### 📋 ДОПОЛНИТЕЛЬНЫЕ РЕКОМЕНДАЦИИ ДЛЯ СТАТИЧЕСКОЙ КОПИИ

#### 1. Относительные пути

Пути вида `../../wp-content/` работают, но **хрупкие**. При перемещении HTML файла всё сломается.

**Рекомендация:** Использовать абсолютные пути от корня:
```html
<!-- Вместо -->
<img src="../../wp-content/uploads/...">
<!-- Использовать -->
<img src="/Fina_test_01/v2/wp-content/uploads/...">
```

#### 2. robots.txt и sitemap.xml

Для GitHub Pages нужны:
- `/robots.txt` — разрешить индексацию тестовых страниц или запретить (User-agent: * / Disallow: /)
- `/sitemap.xml` — если планируется SEO-тестирование

#### 3. .nojekyll файл

Убедиться что есть файл `.nojekyll` в корне репозитория — иначе GitHub Pages обработает через Jekyll и может сломать пути.

#### 4. Canonical URL

Относительный canonical `index.html` — это **проблема**. Для тестов можно оставить, но перед сравнением SEO-метрик нужно:
```html
<link rel="canonical" href="https://webbrokers.github.io/Fina_test_01/v2/collection/zajmy-s-plohoj-kreditnoj-istoriej/">
```

---

### 📊 ФИНАЛЬНЫЙ ВЕРДИКТ

| Критерий | Оценка | Комментарий |
|----------|--------|-------------|
| **Полнота** | 7/10 | Пропущены preconnect, Critical CSS, детали |
| **Точность** | 6/10 | Ошибка про GitHub Pages CDN критична |
| **Приоритизация** | 7/10 | font-display должен быть Приоритет 1 |
| **Реализуемость** | 9/10 | Всё применимо к статике |
| **Прогнозы** | 5/10 | Противоречивые (LCP 6s ≠ Score 75) |

**Итого: 6.8/10** — хороший базовый аудит, но требует корректировок перед реализацией.

---

### ✅ ИСПРАВЛЕННЫЙ ПЛАН ДЕЙСТВИЙ ДЛЯ v2

**Блок 1 — Критический (делать первым, +25-35 баллов):**
1. Все JS → перед `</body>` с `defer`
2. `font-display: swap` для всех @font-face Lato
3. `<link rel="preload">` для LCP-изображения
4. `<link rel="preconnect">` для CDN

**Блок 2 — Важный (+10-15 баллов):**
5. Critical CSS inline (above-the-fold ~20 КБ)
6. Убрать дубль style.css
7. Локализовать slick CSS/JS (убрать внешний CDN)

**Блок 3 — Стабилизация (+5-10 баллов):**
8. width/height для всех images (особенно карточки МФО)
9. fetchpriority="high" для LCP
10. Удалить lazyload.min.js, test.js

**Блок 4 — Polish (+5-8 баллов):**
11. aria-label для кнопок
12. alt для изображений в навигации
13. Canonical URL исправить

**Целевые метрики v2:**
- Performance: **65-75** (реалистично) / **80+** (при идеальной реализации)
- FCP: **<1.5s**
- LCP: **<3.0s**
- CLS: **<0.1**
- Accessibility: **85+**
- SEO: **95+**

---

*Ревью завершено. План скорректирован и готов к реализации.*
