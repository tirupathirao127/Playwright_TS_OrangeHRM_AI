/**
 * Logger utility for consistent logging across the framework
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private static logLevel: LogLevel = 'info';

  /**
   * Set the current log level
   */
  static setLogLevel(level: LogLevel): void {
    Logger.logLevel = level;
  }

  /**
   * Log debug message
   */
  static debug(message: string, data?: Record<string, unknown>): void {
    if (Logger.shouldLog('debug')) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }

  /**
   * Log info message
   */
  static info(message: string, data?: Record<string, unknown>): void {
    if (Logger.shouldLog('info')) {
      console.info(`[INFO] ${message}`, data || '');
    }
  }

  /**
   * Log warning message
   */
  static warn(message: string, data?: Record<string, unknown>): void {
    if (Logger.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  /**
   * Log error message
   */
  static error(message: string, error?: Error | Record<string, unknown>): void {
    if (Logger.shouldLog('error')) {
      if (error instanceof Error) {
        console.error(`[ERROR] ${message}`, error.message, error.stack);
      } else {
        console.error(`[ERROR] ${message}`, error || '');
      }
    }
  }

  /**
   * Log test step for reporting
   */
  static step(stepNumber: number, description: string): void {
    Logger.info(`[STEP ${stepNumber}] ${description}`);
  }

  /**
   * Determine if message should be logged based on log level
   */
  private static shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentIndex = levels.indexOf(Logger.logLevel);
    const messageIndex = levels.indexOf(level);

    return messageIndex >= currentIndex;
  }
}
