import { test as baseTest } from '@playwright/test';

// Import future Page Object classes.
// Although these files do not exist yet, we define them here to establish the structure.
import { LoginPage } from '../pages/loginPage';
import { ProductManagerPage } from '../pages/productManagerPage';

/**
 * @fileoverview This file defines the custom Playwright fixtures for the project.
 * It extends the base Playwright test object to automatically inject
 * instances of Page Object classes into the tests and promoting dependency injection.
 */

// 1. Define the type for our custom fixtures.
// This provides autocompletion and type-checking in the tests.
export type tAppFixtures = {
  loginPage: LoginPage;
  registerPage: ProductManagerPage;

};

// 2. Extend the Playwright test with our custom fixtures.
export const test = baseTest.extend<tAppFixtures>({
  // Fixture for LoginPage: it will run once per test that needs it.
  loginPage: async ({ page }, use) => {
    // Creates an instance of LoginPage and passes it to the test.
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new ProductManagerPage(page));
  },

});

// 3. Re-export expect to have a single source of truth for imports in tests.
export { expect } from '@playwright/test';