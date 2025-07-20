import { test } from '../../lib/fixtures/base.fixture';
import { items } from '../../lib/data/mock_data';

test.describe('Product Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME!);
  });

  test('should display Product page correctly', async ({ productPage }) => {
    await productPage.expectToBeOnInventoryPage("Products", "Swag Labs");
  });

  test('should be able to add product into cart', async ({ productPage, cartPage }) => {
    await productPage.expectCartIsEmpty();
    await productPage.addProductToCart(items.backpack);
    await productPage.expectCartItemCount(1);
    await productPage.gotoShoppingCart();
    await cartPage.expectItemInCart(items.backpack);
  });

  test('should navigate to the About page', async ({ productPage }) => {
    await productPage.gotoAboutPage();
  });
});