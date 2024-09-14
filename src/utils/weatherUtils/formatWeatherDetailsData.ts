import { WeatherDataApiType } from '../../types';
import getWindDirection from '../getWindDirection';
import formatTemperature from './formatTemperature';

/*
 * Formats the detailed weather data (like temperature, wind, humidity, etc.)
 * for display in the UI.
 */
const formatWeatherDetailsData = (
  weatherData: WeatherDataApiType,
  getTranslation: (key: string) => string,
  unit: {
    api_name: string;
    temp: string;
    speed: string;
  }
) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    main: { temp_min, temp_max, feels_like, pressure, humidity },
    wind: { speed, deg },
    clouds: { all },
    visibility,
    rain = '',
    snow = '',
  } = weatherData; // Weather data from the API.

  const formattedWeatherDetailsData = [
    {
      name: getTranslation('temp_min'),
      data: formatTemperature(temp_min, unit.temp),
    },
    {
      name: getTranslation('temp_max'),
      data: formatTemperature(temp_max, unit.temp),
    },
    {
      name: getTranslation('feels_like'),
      data: formatTemperature(feels_like, unit.temp),
    },
    {
      name: getTranslation('wind'),
      data: `${speed.toString()}${unit.speed} ${getWindDirection(deg)}`,
    },
    {
      name: getTranslation('pressure'),
      data: `${pressure.toString()}hPa`,
    },
    { name: getTranslation('clouds'), data: `${all}%` },
    {
      name: getTranslation('humidity'),
      data: `${humidity.toString()}%`,
    },
    {
      name: getTranslation('visibility'),
      data: `${(visibility / 1000).toString()}km`,
    },
    rain
      ? {
          name: getTranslation('rain'),
          data: `${rain?.['1h'] ?? rain?.['3h']}mm`,
        }
      : null,
    snow
      ? {
          name: getTranslation('snow'),
          data: `${snow?.['1h'] ?? snow?.['3h']}mm`,
        }
      : null,
  ];

  return formattedWeatherDetailsData;
};

export default formatWeatherDetailsData;
