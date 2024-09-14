import { beforeEach, describe, expect, it } from 'vitest';
import getFromLocal from './getFromLocal';
import saveToLocal from './saveToLocal';

describe('getFromLocal [Utility]', () => {
  beforeEach(() => {
    // Clean the localStorage prior to each test.
    localStorage.clear();
  });

  it('should save and retrieve a value correctly', () => {
    const key = 'testKey';
    const value = { foo: 'bar', num: 42 };

    saveToLocal(key, value);

    const retrievedValue = getFromLocal(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should return null for non-existent keys', () => {
    const key = 'nonExistentKey';

    const result = getFromLocal(key);
    expect(result).toBeNull();
  });

  it('should handle JSON parse errors gracefully', () => {
    const key = 'corruptedKey';
    localStorage.setItem(key, '{ corruptedJson }');

    const result = getFromLocal(key);
    expect(result).toBeNull();
  });
});
