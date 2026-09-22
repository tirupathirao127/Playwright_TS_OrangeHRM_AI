import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

/**
 * Employee Details page object
 */
export class EmployeeDetailsPage extends BasePage {
  // Locators
  private detailsHeading = this.page
    .getByRole('heading', {
      name: /employee details|edit employee|add employee|personal details/i,
    })
    .first();
  private firstNameField = this.page.locator('input[name*="firstName"]').first();
  private middleNameField = this.page.locator('input[name*="middleName"]').first();
  private lastNameField = this.page.locator('input[name*="lastName"]').first();
  private employeeIdField = this.page.locator('input[name*="employeeId"]').first();
  private saveButton = this.page.getByRole('button', { name: /save/i }).first();
  private successMessage = this.page.locator(
    '[role="alert"]:has-text("success"), [class*="success"]'
  );
  private errorMessage = this.page.locator('[role="alert"]:has-text("error"), [class*="error"]');
  private requiredFieldError = this.page.locator('[class*="error"], .error-message');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to employee details page
   */
  async navigateToEmployeeDetails(employeeId: string): Promise<void> {
    Logger.info(`Navigating to employee details: ${employeeId}`);
    await this.navigateTo(`/pim/viewEmployeeProfile/empNumber/${employeeId}`);
  }

  /**
   * Check if employee details page is loaded
   */
  async isDetailsPageLoaded(): Promise<boolean> {
    try {
      await this.detailsHeading.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill first name field
   */
  async fillFirstName(firstName: string): Promise<void> {
    Logger.info(`Filling first name: ${firstName}`);
    await this.firstNameField.fill(firstName);
  }

  /**
   * Fill middle name field
   */
  async fillMiddleName(middleName: string): Promise<void> {
    Logger.info(`Filling middle name: ${middleName}`);
    await this.middleNameField.fill(middleName);
  }

  /**
   * Fill last name field
   */
  async fillLastName(lastName: string): Promise<void> {
    Logger.info(`Filling last name: ${lastName}`);
    await this.lastNameField.fill(lastName);
  }

  /**
   * Fill employee ID field
   */
  async fillEmployeeId(employeeId: string): Promise<void> {
    Logger.info(`Filling employee ID: ${employeeId}`);
    await this.employeeIdField.fill(employeeId);
  }

  /**
   * Fill employee details form
   */
  async fillEmployeeForm(employeeData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeId?: string;
  }): Promise<void> {
    Logger.info('Filling employee details form');
    await this.fillFirstName(employeeData.firstName);

    if (employeeData.middleName) {
      await this.fillMiddleName(employeeData.middleName);
    }

    await this.fillLastName(employeeData.lastName);

    if (employeeData.employeeId) {
      await this.fillEmployeeId(employeeData.employeeId);
    }
  }

  /**
   * Click save button
   */
  async clickSave(): Promise<void> {
    Logger.info('Clicking save button');
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after save');
    });
  }

  /**
   * Save employee details
   */
  async saveEmployeeDetails(employeeData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeId?: string;
  }): Promise<void> {
    Logger.info('Saving employee details');
    await this.fillEmployeeForm(employeeData);
    await this.clickSave();
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.successMessage.textContent()) || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.errorMessage.textContent()) || '';
    } catch {
      return '';
    }
  }

  /**
   * Check if required field error is visible
   */
  async isRequiredFieldErrorVisible(): Promise<boolean> {
    try {
      await this.requiredFieldError.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get first name field value
   */
  async getFirstNameValue(): Promise<string> {
    return (await this.firstNameField.inputValue()) || '';
  }

  /**
   * Get last name field value
   */
  async getLastNameValue(): Promise<string> {
    return (await this.lastNameField.inputValue()) || '';
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    Logger.info('Clearing employee form');
    await this.firstNameField.clear();
    await this.middleNameField.clear();
    await this.lastNameField.clear();
    await this.employeeIdField.clear();
  }
}
