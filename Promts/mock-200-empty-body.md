# Prompt: mock with status 200 and empty body

## Prompt 1 (first run)

Use the skill add-playwright-mock-test.

Add one test for the /small-loan page: the request returns status 200 with no response body.

Endpoint: GET https://backend.tallinn-learning.ee/api/loan-calc?amount=1609&period=12
Real response body: {"paymentAmountMonthly":137.74}
Expected UI result: TODO (from the contract or the instructor)

Do not invent locators or expected behavior. If something is missing, ask me.
After writing the test, show the diff, run the new test, then run the whole suite.

## Result

The first test asserted a made-up error message. A traced run showed that the empty 200 response renders `undefined €`; the regression test now checks the existing payment locator for `undefined`, `NaN`, and empty text, and uses `test.fail(true, 'Bug: 200 with empty body shows "undefined €" in monthly payment')`. The 500 and wrong-key tests first make a real successful request for amount 1609, then register a mock for the next calculation. The 500 currently leaves `137.74 €` visible; that is an observed behavior, not a contract guarantee. The wrong-key response uses valid JSON with `paymentAmountMonthlyWrong` and currently renders `undefined €`, so its expected-failure test asserts against that.

## Skill changes after this run

Added one concise rule: without a UI contract, use existing locators for observable assertions, and mark confirmed bugs with a reasoned `test.fail()` after checking the mock and a valid baseline.