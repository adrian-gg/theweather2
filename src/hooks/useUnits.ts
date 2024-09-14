import { useCallback, useState } from 'react';
import { UNITS } from '../config/consts';

export type TemperatureUnitType = (typeof UNITS)[number]['api_name'];

// Create data type format for SelectField component
export const unitOptions = UNITS.map((unit) => ({
  value: unit.api_name as string,
  option: `${unit.temp} ${unit.speed}` as string,
}));

function useUnits() {
  const [currentUnits, setCurrentUnits] = useState<TemperatureUnitType>(
    UNITS[0].api_name
  );

  const changeUnits = useCallback((newTemperatureUnit: string) => {
    setCurrentUnits(newTemperatureUnit as TemperatureUnitType);
  }, []);

  return {
    currentUnits,
    unitOptions,
    changeUnits,
  };
}

export default useUnits;
