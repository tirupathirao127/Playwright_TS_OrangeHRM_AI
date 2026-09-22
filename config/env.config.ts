import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { EnvironmentConfig as IEnvironmentConfig, EnvironmentType } from './environment.types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/**
 * Load and validate environment configuration
 * Supports DEV, TST, UAT, and PRD environments
 */
class EnvironmentConfigLoader {
  private static instance: EnvironmentConfigLoader;
  private configData: IEnvironmentConfig;

  constructor() {
    const testEnv = this.getTestEnvironment();
    const envFile = path.resolve(rootDir, `.env.${testEnv.toLowerCase()}`);

    // Load environment file
    const result = dotenv.config({ path: envFile });

    if (result.error && !process.env.CI) {
      console.warn(`Warning: Could not load ${envFile}, using process.env`);
    }

    this.configData = this.buildConfig(testEnv);
  }

  private getTestEnvironment(): EnvironmentType {
    const env = (process.env.TEST_ENV || 'DEV').toUpperCase();

    if (!['DEV', 'TST', 'UAT', 'PRD'].includes(env)) {
      throw new Error(
        `Invalid TEST_ENV: "${env}". Must be one of: DEV, TST, UAT, PRD`
      );
    }

    return env as EnvironmentType;
  }

  private buildConfig(env: EnvironmentType): IEnvironmentConfig {
    const baseUrl = this.getRequiredEnv('BASE_URL');
    const apiBaseUrl = this.getRequiredEnv('API_BASE_URL');
    const username = this.getRequiredEnv('ORANGEHRM_USERNAME');
    const password = this.getRequiredEnv('ORANGEHRM_PASSWORD');

    const headlessStr = process.env.HEADLESS || 'true';
    const headless = headlessStr.toLowerCase() === 'true';

    return {
      env,
      baseUrl,
      apiBaseUrl,
      username,
      password,
      headless,
    };
  }

  private getRequiredEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(
        `Required environment variable "${key}" is not set. ` +
        `Check your .env file or set TEST_ENV and ensure corresponding .env.{ENV} file exists.`
      );
    }
    return value;
  }

  public static getInstance(): EnvironmentConfigLoader {
    if (!EnvironmentConfigLoader.instance) {
      EnvironmentConfigLoader.instance = new EnvironmentConfigLoader();
    }
    return EnvironmentConfigLoader.instance;
  }

  public static getConfig(): IEnvironmentConfig {
    return EnvironmentConfigLoader.getInstance().configData;
  }
}

// Export configured environment
export const config = EnvironmentConfigLoader.getConfig();
