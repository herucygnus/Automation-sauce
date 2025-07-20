import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Functionality', () => {

  test('should display login page elements correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.expectPageTitleIsCorrect("Swag Labs");
    await loginPage.expectLoginLogosVisible();
    await loginPage.expectUsernameLabelIsVisible();
    await loginPage.expectPasswordLabelIsVisible();
    await loginPage.expectPlaceholderIsVisible();

    // await page.pause();
  });

  test('should allow a standard user to log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME!;

    await loginPage.goto();
    await loginPage.login(username);

    //await page.pause();
  });

  test('should show an error for a locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.LOCKED_OUT_USERNAME!;

    await loginPage.goto();
    await loginPage.login(username);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');

    //await page.pause();
  });
  
});