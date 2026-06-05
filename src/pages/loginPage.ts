import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * @fileoverview Represents the Login Page of the application.
 * Encapsulates all the elements and actions related to the login functionality.
 */
export class LoginPage extends BasePage {
  // Locators are private and readonly, accessed only via public methods.
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signIngButton: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly userNameError: Locator;
  private readonly passwordError: Locator;
  private readonly registerLink: Locator;

  /**
   * @param page The Playwright Page object.
   */

  constructor(page: Page) {
    super(page);

    // Initialize locators using resilient strategies as per our rules.
    this.userNameInput = page.locator('[id=username]');
    this.passwordInput = page.locator('[id=password]');
    this.rememberMeCheckbox = page.locator('[id=remember-me]');
    this.signIngButton = page.getByRole('button', { name: 'Sign In' });
    this.userNameError = page.locator('[id=username-error]');
    this.passwordError = page.locator('[id=password-error]');
    this.registerLink = page.getByRole('link', { name: 'Register here' })
  }

  /**
   * Navigates to the login page of the application.
   */
  async goto() {
    // Assumes baseURL is set in playwright.config.ts, so this navigates to baseURL + '/login'
    await super.goto('/login');
  }

  /**
   * Fills the login form with credentials and submits it.
   * @param email The user's email.
   * @param password The user's password.
   */
  async login(email: string, password?: string) {
    await this.writeText(this.userNameInput, email);
    if (password) {
      await this.writeText(this.passwordInput, password);
    }
    await this.clickElement(this.signIngButton);
  }

  /**
   * Clicks the 'Register here' link to navigate to the registration page.
   */
  async clickRegisterLink() {
    await this.clickElement(this.registerLink);
  }
}