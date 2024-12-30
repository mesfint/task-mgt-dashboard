import { useEffect, useState } from "react";

// Generic hook for LocalStorage with conditional initialization
export const useLocalStorage = <T>(key: string, initialData: T) => {
  const [value, setValue] = useState<T>(() => {
    // Check if there’s data in localStorage
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        // Parse existing data
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return initialData; // Fallback to initialData if parsing fails
      }
    } else {
      // If no data exists, store the initialData
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
  });

  // Sync localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
