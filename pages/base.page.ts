import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { config } from '../config/env.config';
import { Logger } from '../utils/logger';

/**
 * Base page object class
 * Provides common functionality inherited by all page objects
 */
export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = config.baseUrl;
  }

  /**
   * Navigate to a page path
   * @param path - Optional path to append to base URL
   */
  async navigateTo(path: string = ''): Promise<void> {
    const url = path ? `${this.baseUrl}${path}` : this.baseUrl;
    Logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageReady();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageReady(): Promise<void> {
    Logger.debug('Waiting for page to be ready');
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
        // Network idle may not always be achievable, continue anyway
        Logger.warn('Page did not reach network idle state');
      });
    } catch (error) {
      Logger.warn('Error waiting for page ready', { error: String(error) });
    }
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Assert that current URL contains a specific value
   */
  async assertUrlContains(value: string): Promise<void> {
    Logger.info(`Asserting URL contains: ${value}`);
    await expect(this.page).toHaveURL(new RegExp(value));
  }

  /**
   * Assert that current URL matches exactly
   */
  async assertUrlEquals(url: string): Promise<void> {
    Logger.info(`Asserting URL equals: ${url}`);
    await expect(this.page).toHaveURL(url);
  }

  /**
   * Get current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Reload current page
   */
  async reload(): Promise<void> {
    Logger.info('Reloading page');
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForPageReady();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    Logger.info('Going back in browser history');
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
    await this.waitForPageReady();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    Logger.info('Going forward in browser history');
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
    await this.waitForPageReady();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element exists on page
   */
  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get text content of an element
   */
  async getElementText(selector: string): Promise<string> {
    return this.page
      .locator(selector)
      .textContent({ timeout: 5000 })
      .then((text) => text || '');
  }

  /**
   * Get attribute value of an element
   */
  async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
    return this.page.locator(selector).getAttribute(attribute, { timeout: 5000 });
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementToHide(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    Logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  /**
   * Get all text from page body
   */
  async getPageText(): Promise<string> {
    return this.page
      .locator('body')
      .textContent()
      .then((text) => text || '');
  }

  /**
   * Assert page title contains text
   */
  async assertPageTitleContains(text: string): Promise<void> {
    Logger.info(`Asserting page title contains: ${text}`);
    await expect(this.page).toHaveTitle(new RegExp(text));
  }

  /**
   * Wait for specific text to appear on page
   */
  async waitForText(text: string, timeout = 30000): Promise<void> {
    Logger.info(`Waiting for text: ${text}`);
    await this.page.waitForFunction(
      (searchText) => document.body.textContent?.includes(searchText),
      text,
      { timeout }
    );
  }

  /**
   * Clear browser cookies
   */
  async clearCookies(): Promise<void> {
    Logger.info('Clearing browser cookies');
    await this.page.context().clearCookies();
  }

  /**
   * Set browser cookies
   */
  async setCookies(cookies: any[]): Promise<void> {
    Logger.info(`Setting ${cookies.length} cookies`);
    await this.page.context().addCookies(cookies);
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string): Promise<void> {
    Logger.debug(`Pressing key: ${key}`);
    await this.page.press('body', key);
  }

  /**
   * Accept browser dialog
   */
  async acceptDialog(): Promise<void> {
    this.page.once('dialog', (dialog) => {
      Logger.info(`Accepting dialog: ${dialog.message()}`);
      dialog.accept();
    });
  }

  /**
   * Dismiss browser dialog
   */
  async dismissDialog(): Promise<void> {
    this.page.once('dialog', (dialog) => {
      Logger.info(`Dismissing dialog: ${dialog.message()}`);
      dialog.dismiss();
    });
  }
}
