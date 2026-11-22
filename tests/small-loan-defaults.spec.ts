import { loan } from '../data/test-data';
import { expect, test } from '../fixtures/pages.fixture';

test('default loan amount is 500', async ({ smallLoanPage }) => {
  await smallLoanPage.open();

  await expect(smallLoanPage.amount()).toHaveValue(loan.defaultAmount);
});

test('default loan period is 12 months', async ({ smallLoanPage }) => {
  await smallLoanPage.open();

  // The period is a select, so the selected option value is asserted.
  await expect(smallLoanPage.period()).toHaveValue(loan.defaultPeriodMonths);
});

test('default monthly payment is 42.8 €', async ({ smallLoanPage }) => {
  await smallLoanPage.open();

  await expect(smallLoanPage.monthlyPayment()).toHaveText(loan.defaultMonthlyPayment);
});
