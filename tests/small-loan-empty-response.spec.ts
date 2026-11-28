import { apiRoutes, loan } from '../data/test-data';
import { expect, test } from '../fixtures/pages.fixture';

test('200 with empty body does not show undefined', async ({
  smallLoanPage,
  page,
}) => {
  test.fail(true, 'Bug: 200 with empty body shows "undefined €" in monthly payment');

  await smallLoanPage.open();

  const seedResponsePromise = page.waitForResponse((response) =>
    response.url().includes(`/api/loan-calc?amount=${loan.mockSeedAmount}`),
  );
  await smallLoanPage.setLoanAmount(loan.mockSeedAmount);
  const seedResponse = await seedResponsePromise;
  expect(seedResponse.status()).toBe(200);
  await expect(smallLoanPage.monthlyPayment()).toHaveText(
    `${loan.mockSeedMonthlyPayment} €`,
  );

  let updatedAmountRequestCount = 0;
  page.on('request', (request) => {
    if (new URL(request.url()).searchParams.get('amount') === loan.updatedAmount) {
      updatedAmountRequestCount += 1;
    }
  });
  await page.route(
    apiRoutes.loanCalc,
    (route) => route.fulfill({ status: 200 }),
    { times: 1 },
  );
  const emptyResponsePromise = page.waitForResponse((response) =>
    response.url().includes(`/api/loan-calc?amount=${loan.updatedAmount}`),
  );
  await smallLoanPage.setLoanAmount(loan.updatedAmount);
  const emptyResponse = await emptyResponsePromise;

  expect(updatedAmountRequestCount).toBe(1);
  expect(emptyResponse.status()).toBe(200);
  expect(await emptyResponse.text()).toBe('');
  await expect(smallLoanPage.amount()).toHaveValue(loan.updatedAmount);
  await expect(smallLoanPage.monthlyPayment()).not.toHaveText(/undefined/);
  await expect(smallLoanPage.monthlyPayment()).not.toHaveText(/NaN/);
  await expect(smallLoanPage.monthlyPayment()).not.toHaveText('');
});
