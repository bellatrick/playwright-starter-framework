import { expect, Locator, Page } from '@playwright/test';
export class SecureAreaPage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly successMessage: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = this.page.locator("//i[@class='icon-2x icon-signout']");
    this.successMessage = this.page.locator('#flash');
    this.pageHeader = this.page.locator('//h2[normalize-space()="Secure Area"]');
  }

  async getSuccessMessageText(): Promise<string | null> {
    await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.successMessage.textContent();
  }

  async clickLogoutButton(){
    await this.logoutButton.click()
  }
  async expectOnSecureAreaPage(timeout=500){
    await expect(this.pageHeader).toBeVisible({timeout})
    await expect(this.successMessage).toBeVisible({timeout})
    await expect(this.page.url()).toContain('/secure')
  }
}
