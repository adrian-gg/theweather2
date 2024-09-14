import { describe, expect, test } from 'vitest';
import validateInputField from './validateInputField';

describe('validateInputField [Utility]', () => {
  test('should return error for invalid text input', () => {
    const error = validateInputField('name', '12345');
    expect(error).toBe('error_text');
  });

  test('should return empty string for valid text input', () => {
    const error = validateInputField('name', 'John Doe');
    expect(error).toBe('');
  });

  test('should return error for invalid email', () => {
    const error = validateInputField('email', 'invalid-email');
    expect(error).toBe('error_email');
  });

  test('should return empty string for valid email', () => {
    const error = validateInputField('email', 'test@example.com');
    expect(error).toBe('');
  });

  test('should return error for empty date', () => {
    const error = validateInputField('birthdate', '');
    expect(error).toBe('error_date');
  });

  test('should return empty string for valid date', () => {
    const error = validateInputField('birthdate', '2022-09-15');
    expect(error).toBe('');
  });

  test('should return error for invalid phone number', () => {
    const error = validateInputField('phone', '1234');
    expect(error).toBe('error_tel');
  });

  test('should return empty string for valid phone number', () => {
    const error = validateInputField('phone', '123456789');
    expect(error).toBe('');
  });

  test('should return empty string for unsupported field type', () => {
    const error = validateInputField('unsupportedField' as any, 'value');
    expect(error).toBe('');
  });
});
