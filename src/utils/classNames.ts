/*
 * Combines multiple class names into a single string.
 */
const classNames = (...classes: (string | boolean)[]): string => {
  return classes
    .filter((cls): cls is string => !!cls && typeof cls === 'string')
    .join(' ');
};

export default classNames;
