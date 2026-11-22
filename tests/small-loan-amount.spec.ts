import { loan } from '../data/test-data';
import { expect, test } from '../fixtures/pages.fixture';

// Matches any non-empty payment text except the default. The span starts empty.
const paymentOtherThanDefault = new RegExp(
  `^(?!${loan.defaultMonthlyPayment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$).+`,
);

test('amount field shows the updated loan amount', async ({ smallLoanPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.setLoanAmount(loan.updatedAmount);

  await expect(smallLoanPage.amount()).toHaveValue(loan.updatedAmount);
});

test('monthly payment changes after the loan amount is updated', async ({ smallLoanPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.setLoanAmount(loan.updatedAmount);

  await expect(smallLoanPage.monthlyPayment()).toHaveText(paymentOtherThanDefault);
});

test('monthly payment matches the value for the updated loan amount', async ({ smallLoanPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.setLoanAmount(loan.updatedAmount);

  await expect(smallLoanPage.monthlyPayment()).toHaveText(loan.updatedMonthlyPayment);
});
