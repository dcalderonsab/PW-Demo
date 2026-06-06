import { test, expect } from '../../src/fixtures/base.fixture';
import * as helper from '../../src/utils/data-helpers';
import userData from '../../src/data/user-data.json' with { type: 'json' };
import type { IUserRegistrationData } from '../../src/types/userData.type';
/**
 * @fileoverview E2E tests for the login functionality.
 */


test.describe('Login Functionality', () => {
  // This is our first test case, using the fixtures we created.
  // Notice how we request `loginPage` and Playwright provides it.
  test('should allow a user to log in with valid credentials', async ({
    loginPage,
    registerPage,
    page
  }) => {
    // ARRANGE: Navigate to the login page.
    // This action is encapsulated within our LoginPage object.
    await loginPage.goto();

    // ACT: Perform the login action.
    // We use the high-level method from our page object.
    // Note: We will replace these hardcoded values with environment variables soon.
    await loginPage.clickRegisterLink()

    const newUser : IUserRegistrationData = {
        userName: helper.generateRandomName(userData.prefix),
        email: helper.generateRandomEmail(userData.prefix, userData.domain),
        password: helper.generateRandomPassword(8)
    
    };


    await registerPage.register(newUser);

    await expect(registerPage.successMessage).toBeVisible();
   
    await expect(page).toHaveURL(/.*login\.html/)

    await expect(loginPage.header).toBeVisible();



  });
});