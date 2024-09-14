const WIND_DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

/*
 * Function that obtains the cardinal direction corresponding to
 * the wind direction in degrees.
 */
const getWindDirection = (degrees: number) => {
  // degrees can be negative so it's necessary to normalize them
  const normalizedDegrees = (degrees + 360) % 360;
  const index = Math.floor((normalizedDegrees + 11.25) / 22.5) % 16;

  return WIND_DIRECTIONS[index];
};

export default getWindDirection;
