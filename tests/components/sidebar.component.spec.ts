import { test, expect } from '../../fixtures/base.fixture';
import { config } from '../../config/env.config';

test('TC040 - Sidebar menus are visible @sanity @component @desktop', async ({
  loginPage,
  dashboardPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Verify sidebar is visible
  expect(await dashboardPage.isSidebarVisible()).toBeTruthy();
});

test('TC041 - Navigate to PIM from sidebar @smoke @component @desktop', async ({
  loginPage,
  dashboardPage,
  pimPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM from sidebar
  await dashboardPage.navigateToPim();

  // Verify PIM page loaded
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();
});

test('TC042 - Sidebar navigates to Admin module @regression @component @desktop', async ({
  loginPage,
  dashboardPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to Admin from sidebar
  await dashboardPage.navigateToAdmin();

  // Verify URL contains admin
  expect(page.url()).toContain('admin');
});
