import { test, type Page, type Locator, expect } from '@playwright/test';
import { LoginPageLocators } from './LoginPage.locators';

export class LoginPage {
  readonly page: Page;
  readonly loginLogo: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLogo = page.locator(LoginPageLocators.loginLogo);
    this.usernameInput = page.locator(LoginPageLocators.usernameInput);
    this.passwordInput = page.locator(LoginPageLocators.passwordInput);
    this.loginButton = page.locator(LoginPageLocators.loginButton);
    this.errorMessage = page.locator(LoginPageLocators.errorMessage);
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password?: string) {
    await test.step(`Attempting to log in with user: ${username}`, async () => {
      await this.usernameInput.fill(username);
      // Password bersifat opsional, karena semua user pakai password yang sama
      await this.passwordInput.fill(password || process.env.PASSWORD!);
      await this.loginButton.click();
    });
  }

  async expectErrorMessage(message: string) {
    await test.step(`Verify error message is "${message}"`, async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(message);
    });
  }

  async expectPageTitleIsCorrect(title: string) {
    await test.step(`Verify page title is "${title}"`,async() => {
      await expect(this.page).toHaveTitle(title);
    })
  }

  async expectLoginLogosVisible() {
    await test.step('Verify Swag Labs is visible', async() => {
      await expect(this.loginLogo).toBeVisible();
    })
  }

  async expectUsernameLabelIsVisible() {
    await test.step('Verify username lable is visible', async() => {
      await expect(this.usernameInput).toBeVisible();
    })
  }

  async expectPasswordLabelIsVisible() {
    await test.step('Verify password lable is visible', async() => {
      await expect(this.passwordInput).toBeVisible();
    })
  }

  async expectPlaceholderIsVisible(){
    await test.step('Verify placeholder is visible', async() => {
      await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');
      await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
    })
  }

}