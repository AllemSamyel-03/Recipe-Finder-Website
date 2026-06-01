export const getStorageData = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
