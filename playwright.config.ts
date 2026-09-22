import { defineConfig, devices } from '@playwright/test';
import { config } from './config/env.config';
import { testConfig } from './config/test.config';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: isCI ? testConfig.retries.ci : testConfig.retries.local,
  workers: isCI ? testConfig.workers.ci : testConfig.workers.local,

  // Global timeout for tests
  timeout: testConfig.timeouts.test,

  // Expect timeout
  expect: {
    timeout: testConfig.timeouts.action,
  },

  // Reporter configuration
  reporter: [
    ['html', { open: 'never', outputFolder: testConfig.reporters.html }],
    ['json', { outputFile: testConfig.reporters.json }],
    ['junit', { outputFile: testConfig.reporters.junit }],
  ],

  // Shared settings for all reporters
  use: {
    // Base URL for all requests
    baseURL: config.baseUrl,

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot configuration
    screenshot: 'only-on-failure',

    // Video configuration
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: testConfig.timeouts.action,

    // Navigation timeout
    navigationTimeout: testConfig.timeouts.navigation,
  },

  // Configure projects for major browsers and mobile devices
  projects: [
    // Windows Chrome (Chromium)
    {
      name: 'windows-chrome',
      use: {
        ...devices['Desktop Chrome'],
        headless: config.headless,
      },
    },

    // Mac Safari (WebKit)
    {
      name: 'mac-safari',
      use: {
        ...devices['Desktop Safari'],
        headless: config.headless,
      },
    },

    // Android Chrome (Mobile)
    {
      name: 'android-chrome',
      use: {
        ...devices['Pixel 5'],
        headless: config.headless,
      },
    },

    // iPhone Safari (Mobile)
    {
      name: 'iphone-safari',
      use: {
        ...devices['iPhone 14'],
        headless: config.headless,
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: process.env.CI
    ? undefined
    : {
        command: 'echo "No local server needed for demo testing"',
        reuseExistingServer: true,
      },
});
