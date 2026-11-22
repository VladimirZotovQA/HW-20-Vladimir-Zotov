import { type Locator } from '@playwright/test';
import { paths } from '../data/test-data';
import { BasePage } from './BasePage';

export class SmallLoanPage extends BasePage {
  // Main heading rendered on /small-loan after the React app loads.
  readonly calculatorHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: 'Calculate your monthly payment',
  });

  // The amount label is not tied to the input, so the spinbutton role is used.
  private readonly amountInput: Locator = this.page.getByRole('spinbutton');

  // The period label is not tied to the select, so the combobox role is used.
  private readonly periodSelect: Locator = this.page.getByRole('combobox');

  // The payment is a span with no accessible role.
  private readonly monthlyPaymentText: Locator = this.page.getByTestId(
    'ib-small-loan-calculator-field-monthlyPayment',
  );

  private readonly applyNowButton: Locator = this.page.getByRole('button', { name: 'Apply Now' });

  async open(): Promise<void> {
    await super.open(paths.smallLoan);
  }

  // Locators, not strings, so tests can use auto-retrying matchers.
  amount(): Locator {
    return this.amountInput;
  }

  period(): Locator {
    return this.periodSelect;
  }

  monthlyPayment(): Locator {
    return this.monthlyPaymentText;
  }

  // The number input updates React state on change. No blur or Enter is required.
  async setLoanAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  async clickApplyNow(): Promise<void> {
    await this.applyNowButton.click();
  }
}
