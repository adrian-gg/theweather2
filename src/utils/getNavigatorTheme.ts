/*
 * Determines the user's preferred color scheme based on the system settings.
 */
const getNavigatorTheme = () => {
  const navigatorTheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  return navigatorTheme;
};

export default getNavigatorTheme;
