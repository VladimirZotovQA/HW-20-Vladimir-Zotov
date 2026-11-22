import { type Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  // Opens a path relative to baseURL from playwright.config.ts.
  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
