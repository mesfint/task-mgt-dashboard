import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue && savedValue !== "undefined") {
        return JSON.parse(savedValue);
      }
      return initialValue;
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};
