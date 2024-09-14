export type WeatherIconType = `${
  | '01'
  | '02'
  | '03'
  | '04'
  | '09'
  | '10'
  | '11'
  | '13'
  | '50'}${'d' | 'n'}`;

export interface IconColorsType {
  white: string;
  black: string;
  color: {
    day: string;
    night: string;
  };
}

export interface WeatherDataApiType {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  snow?: Snow;
  clouds: Clouds;
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface FerecastDataApiType {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastList[];
  city: City;
}

export interface FormattedWeatherDataType {
  date: DateInfo;
  name: string;
  temp: string;
  country: string;
  main: string;
  icon: WeatherIconType;
  description: string;
  details: (FormattedWeatherDataDetailType | null)[];
  daily_forecasts: FormattedWeatherDataDailyForecastType[];
}

interface DateInfo {
  fullday: string;
  time: string;
  local_time: number;
}

export interface FormattedWeatherDataDetailType {
  name: string;
  data: string;
}

interface FormattedWeatherDataDailyForecastType {
  icon: WeatherIconType;
  main: string;
  temp_minmax: string;
  date: string;
}

interface WeatherSys {
  type: number;
  id: number;
  message?: string;
  country: string;
  sunrise: number;
  sunset: number;
}

interface ForecastSys {
  pod: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  humidity: number;
  grnd_level: number;
  temp_kf?: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: WeatherIconType;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '1h'?: number;
  '3h'?: number;
}

interface Snow {
  '1h'?: number;
  '3h'?: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface ForecastList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: ForecastSys;
  dt_txt: string;
}
