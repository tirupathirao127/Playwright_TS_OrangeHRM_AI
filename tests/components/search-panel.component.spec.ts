import { test, expect } from '../../fixtures/base.fixture';
import { config } from '../../config/env.config';

test('TC060 - Employee search panel accepts input @sanity @component @desktop', async ({
  loginPage,
  pimPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Search for employee
  await pimPage.searchEmployee('John');

  // Verify input is accepted and search works
  expect(await pimPage.isSearchResultsDisplayed()).toBeTruthy();
});

test('TC061 - Search button submits the search @smoke @component @desktop', async ({
  loginPage,
  pimPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Perform search
  await pimPage.searchEmployee('Admin');

  // Verify results are displayed
  expect(await pimPage.isSearchResultsDisplayed()).toBeTruthy();

  // Verify page didn't navigate away
  expect(page.url()).toContain('pim');
});

test('TC062 - Search panel handles empty search appropriately @regression @component', async ({
  loginPage,
  pimPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Clear search fields
  await pimPage.clearSearchFields();

  // Verify page still loads or shows all records
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();
});
