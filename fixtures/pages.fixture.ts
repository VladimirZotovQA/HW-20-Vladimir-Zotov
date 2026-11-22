import { test as base } from '@playwright/test';
import { user } from '../data/test-data';
import { LoanDetailsPage } from '../pages/LoanDetailsPage';
import { LoginPage } from '../pages/LoginPage';
import { SmallLoanPage } from '../pages/SmallLoanPage';

type PageFixtures = {
  smallLoanPage: SmallLoanPage;
  loginPage: LoginPage;
  loanDetailsPage: LoanDetailsPage;
  // Opens the calculator, applies, and logs in. Runs once per test that asks for it.
  openedLoanDetails: LoanDetailsPage;
};

export const test = base.extend<PageFixtures>({
  smallLoanPage: async ({ page }, use) => {
    await use(new SmallLoanPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loanDetailsPage: async ({ page }, use) => {
    await use(new LoanDetailsPage(page));
  },
  openedLoanDetails: async ({ smallLoanPage, loginPage, loanDetailsPage }, use) => {
    await smallLoanPage.open();
    await smallLoanPage.clickApplyNow();
    await loginPage.login(user.username, user.password);
    await use(loanDetailsPage);
  },
});

export { expect } from '@playwright/test';
