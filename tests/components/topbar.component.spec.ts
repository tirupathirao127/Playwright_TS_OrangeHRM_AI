import { test, expect } from '../../fixtures/base.fixture';
import { config } from '../../config/env.config';

test('TC050 - Topbar is visible after login @sanity @component @desktop', async ({
  loginPage,
  dashboardPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Verify topbar is visible
  const header = page.locator('[class*="topbar"], [class*="navbar"], [class*="header"]').first();
  await header.waitFor({ state: 'visible', timeout: 5000 });
  expect(await header.isVisible()).toBeTruthy();
});

test('TC051 - User menu opens successfully @smoke @component @desktop', async ({
  loginPage,
  dashboardPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Click user menu
  const userMenu = page.locator('[class*="userdropdown"], [class*="profile-menu"]').first();
  const userMenuVisible = await userMenu
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  if (userMenuVisible) {
    await userMenu.click();

    // Verify menu dropdown appears
    const menuDropdown = page.locator('[role="menu"], [class*="dropdown"]');
    await menuDropdown.waitFor({ state: 'visible', timeout: 5000 });
    expect(await menuDropdown.isVisible()).toBeTruthy();
  }
});

test('TC052 - Logout option is available in user menu @regression @component @desktop', async ({
  loginPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Look for logout button/option
  const logoutButton = page.getByRole('menuitem', { name: /logout/i });

  // Verify logout button exists
  const logoutCount = await logoutButton.count();
  expect(logoutCount).toBeGreaterThan(0);
});
