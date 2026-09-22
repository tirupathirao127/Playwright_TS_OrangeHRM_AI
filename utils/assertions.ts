import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Custom assertion helpers for common test validations
 */
export class CustomAssertions {
  /**
   * Assert that an element contains any text
   */
  static async elementHasText(element: any, text: string): Promise<void> {
    await expect(element).toContainText(text);
  }

  /**
   * Assert that a page contains specific text
   */
  static async pageHasText(page: Page, text: string): Promise<void> {
    await expect(page.locator('body')).toContainText(text);
  }

  /**
   * Assert that an element is visible
   */
  static async elementIsVisible(element: any): Promise<void> {
    await expect(element).toBeVisible();
  }

  /**
   * Assert that an element is hidden
   */
  static async elementIsHidden(element: any): Promise<void> {
    await expect(element).toBeHidden();
  }

  /**
   * Assert that an element is enabled
   */
  static async elementIsEnabled(element: any): Promise<void> {
    await expect(element).toBeEnabled();
  }

  /**
   * Assert that an element is disabled
   */
  static async elementIsDisabled(element: any): Promise<void> {
    await expect(element).toBeDisabled();
  }

  /**
   * Assert that an input has a specific value
   */
  static async inputHasValue(element: any, value: string): Promise<void> {
    await expect(element).toHaveValue(value);
  }

  /**
   * Assert that page URL contains text
   */
  static async urlContains(page: Page, urlPart: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(urlPart));
  }

  /**
   * Assert that page URL matches exactly
   */
  static async urlMatches(page: Page, url: string): Promise<void> {
    await expect(page).toHaveURL(url);
  }

  /**
   * Assert that an element count matches expected
   */
  static async elementCountIs(elements: any, count: number): Promise<void> {
    await expect(elements).toHaveCount(count);
  }

  /**
   * Assert that page title contains text
   */
  static async pageTitleContains(page: Page, titleText: string): Promise<void> {
    await expect(page).toHaveTitle(new RegExp(titleText));
  }

  /**
   * Assert that an element attribute equals value
   */
  static async elementAttributeEquals(
    element: any,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(element).toHaveAttribute(attribute, value);
  }

  /**
   * Assert that an element class contains specific class
   */
  static async elementHasClass(element: any, className: string): Promise<void> {
    const classAttribute = await element.getAttribute('class');
    expect(classAttribute).toContain(className);
  }

  /**
   * Assert that an alert dialog is visible
   */
  static async alertIsVisible(page: Page): Promise<void> {
    const alertLocator = page.locator('[role="alert"], .alert, .error');
    await expect(alertLocator).toBeVisible({ timeout: 5000 });
  }

  /**
   * Assert that a success message is visible
   */
  static async successMessageIsVisible(page: Page): Promise<void> {
    const successLocator = page.locator(
      '[role="alert"]:has-text("success"), .success, .alert-success'
    );
    await expect(successLocator).toBeVisible({ timeout: 5000 });
  }

  /**
   * Assert that table has specific number of rows
   */
  static async tableHasRows(table: any, rowCount: number): Promise<void> {
    const rows = table.locator('tbody tr, tr');
    await expect(rows).toHaveCount(rowCount);
  }

  /**
   * Assert element existence (visible or not)
   */
  static async elementExists(element: any): Promise<void> {
    const count = await element.count();
    expect(count).toBeGreaterThan(0);
  }

  /**
   * Assert element does not exist
   */
  static async elementDoesNotExist(element: any): Promise<void> {
    const count = await element.count();
    expect(count).toBe(0);
  }
}
