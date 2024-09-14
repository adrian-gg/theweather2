/*
 * Formats the time in HH:MM format
 */
const formatTime = (localTime: Date, date: Date) => {
  const hour = localTime.getHours();
  const min = date.getMinutes();

  return `${hour.toString().padStart(2, '0')}:${min
    .toString()
    .padStart(2, '0')}`;
};

export default formatTime;
