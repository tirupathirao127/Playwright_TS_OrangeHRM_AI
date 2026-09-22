import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

/**
 * Login page object
 */
export class LoginPage extends BasePage {
  // Locators
  private usernameInput = this.page.getByPlaceholder('Username');
  private passwordInput = this.page.getByPlaceholder('Password');
  private loginButton = this.page.getByRole('button', { name: /login/i });
  private errorAlert = this.page.locator('[role="alert"], .alert, .oxd-alert');
  private loginHeading = this.page.getByRole('heading').first();

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    Logger.info('Navigating to login page');
    await this.navigateTo('/web/index.php/auth/login');
  }

  /**
   * Check if login page is visible
   */
  async isLoginPageVisible(): Promise<boolean> {
    try {
      await this.loginHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string): Promise<void> {
    Logger.info(`Filling username: ${username}`);
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    Logger.info('Filling password');
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    Logger.info('Clicking login button');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      // Network idle may not always be achievable
      Logger.warn('Page did not reach network idle state after login');
    });
    // Wait for the SPA's client-side redirect away from the login page to
    // fully settle before returning, to avoid racing subsequent navigations
    // (e.g. immediate page.goto() calls) with the app's own history change.
    await this.page
      .waitForURL((url) => !url.pathname.includes('/auth/login'), { timeout: 15000 })
      .catch(() => {
        Logger.warn('URL did not change away from login page within timeout');
      });
  }

  /**
   * Perform complete login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    Logger.info(`Logging in as: ${username}`);
    await this.navigateToLogin();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Get error message from login page
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      await this.errorAlert.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorAlert.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorAlert.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for login to complete (redirect to dashboard)
   */
  async waitForLoginSuccess(): Promise<void> {
    Logger.info('Waiting for login success');
    await this.page.waitForURL(/\/dashboard/i, { timeout: 30000 }).catch(() => {
      Logger.warn('Did not redirect to dashboard after login');
    });
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    Logger.info('Clearing login form');
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get all validation error messages
   */
  async getAllErrorMessages(): Promise<string[]> {
    try {
      const messages = await this.page.locator('[role="alert"]').allTextContents();
      return messages.filter((msg) => msg.trim().length > 0);
    } catch {
      return [];
    }
  }
}
