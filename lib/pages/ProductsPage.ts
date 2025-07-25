import { test, type Page, type Locator, expect } from '@playwright/test';
import { ProductsPageLocators } from '../locators/ProductsPage.locators';
import { items } from '../data/mock_data';
import cssEscape from 'css.escape';

const listItem = Object.entries(items)

export class ProductsPage {
    readonly page: Page;
    readonly titlePage: Locator;
    readonly headerLabel: Locator;
    readonly burgerMenu: Locator;
    readonly cartContainer: Locator;
    readonly inventoryList: Locator;
    readonly itemName: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator; 
    readonly aboutSidebarLink: Locator;
 

    constructor(page: Page) {
      this.page = page;
      this.titlePage = page.locator(ProductsPageLocators.titlePage);
      this.headerLabel = page.locator(ProductsPageLocators.headerLabel);
      this.burgerMenu = page.locator(ProductsPageLocators.burgerMenu);
      this.inventoryList = page.locator(ProductsPageLocators.inventoryList);
      this.itemName = page.locator(ProductsPageLocators.itemName);
      this.shoppingCartBadge = page.locator(ProductsPageLocators.shoppingCartBadge);
      this.shoppingCartLink = page.locator(ProductsPageLocators.shoppingCartLink);
      this.aboutSidebarLink = page.locator(ProductsPageLocators.aboutSidebarLink);
    }
  
    async expectToBeOnInventoryPage(title: string, label: string) {
        await test.step('Verify user is on the Inventory Page', async () => {
            await expect(this.page).toHaveURL(/.*inventory.html/);
        });

        await test.step(`Verify page title is "${title}"`,async() => {
            await expect(this.titlePage).toHaveText(title);
        })

        await test.step(`Verify page Label is "${label}"`,async() => {
            await expect(this.headerLabel).toBeVisible();
            await expect(this.headerLabel).toHaveText(label);
        })

        await test.step(`Verify humburger menu is Show`,async() => {
            await expect(this.burgerMenu).toBeVisible();
        })

        await test.step(`Verify product list is Show`,async() => {
            await expect(this.inventoryList).toBeVisible();
        })
    }

    async addProductToCart(productName: string) {
        await test.step(`Add product "${productName}" to cart`, async () => {
            const locatorString = ProductsPageLocators.addCart_Button(productName);
            await this.page.locator(locatorString).click();
          });

        await test.step(`Should change into remove button on"${productName}"`, async () => {
            const formattedName = cssEscape(productName.toLowerCase().replace(/ /g, '-'));
            const removeButton = this.page.locator(`#remove-${formattedName}`);

            await expect(removeButton).toBeVisible();
          });
        
    }

    async expectCartIsEmpty() {
        await test.step('Verify shopping cart is empty', async () => {
            await expect(this.shoppingCartBadge).toBeHidden();
        });
      }
    

    async expectCartItemCount(count: number) {
        await test.step(`Verify shopping cart count is ${count}`, async () => {
            await expect(this.shoppingCartBadge).toBeVisible();
            await expect(this.shoppingCartBadge).toHaveText(String(count));
        });
      }

    async gotoShoppingCart() {
        await test.step('Navigate to shopping cart', async () => {
          await this.shoppingCartLink.click();
        });
      }

    async gotoAboutPage() {
        await test.step('Navigate to the About page via hamburger menu', async () => {
            await this.burgerMenu.click();
            await this.aboutSidebarLink.click();
        });

        await test.step('Should change into correct URL', async () => {
            await expect(this.page).toHaveURL('https://saucelabs.com/');
        })
      }

      async addProductBaseOnText(searchText: string) {
        const lowerSearch = searchText.toLowerCase();
        for (const [key, productName] of listItem) {
          if (productName.toLowerCase().includes(lowerSearch)) {
            await test.step(`Add product "${productName}" to cart`, async () => {
              const locatorString = ProductsPageLocators.addCart_Button(productName);
              await this.page.locator(locatorString).click();
            });
          }
        }
      }

}