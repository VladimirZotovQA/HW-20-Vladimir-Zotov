# Loan app — Playwright tests

Автотесты для [small loan](https://loan-app.tallinn-learning.ee/small-loan) на Playwright и TypeScript.

## Требования

- Node.js 18 или новее
- Зависимости из `package.json`

## Установка

```bash
npm install
npx playwright install chromium
```

`npm install` ставит `@playwright/test`. Вторая команда скачивает браузер Chromium, которым запускаются тесты.

## Запуск

Все тесты:

```bash
npm test
```

Один файл:

```bash
npx playwright test tests/small-loan.spec.ts
```

HTML-отчёт после прогона:

```bash
npm run test:report
```

При падении теста Playwright сохраняет скриншот и trace в `test-results/`. Их можно открыть так:

```bash
npx playwright show-trace test-results/<папка-теста>/trace.zip
```

## Структура

- `playwright.config.ts` — baseURL, Chromium, HTML-репорт, screenshot и trace при падении
- `pages/` — Page Object: общий `BasePage` и по классу на каждую страницу
- `fixtures/` — страницы создаются через `test.extend`
- `data/` — URL, логин, пароль и суммы
- `tests/` — сами тесты
