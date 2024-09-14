import { useCallback, useContext, useState } from 'react';
import TRANSLATIONS from '../config/translations';
import { LanguageContext } from '../context/LanguageContext';
import { SettingsContext } from '../context/SettingsContext';
import getFromApi from '../services/apiService';
import formatWeatherData from '../utils/weatherUtils/formatWeatherData';

function useWeather() {
  const { currentLanguage, getTranslation } = useContext(LanguageContext);
  const { currentUnits } = useContext(SettingsContext);
  const [reloadWeatherData, setReloadWeatherData] = useState(false);
  const monthNames = TRANSLATIONS[currentLanguage].arr_months;

  const getWeatherData = useCallback(
    async (currentCity: string) => {
      try {
        const path = `weather?q=${currentCity}&units=${currentUnits}&lang=${currentLanguage}`;
        const currentWeatherData = await getFromApi(path);
        const forecast5Path = `forecast?lat=${currentWeatherData.coord.lat}&lon=${currentWeatherData.coord.lon}&units=${currentUnits}&lang=${currentLanguage}`;
        const dataForecast5 = await getFromApi(forecast5Path);

        return formatWeatherData(
          currentWeatherData,
          dataForecast5.list,
          currentUnits,
          currentLanguage,
          monthNames as string[],
          getTranslation
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching weather data:', error);
        return null;
      }
    },
    [currentLanguage, currentUnits, getTranslation, monthNames]
  );

  const updateWeatherData = () => {
    setReloadWeatherData((prevState) => !prevState);
  };

  return { reloadWeatherData, getWeatherData, updateWeatherData };
}

export default useWeather;
