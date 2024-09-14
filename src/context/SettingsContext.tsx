import React, { createContext, useMemo } from 'react';
import { UNITS } from '../config/consts';
import useAnimationText from '../hooks/useAnimationText';
import useTheme, { themeOptions, type ThemeType } from '../hooks/useTheme';
import useUnits, { type TemperatureUnitType } from '../hooks/useUnits';

interface SettingsContextType {
  currentUnits: TemperatureUnitType;
  changeUnits: (unit: string) => void;
  currentTheme: { selected: ThemeType; navigator: ThemeType };
  changeTheme: (theme: string) => void;
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

interface SettingsProviderProps {
  children: React.ReactNode;
}

const defaultValue = {
  currentUnits: UNITS[0].api_name,
  changeUnits: () => {},
  currentTheme: {
    selected: themeOptions[0].value,
    navigator: themeOptions[0].value,
  },
  changeTheme: () => {},
  isAnimationEnabled: true,
  toggleAnimation: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(defaultValue);

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const { currentUnits, changeUnits } = useUnits();
  const { isAnimationEnabled, toggleAnimation } = useAnimationText();
  const { currentTheme, changeTheme } = useTheme();

  const value = useMemo(
    () => ({
      currentUnits,
      changeUnits,
      currentTheme,
      changeTheme,
      isAnimationEnabled,
      toggleAnimation,
    }),
    [
      currentUnits,
      changeUnits,
      currentTheme,
      changeTheme,
      isAnimationEnabled,
      toggleAnimation,
    ]
  );
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
