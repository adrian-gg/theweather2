import { describe, expect, test } from 'vitest';
import convertToLocalTime from './convertToLocalTime';
import formatDate from './formatDate';
import formatTime from './formatTime';

describe('convertToLocalTime [Utility]', () => {
  const timestamp = 1680302400; // 2023-04-01 00:00:00 UTC
  const timezone = -3600; // GMT-1
  const localTime = convertToLocalTime(timestamp, timezone);

  test('should convert timestamp and timezone to local time', () => {
    expect(localTime).toBeInstanceOf(Date);
  });

  test('should correctly adjust time based on timezone and local offset', () => {
    const expectedDate = new Date((timestamp + timezone) * 1000);
    expect(localTime.getTime()).toBeCloseTo(expectedDate.getTime(), -1000);
  });
});

describe('formatDate [Utility]', () => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  test('should format the date correctly for English language', () => {
    const date = new Date(2023, 3, 1); // 1st April 2023
    const formattedDate = formatDate(date, 'en', monthNames);
    expect(formattedDate).toBe('Apr 01');
  });

  test('should format the date correctly for non-English languages', () => {
    const date = new Date(2023, 3, 1); // 1st April 2023
    const formattedDate = formatDate(date, 'es', monthNames);
    expect(formattedDate).toBe('01 Apr');
  });
});

describe('formatTime [Utility]', () => {
  test('should format the time in HH:MM format', () => {
    const localTime = new Date(2023, 3, 1, 14, 30); // 14:30 on 1st April 2023
    const date = new Date(2023, 3, 1, 14, 30);

    const formattedTime = formatTime(localTime, date);
    expect(formattedTime).toBe('14:30');
  });

  test('should pad single-digit hours and minutes with zeros', () => {
    const localTime = new Date(2023, 3, 1, 5, 5); // 05:05 on 1st April 2023
    const date = new Date(2023, 3, 1, 5, 5);

    const formattedTime = formatTime(localTime, date);
    expect(formattedTime).toBe('05:05');
  });
});
