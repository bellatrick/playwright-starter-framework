import { expect, Locator, Page } from '@playwright/test';export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
    this.pageHeader = page.getByRole('heading', { name: 'Login Page' });
  }

  async goto() {
    await this.page.goto('/login');
  }
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getFlashMessageText(): Promise<string | null> {
    await this.flashMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.flashMessage.textContent();
  }
  async expectOnLoginPage(){
    await expect(this.pageHeader).toBeVisible()
    expect(this.page.url()).toContain('/login')
  }
}
