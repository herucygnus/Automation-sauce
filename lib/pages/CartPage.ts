import { test, type Page, type Locator, expect } from '@playwright/test';
import { CartPageLocators } from '../locators/CartPage.locators';

export class CartPage {
  readonly page: Page;
  readonly cartItemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemName = page.locator(CartPageLocators.cartItemName);
  }

  async expectItemInCart(productName: string) {
    await test.step(`Verify item "${productName}" is in the cart`, async () => {
      await expect(this.cartItemName.getByText(productName)).toBeVisible();
    });
  }
}