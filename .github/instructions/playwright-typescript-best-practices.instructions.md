# Playwright & TypeScript Best Practices

When generating or refactoring code for this framework, strictly adhere to the following rules:

## Locators & Selectors

- **Web-First Assertions:** ALWAYS prefer user-facing attributes. Use `page.getByRole()`, `page.getByText()`, and `page.getByTestId()` over generic CSS or XPath selectors.
- **Never use exact text matches unless strictly necessary:** Prefer regex or `{ exact: false }` to avoid breaking tests due to minor copy changes.

## Synchronization (Waiting)

- **NEVER use `page.waitForTimeout()`:** This causes flaky tests.
- **Rely on Auto-waiting:** Let Playwright's web-first assertions (`await expect(locator).toBeVisible()`) handle the dynamic waiting.
- **Network Synchronization:** Use `await page.waitForURL()` or `await page.waitForResponse()` when validating state transitions like logins or form submissions.

## Page Object Model (POM) Structure

- **Locators must be private or readonly:** `readonly usernameInput: Locator;`
- **Inject Page:** The constructor must accept the `Page` object.
- **Return Types:** Action methods (e.g., `login()`, `fillForm()`) must return `Promise<void>`.
- **No Assertions in POM:** Page Objects should only define locators and actions. All `expect()` statements must reside in the `.spec.ts` files.

## Authentication

- Utilize `storageState` for reusing authentication sessions across tests to avoid redundant login flows.
