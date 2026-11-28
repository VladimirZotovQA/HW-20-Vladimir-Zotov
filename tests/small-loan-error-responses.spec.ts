import { apiRoutes, loan } from '../data/test-data';
import { expect, test } from '../fixtures/pages.fixture';

test('500 with no body keeps the previous monthly payment', async ({
  smallLoanPage,
  page,
}) => {
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
    (route) => route.fulfill({ status: 500 }),
    { times: 1 },
  );
  const failedResponsePromise = page.waitForResponse((response) =>
    response.url().includes(`/api/loan-calc?amount=${loan.updatedAmount}`),
  );
  await smallLoanPage.setLoanAmount(loan.updatedAmount);
  const failedResponse = await failedResponsePromise;

  expect(updatedAmountRequestCount).toBe(1);
  expect(failedResponse.status()).toBe(500);
  expect(await failedResponse.text()).toBe('');
  await expect(smallLoanPage.amount()).toHaveValue(loan.updatedAmount);
  await expect(smallLoanPage.monthlyPayment()).toHaveText(
    `${loan.mockSeedMonthlyPayment} €`,
  );
});

test('200 with wrong JSON key does not show undefined', async ({
  smallLoanPage,
  page,
}) => {
  test.fail(
    true,
    'Bug: 200 with paymentAmountMonthlyWrong shows "undefined €" in monthly payment',
  );

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
    (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ paymentAmountMonthlyWrong: loan.mockSeedMonthlyPayment }),
      }),
    { times: 1 },
  );

  const wrongKeyResponsePromise = page.waitForResponse((response) =>
    response.url().includes(`/api/loan-calc?amount=${loan.updatedAmount}`),
  );
  await smallLoanPage.setLoanAmount(loan.updatedAmount);
  const wrongKeyResponse = await wrongKeyResponsePromise;

  expect(updatedAmountRequestCount).toBe(1);
  expect(wrongKeyResponse.status()).toBe(200);
  expect(await wrongKeyResponse.json()).toEqual({
    paymentAmountMonthlyWrong: loan.mockSeedMonthlyPayment,
  });
  await expect(smallLoanPage.amount()).toHaveValue(loan.updatedAmount);
  await expect(smallLoanPage.monthlyPayment()).not.toHaveText(/(?:NaN|undefined)/);
  await expect(smallLoanPage.monthlyPayment()).not.toHaveText('');
});
