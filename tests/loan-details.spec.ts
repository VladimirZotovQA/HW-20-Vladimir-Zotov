import { paths } from '../data/test-data';
import { expect, test } from '../fixtures/pages.fixture';

test('loan details page opens at /loan-decision', async ({ openedLoanDetails, page }) => {
  await openedLoanDetails.heading().waitFor();
  await expect(page).toHaveURL(paths.loanDecision);
});

test('loan details page shows the Loan Details heading', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.heading()).toBeVisible();
});

test('loan details page shows the loan amount', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.amount()).toBeVisible();
});

test.skip('loan details page shows the monthly payment', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.monthlyPayment()).toBeVisible();
});

test('loan details page shows the loan period', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.period()).toBeVisible();
});

test('loan details page shows the full name', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.fullName()).toBeVisible();
});

test('loan details page shows the communication language', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.communicationLanguage()).toBeVisible();
});

test('loan details page shows the Your Information heading', async ({ openedLoanDetails }) => {
  await expect(openedLoanDetails.yourInformation()).toBeVisible();
});
