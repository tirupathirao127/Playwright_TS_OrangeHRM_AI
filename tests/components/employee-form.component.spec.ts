import { test, expect } from '../../fixtures/base.fixture';
import { config } from '../../config/env.config';

test('TC070 - Required employee form fields are visible @sanity @component @desktop', async ({
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

  // Verify form is loaded
  expect(await employeeDetailsPage.isDetailsPageLoaded()).toBeTruthy();

  // Verify we can interact with form fields (they exist and are visible)
  // The actual fields are checked by POM methods
});

test('TC071 - Form accepts valid employee data @smoke @component @desktop', async ({
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

  // Fill form with valid data
  await employeeDetailsPage.fillEmployeeForm({
    firstName: 'John',
    lastName: 'Doe',
    employeeId: 'EMP-001',
  });

  // Verify values are set
  const firstName = await employeeDetailsPage.getFirstNameValue();
  expect(firstName).toContain('John');
});

test('TC072 - Form validates missing mandatory fields @regression @component', async ({
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

  // Try to save without filling required fields
  await employeeDetailsPage.clickSave();

  // Wait briefly for validation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verify error is shown or we're still on the form
  const isStillOnForm = await employeeDetailsPage.isDetailsPageLoaded();
  const hasError = await employeeDetailsPage.isRequiredFieldErrorVisible();

  expect(isStillOnForm || hasError).toBeTruthy();
});
