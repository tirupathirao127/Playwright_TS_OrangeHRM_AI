import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility for reading test data from JSON and CSV files
 */
export class DataReader {
  /**
   * Reads JSON test data file and returns parsed data
   * @param filePath - Relative path to JSON file from project root
   * @returns Parsed JSON data
   */
  static readJSON<T>(filePath: string): T[] {
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(
        `Test data file not found: ${filePath} (resolved to ${absolutePath})`
      );
    }

    try {
      const rawData = fs.readFileSync(absolutePath, 'utf-8');
      const data = JSON.parse(rawData) as T[];

      if (!Array.isArray(data)) {
        throw new Error(
          `Test data file must contain a JSON array, got ${typeof data}`
        );
      }

      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(
          `Invalid JSON in test data file ${filePath}: ${error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Reads CSV file and converts to array of objects
   * @param filePath - Relative path to CSV file from project root
   * @param hasHeader - Whether first row contains headers (default: true)
   * @returns Array of data rows
   */
  static readCSV(filePath: string, hasHeader = true): Record<string, string>[] {
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(
        `Test data file not found: ${filePath} (resolved to ${absolutePath})`
      );
    }

    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    const lines = rawData.split('\n').filter((line) => line.trim().length > 0);

    if (lines.length === 0) {
      return [];
    }

    if (!hasHeader) {
      return lines.map((line) => ({
        value: line,
      }));
    }

    const headers = lines[0]
      .split(',')
      .map((header) => header.trim())
      .map((header) => header.replace(/^"|"$/g, ''));

    const data: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i]
        .split(',')
        .map((value) => value.trim())
        .map((value) => value.replace(/^"|"$/g, ''));

      const row: Record<string, string> = {};

      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j] || '';
      }

      data.push(row);
    }

    return data;
  }

  /**
   * Reads all files in a directory with a specific extension
   * @param dirPath - Directory path
   * @param extension - File extension (e.g., '.json', '.csv')
   * @returns Array of file paths
   */
  static readDir(dirPath: string, extension: string): string[] {
    const absolutePath = path.resolve(process.cwd(), dirPath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    return fs
      .readdirSync(absolutePath)
      .filter((file) => file.endsWith(extension))
      .map((file) => path.join(dirPath, file));
  }
}
