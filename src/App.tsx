import { useEffect, useState } from 'react';
import BackgroundSky from './components/molecules/BackgroundSky';
import ThemeBox from './components/molecules/ThemeBox';
import Navbar from './components/organisms/Navbar';
import Sidebar from './components/organisms/Sidebar';
import WeatherCard from './components/organisms/WeatherCard';
import { CITIES } from './config/consts';
import useWeather from './hooks/useWeather';
import type { FormattedWeatherDataType } from './types';
import classNames from './utils/classNames';

function App() {
  const { reloadWeatherData, getWeatherData, updateWeatherData } = useWeather();
  const [weatherData, setWeatherData] = useState<
    FormattedWeatherDataType | undefined | null
  >();
  const [currentCity, setCurrentCity] = useState(CITIES[0]);
  // State that controls whether the sidebar is open on mobile devices.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getWeatherData(currentCity).then((data) => {
      setWeatherData(data);
    });

    return () => setWeatherData(undefined);
  }, [reloadWeatherData, currentCity, getWeatherData]);

  return (
    <ThemeBox>
      <BackgroundSky weatherData={weatherData}>
        <main className={classNames('main', isSidebarOpen && 'sidebar--open')}>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <Sidebar
            currentCity={currentCity}
            setCurrentCity={setCurrentCity}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div className="container">
            <WeatherCard
              weatherData={weatherData}
              updateWeatherData={updateWeatherData}
            />
          </div>
        </main>
      </BackgroundSky>
    </ThemeBox>
  );
}

export default App;
