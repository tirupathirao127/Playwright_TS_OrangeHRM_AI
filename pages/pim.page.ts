import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

/**
 * PIM (People/Employee) module page object
 */
export class PimPage extends BasePage {
  // Locators
  private pimHeading = this.page
    .getByRole('heading', { name: /employee information|pim/i })
    .first();
  private employeeNameInput = this.page
    .locator('.oxd-input-group', { hasText: 'Employee Name' })
    .locator('input');
  private searchButton = this.page.getByRole('button', { name: /search|find/i }).first();
  private addEmployeeButton = this.page.getByRole('button', { name: /add|create.*employee/i });
  private employeeTable = this.page.locator('table, [role="table"]').first();
  private noRecordsMessage = this.page.locator('[class*="empty"], text=/no records/i').first();

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to PIM module
   */
  async navigateToPim(): Promise<void> {
    Logger.info('Navigating to PIM module');
    await this.navigateTo('/web/index.php/pim/viewPimModule');
  }

  /**
   * Check if PIM page is loaded
   */
  async isPimPageLoaded(): Promise<boolean> {
    try {
      await this.pimHeading.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Search for employee by name
   */
  async searchEmployee(firstName: string, lastName?: string): Promise<void> {
    Logger.info(`Searching for employee: ${firstName} ${lastName || ''}`);

    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

    if (fullName) {
      await this.employeeNameInput.fill(fullName);
      // Dismiss the autocomplete suggestions dropdown so it doesn't intercept the click
      await this.page.keyboard.press('Escape');
    }

    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after search');
    });
  }

  /**
   * Check if search results are displayed
   */
  async isSearchResultsDisplayed(): Promise<boolean> {
    const tableVisible = await this.employeeTable
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (tableVisible) {
      return true;
    }

    return await this.noRecordsMessage
      .waitFor({ state: 'visible', timeout: 3000 })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Get number of search results
   */
  async getSearchResultCount(): Promise<number> {
    try {
      const rows = this.page.locator('table tbody tr, [role="row"]');
      return await rows.count();
    } catch {
      return 0;
    }
  }

  /**
   * Check if no records message is displayed
   */
  async isNoRecordsMessageVisible(): Promise<boolean> {
    try {
      await this.noRecordsMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click on first search result
   */
  async clickFirstSearchResult(): Promise<void> {
    Logger.info('Clicking first search result');
    const firstRow = this.page.locator('table tbody tr, [role="row"]').first();
    await firstRow.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after clicking result');
    });
  }

  /**
   * Click Add Employee button
   */
  async clickAddEmployee(): Promise<void> {
    Logger.info('Clicking Add Employee button');
    await this.addEmployeeButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after clicking Add Employee');
    });
  }

  /**
   * Clear search fields
   */
  async clearSearchFields(): Promise<void> {
    Logger.info('Clearing search fields');
    await this.employeeNameInput.clear();
  }

  /**
   * Get first search result text
   */
  async getFirstSearchResultText(): Promise<string> {
    try {
      const firstRow = this.page.locator('table tbody tr, [role="row"]').first();
      const text = await firstRow.textContent();
      return text || '';
    } catch {
      return '';
    }
  }
}
