import { CITIES } from '../../config/consts';
import classNames from '../../utils/classNames';
import Accordion from '../atoms/Accordion';
import Anchor from '../atoms/Anchor';
import AnimateTextEffect from '../molecules/AnimateTextEffect';
import Settings from '../molecules/Settings';
import Form from './Form';

interface CityListProps {
  currentCity: string;
  onCitySelect: (city: string) => void;
}

interface SidebarProps {
  currentCity: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesList({ currentCity, onCitySelect }: CityListProps) {
  return (
    <ul className="list">
      {CITIES.map((city) => (
        <li key={city} className="list-item">
          <Anchor
            href={city}
            className={classNames(city === currentCity && 'anchor--clicked')}
            onClick={() => onCitySelect(city)}
          >
            <AnimateTextEffect text={city} />
          </Anchor>
        </li>
      ))}
    </ul>
  );
}

function Sidebar({
  currentCity,
  setCurrentCity,
  setIsSidebarOpen,
}: SidebarProps) {
  const handleLoadCityWeather = (city: string) => {
    window.scrollTo(0, 0);
    setCurrentCity(city);
    setIsSidebarOpen(false);
  };

  const labelAnimated = (label: string) => {
    return <AnimateTextEffect text={label} />;
  };

  return (
    <div className="sidebar">
      <div className="logo">theweather</div>

      <div className="sidebar__content">
        <Accordion label={labelAnimated('cities')} isOpen>
          <CitiesList
            currentCity={currentCity}
            onCitySelect={handleLoadCityWeather}
          />
        </Accordion>

        <Accordion label={labelAnimated('contact')} isOpen={false}>
          <Form />
        </Accordion>

        <Accordion label={labelAnimated('settings')} isOpen={false}>
          <Settings />
        </Accordion>
      </div>
    </div>
  );
}

export default Sidebar;
