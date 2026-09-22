import { test, expect } from '../../fixtures/base.fixture';
import { DataReader } from '../../utils/data-reader';
import type { LoginTestCase } from '../../data/schemas/test-data.schemas';

// Read test data
const validLoginData = DataReader.readJSON<LoginTestCase>('data/login/valid-login.json');
const invalidLoginData = DataReader.readJSON<LoginTestCase>('data/login/invalid-login.json');

// Valid login tests
for (const testCase of validLoginData) {
  test(`${testCase.id} - ${testCase.description} ${testCase.tags.join(' ')}`, async ({
    page,
    loginPage,
    dashboardPage,
  }) => {
    // Navigate to login page
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageVisible()).toBeTruthy();

    // Perform login
    await loginPage.login(testCase.input.username, testCase.input.password);

    // Verify dashboard is loaded
    expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();

    // Verify URL contains expected path
    if (testCase.expected.redirectTo) {
      await expect(page).toHaveURL(new RegExp(testCase.expected.redirectTo));
    }
  });
}

// Invalid login tests
for (const testCase of invalidLoginData) {
  test(`${testCase.id} - ${testCase.description} ${testCase.tags.join(' ')}`, async ({
    page,
    loginPage,
  }) => {
    // Navigate to login page
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageVisible()).toBeTruthy();

    // Fill login form
    await loginPage.fillUsername(testCase.input.username);
    await loginPage.fillPassword(testCase.input.password);
    await loginPage.clickLogin();

    // Wait briefly for error to appear
    await page.waitForTimeout(2000);

    // Verify error message if expected
    if (testCase.expected.errorMessage) {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBeTruthy();

      const errorMessage = await loginPage.getErrorMessage();
      if (errorMessage) {
        expect(errorMessage.toLowerCase()).toContain(
          testCase.expected.errorMessage.toLowerCase()
        );
      }
    }

    // Verify we're still on login page
    expect(page.url()).toContain('auth/login');
  });
}
