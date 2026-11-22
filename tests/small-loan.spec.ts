import { expect, test } from '../fixtures/pages.fixture';

test('small loan page loads the monthly payment calculator', async ({ smallLoanPage }) => {
  await smallLoanPage.open();

  await expect(smallLoanPage.calculatorHeading).toBeVisible();
});
