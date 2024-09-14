const saveToLocal = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving to localStorage', error);
  }
};

export default saveToLocal;
