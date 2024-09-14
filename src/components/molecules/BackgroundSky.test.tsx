import { render, screen } from '@testing-library/react';
import { describe, expect, Mock, test, vi } from 'vitest';
import { FormattedWeatherDataType } from '../../types';
import getPercentElapsedDay from '../../utils/getPercentElapsedDay';
import BackgroundSky from './BackgroundSky';

// Creating a mock of the getPercentElapsedDay function
vi.mock('../../utils/getPercentElapsedDay', () => ({
  default: vi.fn(),
}));

describe('BackgroundSky [Component]', () => {
  test('should apply the correct style based on weatherData', () => {
    const mockWeatherData: FormattedWeatherDataType = {
      date: {
        local_time: 0,
        fullday: '',
        time: '',
      },
      name: '',
      temp: '',
      country: '',
      main: '',
      icon: '01d',
      description: '',
      details: [],
      daily_forecasts: [],
    };

    // Defines the return value of the mock (getPercentElapsedDay).
    (getPercentElapsedDay as Mock).mockReturnValue(50);

    render(
      <BackgroundSky weatherData={mockWeatherData}>
        <div>Test Content</div>
      </BackgroundSky>
    );

    const backgroundSky = screen.getByText('Test Content').parentElement;
    expect(backgroundSky).toHaveStyle('--percent-elapsed-day: 50%');
  });

  test('should render children correctly', () => {
    render(
      <BackgroundSky>
        <span>Child Element</span>
      </BackgroundSky>
    );

    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
