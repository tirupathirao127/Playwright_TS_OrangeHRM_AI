/**
 * Test data type definitions and schemas
 */

export interface TestCaseTag {
  tag: string;
}

export interface TestCaseInput {
  username?: string;
  password?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  employeeId?: string;
  email?: string;
  phone?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface TestCaseExpected {
  success?: boolean;
  redirectTo?: string;
  errorMessage?: string;
  messageContains?: string;
  titleContains?: string;
  [key: string]: string | boolean | undefined;
}

export interface TestCase {
  id: string;
  description: string;
  tags: string[];
  input: TestCaseInput;
  expected: TestCaseExpected;
}

export interface LoginTestCase extends TestCase {
  input: {
    username: string;
    password: string;
  };
  expected: {
    success?: boolean;
    redirectTo?: string;
    errorMessage?: string;
  };
}

export interface EmployeeTestCase extends TestCase {
  input: {
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeId?: string;
    email?: string;
    phone?: string;
  };
  expected: {
    success?: boolean;
    messageContains?: string;
  };
}

/**
 * Validate that test data conforms to expected schema
 */
export function validateTestCaseSchema(testCase: unknown): asserts testCase is TestCase {
  if (typeof testCase !== 'object' || testCase === null) {
    throw new Error('Test case must be an object');
  }

  const tc = testCase as Record<string, unknown>;

  if (typeof tc.id !== 'string' || !tc.id) {
    throw new Error('Test case must have a valid id (string)');
  }

  if (typeof tc.description !== 'string' || !tc.description) {
    throw new Error('Test case must have a valid description (string)');
  }

  if (!Array.isArray(tc.tags)) {
    throw new Error('Test case must have tags (array)');
  }

  if (typeof tc.input !== 'object' || tc.input === null) {
    throw new Error('Test case must have input (object)');
  }

  if (typeof tc.expected !== 'object' || tc.expected === null) {
    throw new Error('Test case must have expected (object)');
  }
}
