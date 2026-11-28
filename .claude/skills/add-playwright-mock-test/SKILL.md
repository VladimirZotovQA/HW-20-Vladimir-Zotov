---
name: add-playwright-mock-test
description: Use when asked to add a Playwright UI test that mocks an API response (status code, empty body, wrong JSON key) for the loan app at /small-loan.
---

# Add a Playwright test with a mocked response

## When to use
Use this skill when a new test must replace a real server response with a fake one through `page.route`. Examples: status 500 with no body, status 200 with no body, status 200 with a wrong JSON key.

## Step 1. Study the project first
Read these before writing anything:
- `tests/`: copy the style of existing tests (one check per test, short names).
- `pages/`: Page Objects. Locators are private and exposed through methods. Reuse them.
- `fixtures/pages.fixture`: tests import `test` and `expect` from here, not from `@playwright/test`.
- `data/test-data`: constants (paths, loan values). Do not hardcode values in tests.
- `playwright.config.ts`: baseURL, retries, projects.

## Step 2. Find the request and the contract
- Find the endpoint, method and response body of the request. Use DevTools, Network tab (Fetch/XHR), and trigger the action manually.
- Find the contract (Swagger or the instructor's description) for the expected response and the expected UI behavior.
- If the request or the contract is not found, stop and ask. Do not guess.

## Step 3. Write the test
Order matters:
1. Open the page with the Page Object (`open()`).
2. Register the mock with `page.route` before the action that sends the request.
3. Prepare the response with `route.fulfill` (only status, or status plus body, as the scenario says).
4. Start waiting with `page.waitForResponse` before the action, without `await`, and keep the promise.
5. Do the action through a Page Object method.
6. `await` the response promise, then check the UI with an auto-retrying `expect`.

## Step 4. Verify
- Run the new test alone.
- Run the whole suite.
- Show the diff and explain every change.

## Rules
- Do not invent locators. Use existing Page Object locators. If a new one is needed, ask the user to confirm it in DevTools first, then add it as a private locator with a getter method.
- Do not invent expected UI behavior. Take it from the contract or ask the user. If it is unknown, write that in the pull request.
- Without a UI contract, assert observable behavior through existing locators; do not invent messages or locators. For confirmed bugs, use `test.fail(true, 'Bug: <observed behavior>')` and verify the mock plus a valid baseline.
- Do not use `waitForTimeout`.
- Do not change existing tests unless asked.
- Keep comments short and in English.
