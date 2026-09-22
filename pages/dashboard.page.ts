import type { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Logger } from '../utils/logger';

/**
 * Dashboard page object
 */
export class DashboardPage extends BasePage {
  // Locators
  private dashboardHeading = this.page.getByRole('heading', { name: /dashboard|home/i }).first();
  private sidebarMenu = this.page.locator('[class*="sidebar"], [class*="menu"]').first();
  private userMenu = this.page.locator('[class*="userdropdown"], [role="menuitem"]').first();
  private logoutButton = this.page.getByRole('menuitem', { name: /logout/i });
  private welcomeMessage = this.page.locator('[class*="welcome"], [class*="greeting"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to dashboard
   */
  async navigateToDashboard(): Promise<void> {
    Logger.info('Navigating to dashboard');
    await this.navigateTo('/web/index.php/dashboard/index');
  }

  /**
   * Check if dashboard is loaded
   */
  async isDashboardLoaded(): Promise<boolean> {
    try {
      await this.dashboardHeading.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get dashboard heading text
   */
  async getDashboardHeading(): Promise<string> {
    const heading = await this.dashboardHeading.textContent();
    return heading || '';
  }

  /**
   * Check if sidebar is visible
   */
  async isSidebarVisible(): Promise<boolean> {
    try {
      await this.sidebarMenu.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Navigate to PIM module from sidebar
   */
  async navigateToPim(): Promise<void> {
    Logger.info('Navigating to PIM module');
    const pimMenu = this.page
      .locator('[class*="menu"]')
      .filter({ hasText: /pim|people/i })
      .first();
    await pimMenu.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after PIM navigation');
    });
  }

  /**
   * Navigate to Admin module from sidebar
   */
  async navigateToAdmin(): Promise<void> {
    Logger.info('Navigating to Admin module');
    const adminMenu = this.page.locator('[class*="menu"]').filter({ hasText: /admin/i }).first();
    await adminMenu.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn('Page did not reach network idle after Admin navigation');
    });
  }

  /**
   * Logout from dashboard
   */
  async logout(): Promise<void> {
    Logger.info('Logging out');
    await this.userMenu.click();
    await this.logoutButton.click();
    await this.page.waitForURL(/\/auth|login/i, { timeout: 30000 }).catch(() => {
      Logger.warn('Did not redirect to login after logout');
    });
  }

  /**
   * Check if welcome message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    try {
      await this.welcomeMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for dashboard to fully load
   */
  async waitForDashboardLoad(): Promise<void> {
    Logger.info('Waiting for dashboard to load');
    await this.isDashboardLoaded();
  }

  /**
   * Click on sidebar menu item by name
   */
  async clickSidebarMenu(menuName: string): Promise<void> {
    Logger.info(`Clicking sidebar menu: ${menuName}`);
    const menuItem = this.page.locator(`[class*="menu"] >> text=${menuName}`);
    await menuItem.click();
    await this.page.waitForLoadState('networkidle').catch(() => {
      Logger.warn(`Page did not reach network idle after ${menuName} navigation`);
    });
  }
}
