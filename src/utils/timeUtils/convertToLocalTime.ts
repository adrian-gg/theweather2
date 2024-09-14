/*
 * Converts a UTC timestamp to local time based on the given timezone
 */
const convertToLocalTime = (timestamp: number, timezone: number) => {
  // Get the local machine's timezone offset in seconds (negative for behind UTC, positive for ahead)
  const localTimezoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;
  const adjustedTimestampInMilliseconds =
    (timestamp + timezone + localTimezoneOffsetInSeconds) * 1000;

  return new Date(adjustedTimestampInMilliseconds);
};

export default convertToLocalTime;
