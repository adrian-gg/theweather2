import { describe, expect, test } from 'vitest';
import classNames from './classNames';

describe('classNames [Utility]', () => {
  test('should return a single class when only one valid class is passed', () => {
    expect(classNames('my-class')).toBe('my-class');
  });

  test('should join multiple valid class names into a single string', () => {
    expect(classNames('class1', 'class2', 'class3')).toBe(
      'class1 class2 class3'
    );
  });

  test('should filter out false and non-string values', () => {
    expect(classNames('class1', false, '', 'class2')).toBe(
      'class1 class2'
    );
  });

  test('should return an empty string if no valid class names are passed', () => {
    expect(classNames(false, '')).toBe('');
  });

  test('should handle a mix of valid and invalid class names correctly', () => {
    expect(classNames('class1', false, 'class2', '', 'class3')).toBe(
      'class1 class2 class3'
    );
  });
});
