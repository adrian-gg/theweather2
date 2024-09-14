import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';
import { CITIES } from './config/consts';
import useWeather from './hooks/useWeather';

vi.mock('./hooks/useWeather');
vi.mock('./components/molecules/BackgroundSky', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('./components/molecules/ThemeBox', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock('./components/organisms/Navbar', () => ({
  default: ({ isSidebarOpen, setIsSidebarOpen }: any) => (
    <button type="button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
      Toggle Sidebar
    </button>
  ),
}));
vi.mock('./components/organisms/Sidebar', () => ({
  default: ({ setCurrentCity }: any) => (
    <button type="button" onClick={() => setCurrentCity(CITIES[1])}>
      Change City
    </button>
  ),
}));
vi.mock('./components/organisms/WeatherCard', () => ({
  default: () => <div>Weather Card</div>,
}));

describe('App [Component]', () => {
  const mockWeatherData = { temp: 25, city: 'CityName' };

  beforeEach(() => {
    // Configuring the mocks of the hook useWeather
    (useWeather as any).mockReturnValue({
      reloadWeatherData: false,
      getWeatherData: vi.fn().mockResolvedValue(mockWeatherData),
      updateWeatherData: vi.fn(),
    });
  });

  test('should render Navbar, Sidebar, and WeatherCard components', async () => {
    render(<App />);

    const navbarButton = screen.getByText('Toggle Sidebar');
    const sidebar = screen.getByText('Change City');
    const weatherCard = screen.getByText('Weather Card');

    expect(navbarButton).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(weatherCard).toBeInTheDocument();

    await waitFor(() => {
      expect(useWeather().getWeatherData).toHaveBeenCalledWith(CITIES[0]);
    });
  });

  test('should toggle the sidebar state when clicking Navbar button', () => {
    render(<App />);

    const navbarButton = screen.getByText('Toggle Sidebar');
    expect(
      document.querySelector('.main')?.classList.contains('sidebar--open')
    ).toBe(false);

    fireEvent.click(navbarButton);

    expect(
      document.querySelector('.main')?.classList.contains('sidebar--open')
    ).toBe(true);
  });

  test('should change the city when clicking the Sidebar button', async () => {
    render(<App />);

    const changeCityButton = screen.getByText('Change City');
    fireEvent.click(changeCityButton);

    await waitFor(() => {
      expect(useWeather().getWeatherData).toHaveBeenCalledWith(CITIES[1]);
    });
  });
});
