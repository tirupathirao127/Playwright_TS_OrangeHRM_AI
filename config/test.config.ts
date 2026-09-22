/**
 * Test configuration helpers
 */

export const testConfig = {
  /**
   * Default timeout values (in milliseconds)
   */
  timeouts: {
    action: 30000,        // Action timeout (click, fill, etc.)
    navigation: 30000,    // Navigation timeout
    test: 30000,          // Test timeout
    shortWait: 5000,      // Short wait
    mediumWait: 15000,    // Medium wait
    longWait: 30000,      // Long wait
  },

  /**
   * Retry configuration
   */
  retries: {
    local: 0,             // No retries for local execution
    ci: 2,                // 2 retries for CI execution
  },

  /**
   * Worker configuration
   */
  workers: {
    local: 4,             // 4 workers for local execution
    ci: 2,                // 2 workers for CI execution
  },

  /**
   * Reporter configuration
   */
  reporters: {
    html: 'playwright-report',
    json: 'test-results/test-results.json',
    junit: 'test-results/junit-results.xml',
  },

  /**
   * Artifact configuration
   */
  artifacts: {
    screenshots: 'test-results/screenshots',
    videos: 'test-results/videos',
    traces: 'test-results/traces',
  },
};
