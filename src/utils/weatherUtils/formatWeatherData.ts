import { UNITS } from '../../config/consts';
import { LanguageType } from '../../config/translations';
import type { TemperatureUnitType } from '../../hooks/useUnits';
import type {
  ForecastList,
  FormattedWeatherDataType,
  WeatherDataApiType,
} from '../../types';
import convertToLocalTime from '../timeUtils/convertToLocalTime';
import formatDate from '../timeUtils/formatDate';
import formatTime from '../timeUtils/formatTime';
import formatDailyForecasts from './formatDailyForecasts';
import formatTemperature from './formatTemperature';
import formatWeatherDetailsData from './formatWeatherDetailsData';

const formatWeatherData = (
  weatherData: WeatherDataApiType,
  forecastData: ForecastList[],
  currentTemperatureUnit: TemperatureUnitType,
  currentLanguage: LanguageType,
  monthNames: string[],
  getTranslation: (key: string) => string
) => {
  const {
    name, // City name
    dt, // Time in Unix format (UTC)
    timezone,
    main: { temp },
    sys: { country }, // Country (e.g., GB, ES)
    weather,
  } = weatherData; // Data from API

  // Filter to get the correct temperature unit (e.g., °C or °F) based on the selected unit
  const unit = UNITS.filter(
    ({ api_name }) => currentTemperatureUnit === api_name
  )[0];

  // Convert UTC time to local time based on the time zone
  const localTime = convertToLocalTime(dt, timezone);
  const currentDate = new Date();

  const formattedWeatherData: FormattedWeatherDataType = {
    date: {
      fullday: formatDate(localTime, currentLanguage, monthNames), // Formatted date (e.g., 1 April)
      time: formatTime(localTime, currentDate), // Formatted time (HH:MM)
      local_time: localTime.getTime(), // Local time in milliseconds
    },
    name,
    temp: formatTemperature(temp, unit.temp),
    country,
    main: weather[0].main, // Main weather condition (e.g., Clear, Rain)
    icon: weather[0].icon,
    description: weather[0].description,
    details: formatWeatherDetailsData(weatherData, getTranslation, unit), // Additional weather details like humidity, wind speed, etc.
    daily_forecasts: formatDailyForecasts(
      forecastData,
      currentLanguage,
      monthNames,
      unit.temp
    ), // Daily forecasts with formatted dates and temperatures
  };

  return formattedWeatherData;
};

export default formatWeatherData;
