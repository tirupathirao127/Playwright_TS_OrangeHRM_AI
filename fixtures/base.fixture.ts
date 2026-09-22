import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { PimPage } from '../pages/pim.page';
import { EmployeeDetailsPage } from '../pages/employee-details.page';
import { Logger } from '../utils/logger';

/**
 * Base fixture providing common page objects and utilities
 */
export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  employeeDetailsPage: EmployeeDetailsPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },

  employeeDetailsPage: async ({ page }, use) => {
    const employeeDetailsPage = new EmployeeDetailsPage(page);
    await use(employeeDetailsPage);
  },
});

// Extend test with lifecycle hooks
test.beforeEach(async ({ page }) => {
  Logger.info(`Starting test on URL: ${page.url()}`);
});

test.afterEach(async ({ page }, testInfo) => {
  Logger.info(`Test status: ${testInfo.status}`);

  if (testInfo.status !== 'passed') {
    Logger.info('Test failed, taking screenshot and clearing cookies');
    // Screenshots and traces are handled by Playwright config
    await page.context().clearCookies();
  }
});

export { expect } from '@playwright/test';
