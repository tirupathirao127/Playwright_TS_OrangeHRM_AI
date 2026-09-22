/**
 * Utility for generating random test data
 */

export class RandomData {
  /**
   * Generate a random string of specified length
   * @param length - Length of the string
   * @param charset - Character set to use (default: alphanumeric)
   * @returns Random string
   */
  static string(
    length = 10,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  ): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  }

  /**
   * Generate a random alphanumeric string
   */
  static alphanumeric(length = 10): string {
    return RandomData.string(length);
  }

  /**
   * Generate a random alphabetic string
   */
  static alpha(length = 10): string {
    return RandomData.string(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }

  /**
   * Generate a random numeric string
   */
  static numeric(length = 10): string {
    return RandomData.string(length, '0123456789');
  }

  /**
   * Generate a random number within a range
   */
  static number(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random email address
   */
  static email(domain = 'test.com'): string {
    return `${RandomData.alphanumeric(8)}@${domain}`;
  }

  /**
   * Generate a random first name
   */
  static firstName(): string {
    const names = [
      'John',
      'Jane',
      'Michael',
      'Sarah',
      'David',
      'Emma',
      'Robert',
      'Lisa',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate a random last name
   */
  static lastName(): string {
    const names = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  /**
   * Generate a random full name
   */
  static fullName(): string {
    return `${RandomData.firstName()} ${RandomData.lastName()}`;
  }

  /**
   * Generate a random phone number
   */
  static phone(): string {
    return `${RandomData.numeric(3)}-${RandomData.numeric(3)}-${RandomData.numeric(4)}`;
  }

  /**
   * Generate a random date within a range
   */
  static date(startYear = 1980, endYear = 2020): Date {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  /**
   * Generate a random boolean
   */
  static boolean(): boolean {
    return Math.random() > 0.5;
  }

  /**
   * Select a random item from an array
   */
  static selectFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate a random UUID v4
   */
  static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
