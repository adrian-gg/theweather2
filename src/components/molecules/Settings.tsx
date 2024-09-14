import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { themeOptions } from '../../hooks/useTheme';
import { unitOptions } from '../../hooks/useUnits';
import InputField from '../atoms/InputField';
import SelectField from '../atoms/SelectField';
import AnimateTextEffect from './AnimateTextEffect';

function Settings() {
  const {
    currentUnits,
    changeUnits,
    currentTheme,
    changeTheme,
    isAnimationEnabled,
    toggleAnimation,
  } = useContext(SettingsContext);

  return (
    <div className="settings">
      <SelectField
        id="temperature-unit"
        onChange={changeUnits}
        listOptions={unitOptions}
        defaultOption={currentUnits}
      >
        <AnimateTextEffect text="temperature_unit" />
      </SelectField>

      <SelectField
        id="theme"
        onChange={changeTheme}
        listOptions={themeOptions}
        defaultOption={currentTheme.selected}
      >
        <AnimateTextEffect text="theme" />
      </SelectField>

      <InputField
        type="checkbox"
        id="animation-toggle"
        onChange={toggleAnimation}
        checked={isAnimationEnabled}
        required={false}
      >
        <AnimateTextEffect text="animation_texts" />
      </InputField>
    </div>
  );
}

export default Settings;
