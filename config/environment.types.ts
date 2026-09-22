/**
 * Environment type definitions for type-safe environment configuration
 */

export type EnvironmentType = 'DEV' | 'TST' | 'UAT' | 'PRD';

export interface EnvironmentConfig {
  env: EnvironmentType;
  baseUrl: string;
  apiBaseUrl: string;
  username: string;
  password: string;
  headless: boolean;
}

export interface RawEnvironment {
  [key: string]: string | undefined;
}
