import { test as setup, expect } from '../../../src/fixtures/base.fixture';

setup('Authentication and saving session', async ({ loginPage, page }) => {
  await loginPage.goto();

  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await expect(loginPage.loginAlert).toBeVisible();
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
