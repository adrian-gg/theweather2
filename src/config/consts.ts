export const CITIES: string[] = [
  'London',
  'Berlin',
  'Tokyo',
  'San Francisco',
  'New York',
] as const;

export const INPUT_FIELDS = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'email',
    type: 'email',
  },
  {
    name: 'birthdate',
    type: 'date',
  },
  {
    name: 'city',
    type: 'text',
  },
  {
    name: 'phone',
    type: 'tel',
  },
] as const;

export const UNITS = [
  {
    api_name: 'metric',
    temp: 'ºC',
    speed: 'm/s',
  },
  {
    api_name: 'imperial',
    temp: 'ºF',
    speed: 'mpf',
  },
] as const;

export const THEMES = ['light', 'dark', 'auto'] as const;
