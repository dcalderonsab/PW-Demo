import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  /**
   * @param page The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates the page to the specified URL.
   * @param url The URL to navigate to.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Clicks a given element.
   * @param element The Playwright Locator to be clicked.
   */
  async clickElement(element: Locator) {
    await element.click();
  }

  /**
   * Waits for an element to be visible and then fills it with the provided text.
   * @param element The Playwright Locator to write into.
   * @param text The text to be written into the element.
   */
  async writeText(element: Locator, text: string) {
    await element.waitFor({ state: 'visible' });
    await element.fill(text);
  }
}