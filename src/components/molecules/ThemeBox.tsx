import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

interface ThemeBoxProps {
  children: React.ReactNode;
}

/*
 * Sets the theme of the main container according to the user's selection (manual or automatic).
 */
function ThemeBox({ children }: ThemeBoxProps) {
  const { currentTheme } = useContext(SettingsContext);

  return (
    <div
      id="theme-box"
      data-theme={
        currentTheme.selected === 'auto'
          ? currentTheme.navigator
          : currentTheme.selected
      }
    >
      {children}
    </div>
  );
}

export default ThemeBox;
