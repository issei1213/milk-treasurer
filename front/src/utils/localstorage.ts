export const getLocalStorage = async (key: string): Promise<string> => {
  return Promise.resolve().then(() => localStorage.getItem(key) ?? '')
}

export const setLocalStorage = async (
  key: string,
  value: string,
): Promise<void> => {
  return Promise.resolve().then(() => localStorage.setItem(key, value))
}

export const removeLocalStorage = async (key: string): Promise<void> => {
  return Promise.resolve().then(() => localStorage.removeItem(key))
}
