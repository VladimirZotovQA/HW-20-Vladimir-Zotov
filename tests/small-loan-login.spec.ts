import { expect, test } from '../fixtures/pages.fixture';

test('login form is visible after Apply Now', async ({ smallLoanPage, loginPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.clickApplyNow();

  await expect(loginPage.heading()).toBeVisible();
});

test('login form has a username field', async ({ smallLoanPage, loginPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.clickApplyNow();

  await expect(loginPage.username()).toBeVisible();
});

test('login form has a password field', async ({ smallLoanPage, loginPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.clickApplyNow();

  await expect(loginPage.password()).toBeVisible();
});

test('login form has a continue button', async ({ smallLoanPage, loginPage }) => {
  await smallLoanPage.open();
  await smallLoanPage.clickApplyNow();

  await expect(loginPage.continueButton()).toBeVisible();
});
