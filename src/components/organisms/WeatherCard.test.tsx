import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { FormattedWeatherDataType, WeatherIconType } from '../../types';
import WeatherCard from './WeatherCard';

vi.mock('../atoms/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('../atoms/WeatherIcon', () => ({
  default: ({ icon }: { icon: WeatherIconType }) => <div>{`${icon}`}</div>,
}));

vi.mock('../molecules/AnimateTextEffect', () => ({
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));

const mockWeatherData: FormattedWeatherDataType = {
  date: {
    fullday: 'Sep 14',
    time: '04:11',
    local_time: 0,
  },
  name: 'London',
  temp: '7ºC',
  country: 'GB',
  main: 'Clouds',
  icon: '03d',
  description: 'scattered clouds',
  details: [
    {
      name: 'Min. temperature',
      data: '4ºC',
    },
  ],
  daily_forecasts: [
    {
      icon: '04d',
      main: 'Rain',
      temp_minmax: '8/19ºC',
      date: 'Sep 14',
    },
  ],
};

describe('WeatherCard [Component]', () => {
  test('renders loading state when no weatherData is provided', () => {
    render(<WeatherCard updateWeatherData={vi.fn()} />);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('weather-card');
    expect(article).toBeInTheDocument();
  });

  test('renders weather data when weatherData is provided', () => {
    render(
      <WeatherCard weatherData={mockWeatherData} updateWeatherData={vi.fn()} />
    );

    const name = screen.getByText('London');
    const country = screen.getByText('GB');
    const fullday = screen.getAllByText('Sep 14');
    const time = screen.getByText('04:11');
    const temp = screen.getByText('7ºC');
    const icon = screen.getByText('03d');
    const description = screen.getByText('scattered clouds');
    const detailsName = screen.getByText('Min. temperature');
    const detailsData = screen.getByText('4ºC');
    const forecastIcon = screen.getByText('04d');
    const forecastTempMinmax = screen.getByText('8/19ºC');

    expect(name).toBeInTheDocument();
    expect(country).toBeInTheDocument();

    expect(fullday.length).toBeGreaterThan(0);
    fullday.forEach((element) => expect(element).toBeInTheDocument());

    expect(time).toBeInTheDocument();
    expect(temp).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(detailsName).toBeInTheDocument();
    expect(detailsData).toBeInTheDocument();
    expect(forecastIcon).toBeInTheDocument();
    expect(forecastTempMinmax).toBeInTheDocument();
  });

  test('calls updateWeatherData', () => {
    const mockUpdateWeatherData = vi.fn();

    render(
      <WeatherCard
        weatherData={mockWeatherData}
        updateWeatherData={mockUpdateWeatherData}
      />
    );

    fireEvent.click(screen.getByText('update_data'));

    expect(mockUpdateWeatherData).toHaveBeenCalledTimes(1);
  });
});
