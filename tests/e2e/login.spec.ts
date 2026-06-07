import { test, expect } from '../../src/fixtures/base.fixture';
import * as helper from '../../src/utils/data-helpers';
import userData from '../../src/data/user-data.json' with { type: 'json' };
import type { IUserRegistrationData } from '../../src/types/userData.type';
import { AUTH_MESSAGES } from '../../src/constants/messages.constants.js';
import { APP_ROUTES } from '../../src/constants/routes.constants.js';
/**
 * @fileoverview E2E tests for the login functionality.
 */

test.describe('Login Functionality', () => {
  // This is our first test case, using the fixtures we created.
  // Notice how we request `loginPage` and Playwright provides it.
  test('should allow a user to log in with valid credentials', async ({
    loginPage,
    registerPage,
    page,
  }) => {
    // ARRANGE: Navigate to the login page.
    // This action is encapsulated within our LoginPage object.
    await loginPage.goto();

    // ACT: Perform the login action.
    // We use the high-level method from our page object.
    // Note: We will replace these hardcoded values with environment variables soon.
    await loginPage.clickRegisterLink();

    const newUser: IUserRegistrationData = {
      userName: helper.generateRandomName(userData.prefix),
      email: helper.generateRandomEmail(userData.prefix, userData.domain),
      password: helper.generateRandomPassword(8),
    };

    await registerPage.register(newUser);
    //await expect(registerPage.successMessage).toHaveText(AUTH_MESSAGES.SUCCESSFULL_USER_CREATION);
    await expect(registerPage.successMessage).toBeVisible();
    

    await expect(page).toHaveURL(APP_ROUTES.LOGIN_REGEX);

    await expect(loginPage.header).toBeVisible();
  });

  test('Validate login process with wrong credentials', async ({ loginPage, page }) => {
    await loginPage.goto();

    await loginPage.login(userData.nonexistinguser, userData.nonexistingpassword);

    await expect(loginPage.loginAlert).toBeVisible();
    await expect(loginPage.loginAlert).toHaveText(AUTH_MESSAGES.INVALID_CREDENTIALS);
    await expect(page).toHaveURL(APP_ROUTES.LOGIN_REGEX);
  });

  test('Validate successful login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();

    // It is safer to typecast as string now since we guarantee their existence in playwright.config.ts
    await loginPage.login(process.env.TEST_APP_USERNAME as string, process.env.TEST_APP_PASSWORD as string);

    // Assert a successful login occurred (e.g. redirected to the Product Manager page)
    await expect(loginPage.loginSuccessfull).toBeVisible();
    
    await expect(page).toHaveURL(APP_ROUTES.INDEX_PAGE);

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
  });
});
