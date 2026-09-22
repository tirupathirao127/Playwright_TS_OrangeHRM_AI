import { test, expect } from '../../fixtures/base.fixture';
import { config } from '../../config/env.config';

test('TC010 - Dashboard loads successfully after login @smoke @e2e @desktop', async ({
  loginPage,
  dashboardPage,
  page,
}) => {
  // Login with valid credentials
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Verify dashboard is loaded
  expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();

  // Verify sidebar is visible
  expect(await dashboardPage.isSidebarVisible()).toBeTruthy();

  // Verify URL contains dashboard
  expect(page.url()).toContain('/dashboard');
});

test('TC011 - Dashboard heading is visible @sanity @e2e @desktop', async ({
  loginPage,
  dashboardPage,
}) => {
  // Login with valid credentials
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Verify dashboard heading
  const heading = await dashboardPage.getDashboardHeading();
  expect(heading).toBeTruthy();
  expect(heading.toLowerCase()).toMatch(/dashboard|home/);
});

test('TC012 - Dashboard welcome message is visible @smoke @e2e @desktop', async ({
  loginPage,
  dashboardPage,
}) => {
  // Login with valid credentials
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Wait for dashboard to load
  await dashboardPage.waitForDashboardLoad();

  // Verify dashboard is loaded
  expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();
});
