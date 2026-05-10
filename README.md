# Fina_test_01 — SEO-оптимизация finabank.ru

## О проекте

Рабочий репозиторий для оптимизации страницы:  
**[finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/](https://finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/)**

Цель — улучшить PageSpeed Score и SEO-показатели.

---

## Структура

```
/
├── v1/    ← точная копия оригинала (эталон, НЕ ТРОГАТЬ!)
└── v2/    ← экспериментальная версия (оптимизация)
```

---

## GitHub Pages

| Версия | URL |
|--------|-----|
| **v1 (эталон)** | https://webbrokers.github.io/Fina_test_01/v1/collection/zajmy-s-plohoj-kreditnoj-istoriej/ |
| **v2 (оптимизация)** | https://webbrokers.github.io/Fina_test_01/v2/collection/zajmy-s-plohoj-kreditnoj-istoriej/ |

---

## Метрики (baseline, 10.05.2026)

| Метрика | v1 (наш эталон) | Оригинал finabank.ru |
|---------|----------------|----------------------|
| Performance | **32** 🔴 | 36 🔴 |
| LCP | 34.1s 🔴 | 21.9s 🔴 |
| FCP | 4.0s 🔴 | — |
| Accessibility | 64 🟡 | 64 🟡 |
| Best Practices | 96 🟢 | 96 🟢 |
| SEO | 83 🟡 | 83 🟡 |

> v1 чуть медленнее оригинала — GitHub Pages не имеет CDN finabank, это нормально.

---

## План оптимизации v2

### 🔜 Приоритет 1 — Render-blocking JS (главная причина низкого score)
- [ ] Перенести скрипты из `<head>` в конец `<body>` с `defer`
- [ ] jQuery загружать последним
- [ ] Убрать inline-блокирующие скрипты

### 🔜 Приоритет 2 — LCP (34 сек → цель < 2.5 сек)
- [ ] `<link rel="preload">` для LCP-изображения
- [ ] Убрать lazyload с первого экрана (first viewport)
- [ ] Inline critical CSS

### 🔜 Приоритет 3 — Лишние библиотеки
- [ ] Удалить `tiny-slider.js` (не вызывается нигде)
- [ ] Удалить дубли CSS-файлов
- [ ] Отложить геотаргетинг и аналитику Яндекс/GA

### 🔜 Приоритет 4 — Изображения
- [ ] Конвертировать PNG/JPG → WebP для карточек МФО
- [ ] Добавить `width` и `height` атрибуты (CLS fix)

---

## Лог изменений

### v1 (10.05.2026)
- Точная копия оригинала: wget --mirror (85 файлов темы/плагинов)
- 94 картинки МФО из wp-content/uploads
- Исправлен lazyload: data-src → src
- Скачан icons.svg, 502 xlink:href локализованы
- Baseline PageSpeed: 32 мобайл

### v2 (в работе)
- Клон v1, оптимизация в процессе
