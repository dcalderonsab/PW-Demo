/**
 * @fileoverview This file contains helper functions for generating random test data.
 */

/**
 * Generates a unique username, typically for registration tests.
 * Appends a timestamp to a prefix to ensure uniqueness across test runs.
 * @param prefix The prefix for the username. Defaults to 'testuser'.
 * @returns A unique username string (e.g., 'testuser_1678886400000').
 */
export function generateRandomUsername(prefix: string = 'testuser'): string {
  return `${prefix}_${Date.now()}`;
}

/**
 * Generates a random password of a specified length.
 * The password will contain a mix of uppercase letters, lowercase letters, numbers, and special characters.
 * @param length The desired length of the password. Defaults to 12.
 * @returns A random password string.
 */
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const ALL_CHARS = UPPER + LOWER + NUMBERS + SYMBOLS;

export function generateRandomPassword(length: number = 12): string {
  let password = '';
  // Ensure at least one of each character type for robustness
  password += UPPER.charAt(Math.floor(Math.random() * UPPER.length));
  password += LOWER.charAt(Math.floor(Math.random() * LOWER.length));
  password += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  password += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));

  for (let i = password.length; i < length; i++) {
    password += ALL_CHARS.charAt(Math.floor(Math.random() * ALL_CHARS.length));
  }

  // Shuffle the password to randomize the position of the guaranteed characters
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
}

/**
 * Generates a random name string, useful for form inputs.
 * Appends a random alphanumeric suffix to a prefix.
 * @param prefix The prefix for the name. Defaults to 'TestName'.
 * @returns A random name string (e.g., 'TestName_a1b2c3').
 */
export function generateRandomName(prefix: string): string {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${randomSuffix}`;
}

/**
 * Generates a random email address, typically for registration tests.
 * Appends a timestamp to a prefix to ensure uniqueness.
 * @param prefix The prefix for the email. Defaults to the value in email-config.json.
 * @param domain The domain for the email. Defaults to the value in email-config.json.
 * @returns A unique email string (e.g., 'testuser_1678886400000@example.com').
 */
export function generateRandomEmail(prefix: string, domain: string): string {
  return `${prefix}_${Date.now()}@${domain}`;
}
