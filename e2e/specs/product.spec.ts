import { test } from '@playwright/test';
import { LoginPage } from '../../lib/pages/LoginPage';
import { ProductsPage } from '../../lib/pages/ProductsPage';
import { items } from '../../lib/data/mock_data';
import { CartPage } from '../../lib/pages/CartPage';

test.describe('Product Functionality', () => {
  
  // Lakukan login sebelum setiap tes di file ini
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USERNAME!);
  });

  test('should display Product page correctly', async ({ page }) => {
    const productPages = new ProductsPage(page);

    await productPages.expectToBeOnInventoryPage(
      "Products", 
      "Swag Labs"
    )
    //await page.pause();
  });

  test('should be able to add product into cart', async ({ page }) => {
    const productPages = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productPages.expectCartIsEmpty();

    await productPages.addProductToCart(items.backpack); //this item can be dynamic base on what item want to add
    await productPages.expectCartItemCount(1);

    await productPages.gotoShoppingCart();
    await cartPage.expectItemInCart(items.backpack);
    //await page.pause();
  });

  test('should navigate to the About page from the hamburger menu', async ({ page }) => {
    const productPages = new ProductsPage(page);

    await productPages.gotoAboutPage();
  });

});