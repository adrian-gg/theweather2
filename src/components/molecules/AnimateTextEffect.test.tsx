/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { UNITS } from '../../config/consts';
import { SettingsContext } from '../../context/SettingsContext';
import { themeOptions } from '../../hooks/useTheme';
import AnimateTextEffect, { AnimateTextEffectProps } from './AnimateTextEffect';

const mockSettingsContext = (isAnimationEnabled: boolean) => ({
  currentUnits: UNITS[0].api_name,
  changeUnits: () => {},
  currentTheme: {
    selected: themeOptions[0].value,
    navigator: themeOptions[0].value,
  },
  changeTheme: () => {},
  isAnimationEnabled,
  toggleAnimation: () => {},
});

const renderAnimateTextEffect = (
  props: Partial<AnimateTextEffectProps> = {},
  isAnimationEnabled = true
) => {
  return render(
    <SettingsContext.Provider value={mockSettingsContext(isAnimationEnabled)}>
      <AnimateTextEffect text="" {...props} />
    </SettingsContext.Provider>
  );
};

describe('AnimateTextEffect [Component]', () => {
  test('should render text with animation styles', async () => {
    renderAnimateTextEffect({
      text: 'test styles',
      animationDelay: 100,
      order: 1,
      multiline: false,
    });

    const textElement = screen.getByText('test styles');

    await waitFor(() => {
      expect(textElement).toHaveStyle({
        width: '11ch',
        animation: 'typing-text-effect 0.3s steps(11) 0.6s backwards',
      });
    });
  });

  test('should render multiline text with animation styles', async () => {
    renderAnimateTextEffect({
      text: 'test styles abc',
      animationDelay: 100,
      order: 1,
      multiline: true,
      alignText: 'r',
    });

    await waitFor(() => {
      const textElements = screen.getAllByText(/test|styles|abc/);

      // test
      expect(textElements[0]?.parentElement).toHaveStyle({
        width: `4ch`,
        margin: '0 0 0 1ch',
      });
      expect(textElements[0]).toHaveStyle({
        width: '5ch',
        animation: 'typing-text-effect 0.3s steps(5) 0.6s backwards',
      });

      // styles
      expect(textElements[1]?.parentElement).toHaveStyle({
        width: `6ch`,
        margin: '0 0 0 1ch',
      });
      expect(textElements[1]).toHaveStyle({
        width: '7ch',
        animation: 'typing-text-effect 0.3s steps(7) 0.8s backwards',
      });

      // abc
      expect(textElements[2]?.parentElement).toHaveStyle({
        width: `3ch`,
        margin: '0 0 0 1ch',
      });
      expect(textElements[2]).toHaveStyle({
        width: '4ch',
        animation: 'typing-text-effect 0.3s steps(4) 1.08s backwards',
      });
    });
  });

  test('should render text without animation styles if isAnimationEnabled is false', async () => {
    renderAnimateTextEffect(
      {
        text: 'test styles',
      },
      false // isAnimationEnabled
    );

    const textElement = screen.getByText('test styles');
    expect(textElement).not.toHaveClass('scrabletext__text');
  });
});
