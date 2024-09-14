import { useCallback, useState } from 'react';
import { THEMES } from '../config/consts';
import getNavigatorTheme from '../utils/getNavigatorTheme';
import getFromLocal from '../utils/localStoregeUtils/getFromLocal';
import saveToLocal from '../utils/localStoregeUtils/saveToLocal';
import toCapitalizeCase from '../utils/toCapitalizeCase';

export type ThemeType = (typeof THEMES)[number];

const LOCAL_STORAGE_KEY = 'theweather-theme';

// Create data type format for SelectField component
export const themeOptions = THEMES.map((theme) => ({
  value: theme,
  option: toCapitalizeCase(theme),
}));

function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<{
    selected: ThemeType;
    navigator: ThemeType;
  }>(
    () =>
      getFromLocal(LOCAL_STORAGE_KEY) || {
        selected: themeOptions[0].value,
        navigator: themeOptions[0].value,
      }
  );

  // Function to change the current theme to the selected one
  const changeTheme = useCallback((themeSelected: string) => {
    const newTheme = {
      selected: themeSelected as ThemeType,
      navigator:
        themeSelected === 'auto'
          ? getNavigatorTheme()
          : (themeSelected as ThemeType),
    };

    saveToLocal(LOCAL_STORAGE_KEY, newTheme);

    setCurrentTheme(newTheme);
  }, []);

  return {
    currentTheme,
    changeTheme,
  };
}

export default useTheme;
