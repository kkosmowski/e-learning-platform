import { useCallback } from 'react';

export function useLocalStorage() {
  const set = useCallback(<T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const get = useCallback(<T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }, []);

  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return {
    set,
    get,
    remove,
  };
}
