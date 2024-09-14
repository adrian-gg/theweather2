import { useEffect, useState } from 'react';
import type { FormattedWeatherDataType } from '../../types';
import getPercentElapsedDay from '../../utils/getPercentElapsedDay';

interface BackgroundSkyProps {
  weatherData?: FormattedWeatherDataType | null;
  children: React.ReactNode;
}

/*
 * Component representing the colour of the sky according to
 * the time at which the weather data were obtained.
 */
function BackgroundSky({ weatherData, children }: BackgroundSkyProps) {
  const [percentElapsedDay, setPercentElapsedDay] = useState(0);

  const stypePercentElapsedDay = {
    '--percent-elapsed-day': `${percentElapsedDay}%`,
  } as React.CSSProperties;

  useEffect(() => {
    if (weatherData) {
      const currentPercentElapsedDay = getPercentElapsedDay(
        percentElapsedDay,
        weatherData.date.local_time
      );

      if (percentElapsedDay !== currentPercentElapsedDay) {
        setPercentElapsedDay(currentPercentElapsedDay);
      }
    }
  }, [percentElapsedDay, weatherData]);

  return (
    <div className="background-sky" style={stypePercentElapsedDay}>
      {children}
    </div>
  );
}

export default BackgroundSky;
