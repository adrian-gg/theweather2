const getFromLocal = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  try {
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    return null;
  }
};

export default getFromLocal;
