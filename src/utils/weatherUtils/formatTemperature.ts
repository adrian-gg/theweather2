const formatTemperature = (temp: number, unit: string) => {
  return temp ? Math.floor(temp) + unit : `##${unit}`;
};

export default formatTemperature;
