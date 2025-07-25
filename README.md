# Playwright Test Automation for SauceDemo

This repository contains an end-to-end (E2E) test automation framework for the [SauceDemo](https://www.saucedemo.com/) website, built with Playwright and TypeScript.

## 🚀 About This Project

This project provides a suite of automated tests covering critical user flows of the SauceDemo e-commerce site. The framework is built to be scalable, maintainable, and easy to understand, following modern automation best practices.

### Key Features
* **Page Object Model (POM):** A clean separation between test logic (`specs`), page elements (`locators`), and page actions (`pages`).
* **Environment-based Configuration:** Securely manages credentials and base URLs using `.env` files, keeping sensitive data out of the codebase.
* **Dynamic Locators:** Implements functions to generate locators dynamically, making the framework scalable for elements that share a common pattern (e.g., "Add to Cart" buttons).
* **Data-Driven Testing:** Supports running test cases with multiple data sets to validate various scenarios efficiently.
* **CSS Escaping:** Utilizes the `css.escape` library to handle special characters in CSS selectors.

## ✅ Covered Test Cases

This framework currently automates the following primary test scenarios:

1.  **Add Product to Cart (Data-Driven):**
    * Logs in as a standard user.
    * Verifies that the shopping cart is initially empty.
    * Adds a product (e.g., "Sauce Labs Backpack", "Sauce Labs Fleece Jacket") to the cart based on test data.
    * Verifies that the cart icon updates to show the correct number of items.
    * Navigates to the cart page and verifies that the selected product is listed correctly.

2.  **Navigate to the 'About' Page:**
    * Logs in as a standard user.
    * Clicks the hamburger menu button.
    * Clicks the 'About' link from the sidebar.
    * Verifies that the page successfully navigates to the Sauce Labs corporate website.

3.  **Add Product to Cart Based on Text/Search:**
    * Logs in as a standard user.
    * Searches for a product using the search bar or selects it based on displayed text.
    * Adds the product to the cart.
    * Verifies that the cart icon updates to reflect the added product.
    * Confirms that the product is listed correctly on the cart page.

## 🛠️ Tech Stack

* **Framework:** [Playwright](https://playwright.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Dependencies:** 
  * `dotenv` for environment variable management.
  * `css.escape` for handling special characters in CSS selectors.

## ⚙️ Setup & Execution

### Dependencies Needed
* [Node.js](https://nodejs.org/) (latest LTS version is recommended).
* A code editor like [VS Code](https://code.visualstudio.com/).

### Steps to Execute

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/herucygnus/automation-sauce.git
    cd automation-sauce
    ```

2.  **Install Dependencies**
    This command installs Playwright and other required packages from `package.json`.
    ```bash
    npm install
    npx playwright install  
    ```

3.  **Create and Configure the Environment File**
    * Make a copy of `.env.example` and rename it to `.env`.
    * The `.env` file already contains the necessary credentials for the SauceDemo website. No changes are needed to run the tests.
    ```
    # .env file content
    BASE_URL=[https://www.saucedemo.com](https://www.saucedemo.com)
    STANDARD_USERNAME=standard_user
    # ...other users
    PASSWORD=secret_sauce
    ```

### Command Lines to Execute

All commands should be run from the root directory of the project.

* **Run all tests in headless mode:**
    ```bash
    npx playwright test
    ```
* **Run all tests in headed mode (UI will be visible):**
    ```bash
    npx playwright test --headed
    ```
* **Run a specific test file:**
    ```bash
    npx playwright test e2e/specs/product.spec.ts
    ```
* **View the HTML Report after a run:**
    ```bash
    npx playwright show-report

