'use client';

import { useState, useEffect } from 'react';

type ReturnType<T> = [T, (value: T) => void];

export default function useLocalStorage<T>(key: string, initialValue: T): ReturnType<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        const parsed = JSON.parse(item);
        setStoredValue(parsed);
      }
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
    }
  }, [key]);

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error setting localStorage key:', key, error);
    }
  };

  return [storedValue, setValue];
}
