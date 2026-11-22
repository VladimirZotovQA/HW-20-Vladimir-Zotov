import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // The popup is a div with no dialog role. This heading is its accessible title.
  private readonly loginHeading: Locator = this.page.getByRole('heading', {
    level: 2,
    name: 'Login',
  });

  // Placeholders provide the accessible names. There are no label elements.
  private readonly usernameInput: Locator = this.page.getByRole('textbox', { name: 'Username' });

  private readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' });

  // The submit control is labelled Continue and stays disabled until both fields are filled.
  private readonly continueButtonLocator: Locator = this.page.getByRole('button', { name: 'Continue' });

  heading(): Locator {
    return this.loginHeading;
  }

  username(): Locator {
    return this.usernameInput;
  }

  password(): Locator {
    return this.passwordInput;
  }

  continueButton(): Locator {
    return this.continueButtonLocator;
  }

  // Continue stays disabled until both fields are filled. click() waits for that.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.continueButtonLocator.click();
  }
}
