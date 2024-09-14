import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
import { SettingsContext } from '../../context/SettingsContext';
import ThemeBox from './ThemeBox';

function MockSettingsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: any;
}) {
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

describe('ThemeBox [Component]', () => {
  test('should set the data-theme attribute based on auto mode', () => {
    const mockContextValue = {
      currentTheme: {
        selected: 'auto',
        navigator: 'dark',
      },
    };

    const { container } = render(
      <MockSettingsProvider value={mockContextValue}>
        <ThemeBox>Child Element</ThemeBox>
      </MockSettingsProvider>
    );

    const themeBox = container.querySelector('#theme-box');
    expect(themeBox).toHaveAttribute('data-theme', 'dark');
  });

  test('should set the data-theme attribute based on selected theme', () => {
    const mockContextValue = {
      currentTheme: {
        selected: 'light',
        navigator: 'dark',
      },
    };

    const { container } = render(
      <MockSettingsProvider value={mockContextValue}>
        <ThemeBox>Child Element</ThemeBox>
      </MockSettingsProvider>
    );

    const themeBox = container.querySelector('#theme-box');
    expect(themeBox).toHaveAttribute('data-theme', 'light');
  });

  test('should render children correctly', () => {
    const mockContextValue = {
      currentTheme: {
        selected: 'light',
        navigator: 'dark',
      },
    };

    render(
      <MockSettingsProvider value={mockContextValue}>
        <ThemeBox>
          <span>Child Element</span>
        </ThemeBox>
      </MockSettingsProvider>
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
