import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * @fileoverview E2E tests for the login functionality.
 */

// We can group related tests using test.describe.
test.describe('Login Functionality', () => {
  // This is our first test case, using the fixtures we created.
  // Notice how we request `loginPage` and Playwright provides it.
  test('should allow a user to log in with valid credentials', async ({
    loginPage,
    page,
  }) => {
    // ARRANGE: Navigate to the login page.
    // This action is encapsulated within our LoginPage object.
    await loginPage.goto();

    // ACT: Perform the login action.
    // We use the high-level method from our page object.
    // Note: We will replace these hardcoded values with environment variables soon.
    await loginPage.login('testuser@example.com', 'a-secure-password');

    // ASSERT: Verify the outcome of the login.
    // A good assertion checks for a visible side-effect, like a URL change or a welcome message.
    // Here, we expect the URL to contain '/dashboard'.
    await expect(page).toHaveURL(/.*dashboard/);
  });
});