import { ForecastList } from '../../types';
import formatDate from '../timeUtils/formatDate';

/*
 * Formats the forecast list to display daily forecasts.
 */
const formatDailyForecasts = (
  forecastList: ForecastList[],
  language: string,
  monthNames: string[], // Names of months in the specified language.
  tempUnit: string
) => {
  // Filter the data to include only forecasts for 12:00 PM
  const dailyForecasts = forecastList
    .filter(
      (currentForecast) => new Date(currentForecast.dt_txt).getHours() === 12
    )
    .map((currentForecast) => {
      const date = new Date(currentForecast.dt_txt);
      const dateKey = currentForecast.dt_txt.slice(0, 10); // Date key (year-month-day)

      // Filter forecasts for the same day
      const forecastsForDay = forecastList.filter(
        (forecastItem) => dateKey === forecastItem.dt_txt.slice(0, 10)
      );

      // Calculate the minimum and maximum temperature for the day
      const minTemperature = Math.min(
        ...forecastsForDay.map((item) => item.main.temp_min)
      );
      const maxTemperature = Math.max(
        ...forecastsForDay.map((item) => item.main.temp_max)
      );
      const temperatureRange = `${Math.floor(minTemperature)}/${Math.floor(maxTemperature)}${tempUnit}`;

      // Create an object with the formatted daily forecast
      return {
        icon: currentForecast.weather[0].icon, // Weather icon
        main: currentForecast.weather[0].main, // Main weather description
        temp_minmax: temperatureRange, // Minimum and maximum temperature
        date: formatDate(date, language, monthNames), // Formatted date
      };
    });

  // Return the first five days of forecast
  return dailyForecasts.slice(0, 5);
};

export default formatDailyForecasts;
