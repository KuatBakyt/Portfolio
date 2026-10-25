# Bakyt Dev — сайты и Telegram-боты

Портфолио и услуги Бакыта Куата: сайты, Telegram-боты, backend и исправления. React 19, TypeScript, Vite; светлый адаптивный дизайн по согласованному макету.

## Локальный запуск

Нужен Node.js 22.12+ или 24 LTS.

```bash
npm ci
npm run dev
```

Проверка готового сайта:

```bash
npm run check
npm run preview
```

`check` проверяет TypeScript, собирает сайт, создаёт HTML страниц и проверяет метаданные, локальные ссылки, изображения и якоря. Для проверки итоговых SEO-настроек используйте `preview`, а не dev-сервер.

## Публикация

Существующий проект Vercel `portfolio` подключён к этому репозиторию. Публикация из `main`: framework Vite, build `npm run check`, output `dist`. Настройки находятся в `vercel.json`.

Основной адрес: https://bakyt-dev.vercel.app

Страницы услуг: https://bakyt-dev.vercel.app/razrabotka-saitov-almaty/ · https://bakyt-dev.vercel.app/telegram-boty/ · https://bakyt-dev.vercel.app/ispravlenie-oshibok/

Старый публичный адрес перенаправляется на новый постоянным редиректом. SITE_URL для production задан в Vercel.

При дальнейшей смене адреса сначала добавьте и подтвердите новый домен в Vercel, затем обновите SITE_URL, выполните сборку и настройте редирект. Не меняйте canonical на адрес, который ещё не принадлежит проекту.

## SEO

Готовый HTML создаётся на сборке, затем React подключает интерактивность. Страницы:

- `/` — портфолио и услуги;
- `/razrabotka-saitov-almaty/` — разработка сайтов;
- `/telegram-boty/` — Telegram-боты;
- `/ispravlenie-oshibok/` — исправления;
- `/privacy/` — конфиденциальность.

У страниц услуг разные H1, title, description и canonical. Есть Open Graph, PNG для социальных ссылок, JSON-LD, sitemap.xml, robots.txt и страница 404. `SITE_URL` — необязательная переменная сборки, HTTPS-origin без пути. По умолчанию используется https://bakyt-dev.vercel.app. Индексация и позиции в поиске не гарантируются: после публикации добавьте основной домен в Google Search Console и отправьте `/sitemap.xml`.

## Контакты и форма

Публичные контакты сохранены из старого сайта в `src/content.ts`: WhatsApp, Telegram, email, телефон и GitHub. Форма проверяет обязательные поля и подготавливает сообщение в WhatsApp; посетитель сам отправляет его. Сайт не принимает заявку на сервер и не заявляет о её отправке. Токены, база данных и backend для такого сценария не нужны.

## Проекты и изображения

- Flowza CRM: собственный MVP; настоящий снимок интерфейса с тестовыми данными из `flowza-crm/frontend/docs/screenshots/desktop-dashboard.png`.
- Fashion Luxe: учебное приложение, обложка из его `assets/images/hero.jpg`; не выдаётся за снимок работающего магазина. Заказы имитируются, платежи не подключены.
- Business Bank: учебная система; настоящий снимок из `business_bank_app/frontend/test/screenshots/dashboard-desktop.png`, тестовые данные, без реальных банковских операций.

Изображения оптимизированы в WebP. Декоративная иллюстрация главного экрана — собственные SVG/CSS без тяжёлых библиотек. Google Fonts загружает Manrope; при недоступности применяется Arial. Старые компоненты и неподтверждённые описания работы в компаниях удалены из текущей версии; история Git сохранена.
