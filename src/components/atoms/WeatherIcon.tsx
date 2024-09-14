import weatherIcons from '../../assets/weatherIcons.svg';
import type { WeatherIconType } from '../../types';

interface WeatherIconProps {
  icon: WeatherIconType;
}

function WeatherIcon({ icon }: WeatherIconProps) {
  const iconRute = `${weatherIcons}#${icon}`;

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon weather-icon"
    >
      <use href={iconRute} />
    </svg>
  );
}

export default WeatherIcon;
