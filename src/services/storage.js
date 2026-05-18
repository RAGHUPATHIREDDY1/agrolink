export function loadFromStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Storage load error', error);
    return null;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage save error', error);
  }
}

export function createId(prefix = 'ID') {
  return `${prefix}${Math.random().toString(36).slice(2, 10).toUpperCase()}${Date.now().toString().slice(-4)}`;
}
