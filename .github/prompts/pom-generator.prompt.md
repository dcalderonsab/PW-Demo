# Prompt: Generate Page Object Model Class

**Context:** I need to create a new Page Object Model class for the Playwright framework.

**Instructions:**
Generate a TypeScript class following these exact specifications:

1.  Name the class based on the requested page (e.g., `DashboardPage`).
2.  Import `Page` and `Locator` from `@playwright/test`.
3.  Declare at least 3 common `readonly` locators for this type of page.
4.  Create a constructor that accepts a `page: Page` and initializes the locators using `this.page.getByRole` or `this.page.locator`.
5.  Create at least one async action method that interacts with these locators.
6.  Ensure no `expect` assertions are included inside the class.
7.  Format the code using 2 spaces for indentation and single quotes.

**Example Request:** "Generate a POM for a ShoppingCart page."
