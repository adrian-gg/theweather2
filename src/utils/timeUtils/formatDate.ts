/*
 * Formats a Date object into a readable date string, adjusting the order
 * of day and month based on the language.
 */
const formatDate = (date: Date, language: string, monthNames: string[]) => {
  const day = date.getDate();
  const monthName = monthNames[date.getMonth()];

  return language === 'en'
    ? `${monthName} ${day.toString().padStart(2, '0')}`
    : `${day.toString().padStart(2, '0')} ${monthName}`;
};

export default formatDate;
