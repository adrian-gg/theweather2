const TOTAL_SECONDS_IN_A_DAY = 86400;

/*
 * Calculates the percentage of the day that has elapsed
 * based on the provided local time.
 */
const getPercentElapsedDay = (percentElapsedDay: number, localTime: number) => {
  if (localTime) {
    const now = new Date(localTime);
    const hour = now.getHours() * 60 * 60;
    const min = now.getMinutes() * 60;

    const totalSeconds = hour + min;
    const percentageElapsed = Math.floor(
      (totalSeconds * 100) / TOTAL_SECONDS_IN_A_DAY
    );

    return percentageElapsed;
  }

  return percentElapsedDay;
};

export default getPercentElapsedDay;
