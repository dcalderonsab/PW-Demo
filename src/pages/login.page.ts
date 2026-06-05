import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * @fileoverview Represents the Login Page of the application.
 * Encapsulates all the elements and actions related to the login functionality.
 */
export class LoginPage extends BasePage {
  // Locators are private and readonly, accessed only via public methods.
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators using resilient strategies as per our rules.
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // This is a placeholder selector. We'd use a more robust one like a data-testid if available.
    this.errorMessage = page.locator('.error-message');
  }

  /**
   * Navigates to the login page of the application.
   */
  async goto() {
    // Assumes baseURL is set in playwright.config.ts, so this navigates to baseURL + /login
    await super.goto('/login');
  }

  /**
   * Fills the login form with credentials and submits it.
   * @param email The user's email.
   * @param password The user's password.
   */
  async login(email: string, password?: string) {
    await this.writeText(this.emailInput, email);
    if (password) {
      await this.writeText(this.passwordInput, password);
    }
    await this.clickElement(this.loginButton);
  }
}