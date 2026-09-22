import { test, expect } from '../../fixtures/base.fixture';
import { RandomData } from '../../utils/random-data';
import { config } from '../../config/env.config';

test('TC030 - Create new employee with valid data @smoke @e2e @desktop', async ({
  loginPage,
  pimPage,
  employeeDetailsPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM and click Add Employee
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  // Click Add Employee button
  await pimPage.clickAddEmployee();

  // Wait for form to load
  await employeeDetailsPage.waitForPageReady();

  // Fill employee form with test data
  const testData = {
    firstName: RandomData.firstName(),
    lastName: RandomData.lastName(),
    employeeId: `EMP-${RandomData.numeric(6)}`,
  };

  await employeeDetailsPage.fillEmployeeForm(testData);

  // Save employee
  await employeeDetailsPage.clickSave();

  // Verify success message
  expect(await employeeDetailsPage.isSuccessMessageVisible()).toBeTruthy();
});

test('TC031 - Validate required fields on employee form @regression @e2e @desktop', async ({
  loginPage,
  pimPage,
  employeeDetailsPage,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM and click Add Employee
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  await pimPage.clickAddEmployee();

  // Wait for form to load
  await employeeDetailsPage.waitForPageReady();

  // Try to save without filling required fields
  await employeeDetailsPage.clickSave();

  // Verify error message is visible
  await test.step('Verify error messages for required fields', async () => {
    const isErrorVisible = await employeeDetailsPage.isRequiredFieldErrorVisible();
    expect(isErrorVisible || (await employeeDetailsPage.isErrorMessageVisible())).toBeTruthy();
  });
});

test('TC032 - Verify employee creation success message @regression @e2e', async ({
  loginPage,
  pimPage,
  employeeDetailsPage,
  page,
}) => {
  // Login
  await loginPage.navigateToLogin();
  await loginPage.login(config.username, config.password);

  // Navigate to PIM and click Add Employee
  await pimPage.navigateToPim();
  expect(await pimPage.isPimPageLoaded()).toBeTruthy();

  await pimPage.clickAddEmployee();

  // Wait for form to load
  await employeeDetailsPage.waitForPageReady();

  // Fill employee form
  const testData = {
    firstName: RandomData.firstName(),
    lastName: RandomData.lastName(),
  };

  await employeeDetailsPage.fillEmployeeForm(testData);

  // Save employee
  await employeeDetailsPage.clickSave();

  // Verify success message contains expected text
  const successMessage = await employeeDetailsPage.getSuccessMessage();
  expect(
    successMessage.toLowerCase().includes('success') ||
      successMessage.toLowerCase().includes('saved') ||
      page.url().includes('viewEmployeeProfile')
  ).toBeTruthy();
});
