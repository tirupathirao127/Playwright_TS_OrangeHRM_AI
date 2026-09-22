import { test, expect } from '../../fixtures/base.fixture';
import { DataReader } from '../../utils/data-reader';
import { config } from '../../config/env.config';

test('TC020 - Search for existing employee @sanity @e2e @desktop', async ({
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
  await pimPage.searchEmployee('Admin');

  // Verify results are displayed
  expect(await pimPage.isSearchResultsDisplayed()).toBeTruthy();

  // Verify result count
  const resultCount = await pimPage.getSearchResultCount();
  expect(resultCount).toBeGreaterThan(0);
});

test('TC021 - Search with partial employee name @regression @e2e', async ({
  loginPage,
  pimPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Search with partial name
  await pimPage.searchEmployee('Ad');

  // Verify results are displayed
  expect(await pimPage.isSearchResultsDisplayed()).toBeTruthy();
});

test('TC022 - Search with no matching employee @regression @e2e', async ({
  loginPage,
  pimPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Search for non-existent employee
  await pimPage.searchEmployee('NonExistent', 'Employee');

  // Verify no records message or empty results
  const hasNoRecords = await pimPage.isNoRecordsMessageVisible();
  const resultCount = await pimPage.getSearchResultCount();

  expect(hasNoRecords || resultCount === 0).toBeTruthy();
});
