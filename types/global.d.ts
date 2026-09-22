/**
 * Global type definitions
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TEST_ENV?: 'DEV' | 'TST' | 'UAT' | 'PRD';
      BASE_URL?: string;
      API_BASE_URL?: string;
      ORANGEHRM_USERNAME?: string;
      ORANGEHRM_PASSWORD?: string;
      HEADLESS?: string;
      CI?: string;
    }
  }
}

export {};
