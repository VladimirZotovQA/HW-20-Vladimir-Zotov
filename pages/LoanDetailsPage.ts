import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoanDetailsPage extends BasePage {
  private readonly loanDetailsHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: 'Loan Details',
  });

  private readonly yourInformationHeading: Locator = this.page.getByRole('heading', {
    level: 1,
    name: 'Your Information',
  });

  // The amount, payment and period are spans with no accessible name.
  private readonly amountText: Locator = this.page.getByTestId('final-page-amount');

  private readonly monthlyPaymentText: Locator = this.page.getByTestId('final-page-monthly-payment');

  private readonly periodText: Locator = this.page.getByTestId('final-page-period');

  // The name label is not tied to the input.
  private readonly fullNameInput: Locator = this.page.getByTestId('final-page-full-name');

  // The language label is not tied to the select.
  private readonly communicationLanguageSelect: Locator = this.page.getByTestId(
    'final-page-communication-language',
  );

  heading(): Locator {
    return this.loanDetailsHeading;
  }

  yourInformation(): Locator {
    return this.yourInformationHeading;
  }

  amount(): Locator {
    return this.amountText;
  }

  monthlyPayment(): Locator {
    return this.monthlyPaymentText;
  }

  period(): Locator {
    return this.periodText;
  }

  fullName(): Locator {
    return this.fullNameInput;
  }

  communicationLanguage(): Locator {
    return this.communicationLanguageSelect;
  }
}
