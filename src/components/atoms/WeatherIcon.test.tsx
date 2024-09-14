import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import weatherIcons from '../../assets/weatherIcons.svg';
import WeatherIcon from './WeatherIcon';

describe('WeatherIcon [Component]', () => {
  test('should render the SVG icon correctly', () => {
    const iconType = '01d';

    const { container } = render(<WeatherIcon icon={iconType} />);

    // The <svg> element does not have an accessible role by default, so I used querySelector.
    const svgElement = container.querySelector('svg.icon.weather-icon use');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('href', `${weatherIcons}#${iconType}`);
  });
});
