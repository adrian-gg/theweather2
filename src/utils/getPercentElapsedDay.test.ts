import { describe, expect, it } from 'vitest';
import getPercentElapsedDay from './getPercentElapsedDay';

describe('getPercentElapsedDay [Utility]', () => {
  it('should return 0% for 00:00 local time', () => {
    const localTime = new Date('2024-09-13T00:00:00').getTime();
    expect(getPercentElapsedDay(0, localTime)).toBe(0);
  });

  it('should return 50% for 12:00 local time', () => {
    const localTime = new Date('2024-09-13T12:00:00').getTime();
    expect(getPercentElapsedDay(0, localTime)).toBe(50);
  });

  it('should return 100% for 23:59 local time', () => {
    const localTime = new Date('2024-09-13T23:59:00').getTime();
    expect(getPercentElapsedDay(0, localTime)).toBe(99); // Rounded down
  });

  it('should return the input percentElapsedDay if localTime is not provided', () => {
    expect(getPercentElapsedDay(25, 0)).toBe(25);
  });
});
