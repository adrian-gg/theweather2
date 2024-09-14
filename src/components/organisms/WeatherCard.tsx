import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import type {
  FormattedWeatherDataDailyForecastType,
  FormattedWeatherDataDetailType,
  FormattedWeatherDataType,
} from '../../types';
import Button from '../atoms/Button';
import WeatherIcon from '../atoms/WeatherIcon';
import AnimateTextEffect from '../molecules/AnimateTextEffect';

interface WeatherDetailsProps {
  details: (FormattedWeatherDataDetailType | null)[];
}

interface WeatherForecastsProps {
  dailyForecasts: FormattedWeatherDataDailyForecastType[];
}

interface WeatherCardProps {
  weatherData?: FormattedWeatherDataType | null;
  updateWeatherData: () => void;
}

function WeatherCardLoading() {
  return (
    <article className="weather-card weather-card--loading">
      <header className="weather-card__header" />
      <div className="weather-card__body" />
    </article>
  );
}

function WeatherCardError({ error }: { error: string }) {
  return (
    <article className="weather-card weather-card--error">
      <header className="weather-card__header">{error}</header>
      <div className="weather-card__body" />
    </article>
  );
}

function WeatherCardDetails({ details }: WeatherDetailsProps) {
  return (
    <dl className="details-list">
      {details.map(
        (detail) =>
          detail && (
            <div key={`detail_${detail.name}`} className="detail">
              <dt className="detail-title">
                <AnimateTextEffect text={detail.name} order={1} />
              </dt>
              <dd className="detail-description">
                <AnimateTextEffect text={detail.data} order={2} />
              </dd>
            </div>
          )
      )}
    </dl>
  );
}

function WeatherCardForecasts({ dailyForecasts }: WeatherForecastsProps) {
  return (
    <ul className="forecasts-list">
      {dailyForecasts.map((dailyForecast) => (
        <li key={dailyForecast.date} className="forecast">
          <div className="forecast-icon-box">
            <WeatherIcon icon={dailyForecast.icon} />
          </div>
          <div className="forecast-temperature">
            <AnimateTextEffect text={dailyForecast.temp_minmax} order={2} />
          </div>
          <div className="forecast-date">
            <AnimateTextEffect text={dailyForecast.date} order={2} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function WeatherCard({ weatherData, updateWeatherData }: WeatherCardProps) {
  const { getTranslation } = useContext(LanguageContext);

  if (weatherData === undefined) return <WeatherCardLoading />;
  if (weatherData === null)
    return (
      <WeatherCardError error={`${getTranslation('error_not_found')} :(`} />
    );
  const { name, country, date, icon, temp, description } = weatherData;

  const handleUpdateData = () => {
    window.scrollTo(0, 0);
    updateWeatherData();
  };

  return (
    <article className="weather-card">
      <header className="weather-card__header">
        <div className="weather-data weather-data--top">
          <div className="weather-city">
            <AnimateTextEffect text={name} order={1} />
            <span className="weather-country">
              <AnimateTextEffect text={country} order={1} />
            </span>
          </div>

          <div className="weather-date">
            <div className="weather-day">
              <AnimateTextEffect order={1} text={date?.fullday} />
            </div>
            <div className="weather-time">
              <AnimateTextEffect order={1} text={date?.time} />
            </div>
          </div>
        </div>

        <div className="weather-icon-box">
          <WeatherIcon icon={icon} />
        </div>

        <div className="weather-data weather-data--bot">
          <div className="weather-temperature">
            <AnimateTextEffect order={2} text={temp} />
          </div>
          <div className="weather-description">
            <AnimateTextEffect
              order={2}
              text={description}
              alignText="r"
              multiline
            />
          </div>
        </div>
      </header>

      <div className="weather-card__body">
        <Button className="reload-data" onClick={handleUpdateData}>
          <AnimateTextEffect text="update_data" order={1} />
        </Button>

        <div className="details">
          <WeatherCardDetails details={weatherData.details} />
        </div>

        <div className="forecasts">
          <p className="forecasts-title">
            <AnimateTextEffect text="forecast" order={1} />
          </p>
          <WeatherCardForecasts dailyForecasts={weatherData.daily_forecasts} />
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;
