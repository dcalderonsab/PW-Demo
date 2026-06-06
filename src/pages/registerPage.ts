import {type Locator, type Page} from '@playwright/test';
import { BasePage } from './BasePage';
import { IUserRegistrationData } from '../types/userData.type';

export class RegisterPage extends BasePage{

    
   readonly userNameInput: Locator;
   readonly emailInput: Locator;
   readonly passwordInput: Locator;
   readonly confirmPasswordInput: Locator;
   readonly registerButton: Locator;
   readonly successMessage: Locator;


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
    this.successMessage = page.getByText('Registration successful!');
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
  async register(user: IUserRegistrationData) {
    await this.writeText(this.userNameInput, user.userName);
    await this.writeText(this.emailInput, user.email);
    await this.writeText(this.passwordInput, user.password);
    await this.writeText(this.confirmPasswordInput, user.password);
    await this.clickElement(this.registerButton);
  }


}