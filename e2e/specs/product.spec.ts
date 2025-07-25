import { test } from '../../lib/fixtures/base.fixture';
import { items } from '../../lib/data/mock_data';

const listItem = Object.entries(items)

test.describe('Product Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME!);
  });

  test('should display Product page correctly', async ({ productPage }) => {
    await productPage.expectToBeOnInventoryPage("Products", "Swag Labs");
  });

  for (const [key, value] of listItem) {
    test(`should display product "${key}" correctly`, async ({ cartPage, productPage }) => {
      await productPage.expectCartIsEmpty();
      await productPage.addProductToCart(value);
      await productPage.expectCartItemCount(1);
      await productPage.gotoShoppingCart();
      await cartPage.expectItemInCart(value);
  });
  }
  test('should navigate to the About page', async ({ productPage }) => {
    await productPage.gotoAboutPage();
  });

  test('should be able to add base on text/search', async ({ productPage, page }) => {
    await productPage.addProductBaseOnText("shirt");
    //await page.pause();
    
  });
});