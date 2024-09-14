import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SettingsContext } from '../../context/SettingsContext';
import type { ThemeType } from '../../hooks/useTheme';
import type { TemperatureUnitType } from '../../hooks/useUnits';
import Settings from './Settings';

const mockSettingsContext = {
  currentUnits: 'metric' as TemperatureUnitType,
  changeUnits: vi.fn(),
  currentTheme: {
    selected: 'light' as ThemeType,
    navigator: 'light' as ThemeType,
  },
  changeTheme: vi.fn(),
  isAnimationEnabled: false,
  toggleAnimation: vi.fn(),
};

const renderSettingsWithSettingsContext = () => {
  return render(
    <SettingsContext.Provider value={mockSettingsContext}>
      <Settings />
    </SettingsContext.Provider>
  );
};

describe('Settings [Component]', () => {
  test('should render all settings fields', () => {
    renderSettingsWithSettingsContext();

    expect(
      screen.getByRole('combobox', { name: /temperature_unit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: /theme/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /animation_texts/i })
    ).toBeInTheDocument();
  });

  test('should call changeUnits with the correct value when units are changed', () => {
    renderSettingsWithSettingsContext();

    const select = screen.getByRole('combobox', { name: /temperature_unit/i });
    fireEvent.change(select, { target: { value: 'imperial' } });

    expect(mockSettingsContext.changeUnits).toHaveBeenCalledWith('imperial');
  });

  test('should call changeTheme with the correct value when theme is changed', () => {
    renderSettingsWithSettingsContext();

    const select = screen.getByRole('combobox', { name: /theme/i });
    fireEvent.change(select, { target: { value: 'dark' } });

    expect(mockSettingsContext.changeTheme).toHaveBeenCalledWith('dark');
  });

  test('should call toggleAnimation when checkbox is clicked', () => {
    renderSettingsWithSettingsContext();

    const checkbox = screen.getByRole('checkbox', { name: /animation_texts/i });
    fireEvent.click(checkbox);

    expect(mockSettingsContext.toggleAnimation).toHaveBeenCalled();
  });

  test('should render AnimateTextEffect with correct text', () => {
    renderSettingsWithSettingsContext();

    expect(screen.getByText(/temperature_unit/i)).toBeInTheDocument();
    expect(screen.getByText(/theme/i)).toBeInTheDocument();
    expect(screen.getByText(/animation_texts/i)).toBeInTheDocument();
  });
});
