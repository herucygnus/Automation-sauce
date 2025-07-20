import { test } from '../../lib/fixtures/base.fixture';

test.describe('SauceDemo Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display login page elements correctly', async ({ loginPage }) => {
    await loginPage.expectPageTitleIsCorrect("Swag Labs");
    await Promise.all([
      loginPage.expectLoginLogosVisible(),
      loginPage.expectUsernameLabelIsVisible(),
      loginPage.expectPasswordLabelIsVisible(),
      loginPage.expectPlaceholderIsVisible()
    ]);
  });

  test('should allow a standard user to log in successfully', async ({ loginPage }) => {
    await loginPage.login(process.env.STANDARD_USERNAME!);
  });

  test('should show an error for a locked out user', async ({ loginPage }) => {
    await loginPage.login(process.env.LOCKED_OUT_USERNAME!);
    await loginPage.expectErrorMessage('Sorry, this user has been locked out.');
  });
});