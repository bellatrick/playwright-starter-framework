import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly formAuthenticationLink: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formAuthenticationLink = page.getByRole('link', {
      name: 'Form Authentication'
    });
    this.pageHeader = page.getByRole('heading', {
      name: 'Welcome to the-internet'
    });
  }

  async goto() {
    await this.page.goto('/');
  }
  async clickFormAuthenticationLink() {
    await this.formAuthenticationLink.click();
  }

  async getHeaderText(): Promise<string | null> {
    return await this.pageHeader.textContent();
  }
}
