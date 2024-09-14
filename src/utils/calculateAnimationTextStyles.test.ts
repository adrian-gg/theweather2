import { describe, expect, test } from 'vitest';
import calculateAnimationStyles from './calculateAnimationTextStyles';

describe('calculateAnimationStyles [Utility]', () => {
  test('should calculate styles for word with length 5 and order 1 with no delay for previous words', () => {
    const wordLength = 5;
    const order = 1;
    const animationDelay = 100;
    const delayPreviousWords = 0;

    const result = calculateAnimationStyles(
      wordLength,
      order,
      animationDelay,
      delayPreviousWords
    );

    expect(result).toEqual({
      width: '5ch',
      animation: 'typing-text-effect 0.3s steps(5) 0.6s backwards',
    });
  });

  test('should calculate styles for word with length 10 and order 2 with a delay for previous words', () => {
    const wordLength = 10;
    const order = 2;
    const animationDelay = 200;
    const delayPreviousWords = 5;

    const result = calculateAnimationStyles(
      wordLength,
      order,
      animationDelay,
      delayPreviousWords
    );

    expect(result).toEqual({
      width: '10ch',
      animation: 'typing-text-effect 0.3s steps(10) 1.4s backwards',
    });
  });

  test('should calculate correct animation with delay for previous words', () => {
    const wordLength = 8;
    const order = 3;
    const animationDelay = 150;
    const delayPreviousWords = 10;

    const result = calculateAnimationStyles(
      wordLength,
      order,
      animationDelay,
      delayPreviousWords
    );

    expect(result).toEqual({
      width: '8ch',
      animation: 'typing-text-effect 0.3s steps(8) 2.05s backwards',
    });
  });
});
