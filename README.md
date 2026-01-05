# Playwright + TypeScript — Project Guide ✅

A concise guide for running and extending the Playwright test suite implemented in TypeScript.

---

## Table of Contents

1. **Overview**
2. **Prerequisites**
3. **Install & Setup**
4. **Running Tests**
5. **Project Structure**
6. **Test Patterns & Page Objects**
7. **Configuration Details**
8. **Common Commands & Tips**
9. **Extending Tests**
10. **Contributing**

---

## 1. Overview 💡
This repository contains Playwright tests written in TypeScript that exercise the AutomationExercise demo site (https://automationexercise.com). Tests use the Page Object Model (POM) for readability and reusability.

## 2. Prerequisites ⚙️
- Node.js (v18+ recommended)
- npm (comes with Node.js)
- Recommended: an editor with TypeScript support (VS Code)

## 3. Install & Setup 🔧
1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers (if needed):

```bash
npx playwright install
```

(Optionally) install Playwright test runner tools if you need to re-init the project:

```bash
npx playwright test --init
```

> Note: This project already includes `@playwright/test` in `devDependencies`.

## 4. Running Tests ▶️
Run the whole test suite:

```bash
npm test
```

Run a single file:

```bash
npx playwright test tests/login.success.spec.ts
```

Run tests in headed mode (see the browser while tests run):

```bash
npm run test:headed
```

Generate and open the HTML report after tests:

```bash
npm run show-report
```

Run a single project (configuration uses a Chrome project):

```bash
npx playwright test --project="Google Chrome"
```

## 5. Project Structure 📁
- `playwright.config.ts` — Playwright config (projects, reporter, timeouts)
- `tests/` — Test files (e.g., `login.success.spec.ts`)
- `pages/` — Page objects implementing UI interactions
  - `login.singup.page.ts`
  - `account.information.page.ts`
  - `account.created.deleted.page.ts`
  - `home.page.ts`
- `testdata/` — Test data JSON (e.g., `login.testdata.json`)
- `playwright-report/` — Generated HTML report output (after tests)
- `tsconfig.json`, `package.json` — TypeScript and npm configuration

## 6. Test Patterns & Page Objects 🔍
This code uses the Page Object Model (POM) to encapsulate page behavior.

Example patterns you will see:
- Each page object is a class that accepts `page: Page` in the constructor and exposes actions (e.g., `enterEmailAddress`, `clickSignUp`).
- Tests import page objects and test data (JSON) and compose flows:
  - `login.success.spec.ts` contains tests for successful login/registration, negative login, and logout/delete flows.

Snippet (from tests):
```ts
const loginSignupPage = new loginOrSignup(page);
await loginSignupPage.enterEmailAddressLogin(loginData.invalidLogin.email);
await loginSignupPage.enterPassword(loginData.invalidLogin.password);
await loginSignupPage.clickLogin();
await expect(loginSignupPage.getInvalidLoginMessage()).toEqual("Your email or password is incorrect!");
```

## 7. Configuration Details 🧩
Key config bits from `playwright.config.ts`:
- `testDir: './tests'` — tests location
- `reporter: 'html'` — HTML report
- `trace: 'on-first-retry'` — collects traces for retries
- `headless: false` — runs browsers in headed mode by default (change to `true` for CI)
- `projects` — includes a Chrome project (channel: `'chrome'`)
- `retries` and `workers` controlled by `process.env.CI`

## 8. Common Commands & Tips 🧪
- Run a single test by line number (VS Code): click the gutter test-run buttons.
- Debug interactively: `npx playwright test --debug` or add `await page.pause();` in test code.
- View traces: after a failed test run, open the trace using the Playwright Trace Viewer (`npx playwright show-trace trace.zip`)
- Generate a stable test run for CI: set `headless: true` and `workers: 1` in CI environment.

## 9. Extending Tests ✍️
- Add a new page object in `pages/` for the page or UI part you need to interact with.
- Keep selectors resilient: prefer `getByRole`, `getByLabel`, or data-test attributes over brittle CSS selectors.
- Add test data to `testdata/` JSON and import it into specs.
- Create well-named helper methods in page objects with clear return types.

Minimal example to add a test:
```ts
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.singup.page';

test('example test', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('https://automationexercise.com/login');
  await login.enterEmailAddressLogin('example@example.com');
  await login.enterPassword('Password!');
  await login.clickLogin();
  // assertions...
});
```

## 10. Contributing & Next Steps ✅
The project includes helpful npm scripts for convenience:
- `npm test` — run full test suite
- `npm run test:headed` — run tests in headed mode
- `npm run show-report` — generate and display HTML report
- `npm run typecheck` — validate TypeScript types

---

**Happy Testing! 🎉**