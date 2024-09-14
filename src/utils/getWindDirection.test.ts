import { describe, expect, test } from 'vitest';
import getWindDirection from './getWindDirection';

describe('getWindDirection [Utility]', () => {
  test('should return correct wind direction for given degrees', () => {
    expect(getWindDirection(0)).toBe('N');
    expect(getWindDirection(45)).toBe('NE');
    expect(getWindDirection(90)).toBe('E');
    expect(getWindDirection(180)).toBe('S');
    expect(getWindDirection(270)).toBe('W');
    expect(getWindDirection(360)).toBe('N');
  });

  test('should handle non-integer degrees', () => {
    expect(getWindDirection(22.5)).toBe('NNE');
    expect(getWindDirection(67.5)).toBe('ENE');
    expect(getWindDirection(247.5)).toBe('WSW');
  });

  test('should normalize negative degrees', () => {
    expect(getWindDirection(-45)).toBe('NW');
    expect(getWindDirection(-90)).toBe('W');
    expect(getWindDirection(-360)).toBe('N');
  });

  test('should handle degrees greater than 360', () => {
    expect(getWindDirection(450)).toBe('E');
    expect(getWindDirection(720)).toBe('N');
  });
});
