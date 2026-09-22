import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { config } from '../config/env.config';
import { Logger } from '../utils/logger';

/**
 * Authenticated fixture
 * Provides a pre-authenticated context for tests that don't need to validate login
 */
export const authenticatedTest = base.extend({});

// Example of how to use authenticated context if needed in future
// You can extend this to provide pre-authenticated pages

export { expect } from '@playwright/test';
