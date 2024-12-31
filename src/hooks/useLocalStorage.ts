import { useEffect, useState } from "react";

//  sample initial data

// Generic hook for localStorage management
export const useLocalStorage = <T>(key: string, initialData: T) => {
  const [value, setValue] = useState<T>(() => {
    // Check if data exists in localStorage
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        // Parse existing data
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return initialData; // Fallback to initial data
      }
    } else {
      // Save the initial data to localStorage if it doesn't exist
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
  });

  // Sync value changes with localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const; // Return the value and updater function
};
