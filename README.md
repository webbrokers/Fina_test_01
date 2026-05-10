# Fina_test_01 — SEO-оптимизация finabank.ru

## О проекте

Рабочий репозиторий для оптимизации страницы:  
**[finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/](https://finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/)**

Цель — улучшить PageSpeed Score (сейчас: 36 мобайл / 64 десктоп) и SEO-показатели.

---

## Структура

```
/
├── v1/    ← точная копия оригинала (эталон, не трогать!)
└── v2/    ← экспериментальная версия (создаётся после проверки v1)
```

---

## GitHub Pages

| Версия | URL |
|--------|-----|
| **v1 (оригинал)** | https://webbrokers.github.io/Fina_test_01/v1/collection/zajmy-s-plohoj-kreditnoj-istoriej/ |
| **v2 (эксперимент)** | *(создаётся позже)* |

---

## Текущие метрики (исходник, 10.05.2026)

| Метрика | Мобайл | Десктоп |
|---------|--------|---------|
| Performance | 36 🔴 | — |
| LCP | 21.9s 🔴 | — |
| TBT | 1040ms 🔴 | — |
| CLS | 0.069 🟡 | — |
| Accessibility | 64 🟡 | — |
| Best Practices | 96 🟢 | — |
| SEO | 83 🟡 | — |

---

## План работы

### ✅ v1 — Эталонная копия
- [x] Скачать страницу со всеми ресурсами (wget --mirror)
- [x] Скачать все картинки МФО из wp-content/uploads (94 шт.)
- [x] Исправить lazyload (data-src → src, локальные пути)
- [x] Опубликовать на GitHub Pages

### 🔜 v2 — Оптимизация (после подтверждения v1)
- [ ] Убрать render-blocking JS из `<head>` (17 скриптов → defer/async)
- [ ] Удалить неиспользуемые библиотеки (tiny-slider, дубли CSS)
- [ ] Оптимизировать LCP-изображение (preload)
- [ ] Конвертировать картинки в WebP
- [ ] Inline critical CSS
- [ ] Отложить геотаргетинг и аналитику

---

## Ресурсы

- [Оригинальная страница](https://finabank.ru/collection/zajmy-s-plohoj-kreditnoj-istoriej/)
- [PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Ffinabank.ru%2Fcollection%2Fzajmy-s-plohoj-kreditnoj-istoriej%2F)
- [SEO-аудит Ника](https://github.com/webbrokers/Fina_test_01) *(в памяти агента)*
