import {type Locator, type Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage{

    
  private readonly userNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;

  /**
   * @param page The Playwright Page object.
   */
  constructor(page: Page) {
    super(page);

    this.userNameInput = page.locator('[id=reg-username]');
    this.emailInput = page.locator('[id=reg-email]');
    this.passwordInput = page.locator('[id=reg-password]');
    this.confirmPasswordInput = page.locator('[id=reg-confirm-password]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  /**
   * Navigates to the registration page.
   */
  async goto() {
    await super.goto('/register');
  }

  /**
   * Fills the registration form and submits it.
   */
  async register(user: { firstName: string; lastName: string; email: string; password: string }) {
    await this.writeText(this.userNameInput, user.firstName);
    await this.writeText(this.emailInput, user.email);
    await this.writeText(this.passwordInput, user.password);
    await this.writeText(this.confirmPasswordInput, user.password);
    await this.clickElement(this.registerButton);
  }


}