/**
 * Environment variable validation utility
 */

export class EnvValidator {
  /**
   * Validates that all required environment variables are set
   * @param requiredVars - Array of required environment variable names
   * @throws Error if any required variable is missing
   */
  static validateRequired(requiredVars: string[]): void {
    const missing: string[] = [];

    for (const varName of requiredVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}. ` +
        `Please set these variables or ensure your .env file is configured correctly.`
      );
    }
  }

  /**
   * Gets an environment variable or throws if not found
   * @param varName - Environment variable name
   * @param defaultValue - Optional default value
   * @returns The environment variable value
   */
  static get(varName: string, defaultValue?: string): string {
    const value = process.env[varName];

    if (!value && defaultValue === undefined) {
      throw new Error(
        `Environment variable "${varName}" is required but not set.`
      );
    }

    return value || defaultValue || '';
  }

  /**
   * Gets a boolean environment variable
   * @param varName - Environment variable name
   * @param defaultValue - Optional default value
   * @returns The boolean value
   */
  static getBoolean(varName: string, defaultValue = false): boolean {
    const value = process.env[varName];

    if (!value) {
      return defaultValue;
    }

    return value.toLowerCase() === 'true' || value === '1';
  }

  /**
   * Gets a numeric environment variable
   * @param varName - Environment variable name
   * @param defaultValue - Optional default value
   * @returns The numeric value
   */
  static getNumber(varName: string, defaultValue?: number): number {
    const value = process.env[varName];

    if (!value) {
      if (defaultValue === undefined) {
        throw new Error(
          `Environment variable "${varName}" is required but not set.`
        );
      }
      return defaultValue;
    }

    const num = parseInt(value, 10);

    if (Number.isNaN(num)) {
      throw new Error(
        `Environment variable "${varName}" must be a valid number, got "${value}".`
      );
    }

    return num;
  }
}
