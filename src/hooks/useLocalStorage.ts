import { useEffect, useState } from "react";

//  sample initial data
const initialData = [
  {
    id: 1,
    title: "Complete React Context Integration",
    description: "Implement Context API with useReducer for state management.",
    status: "To-Do",
  },
  {
    id: 2,
    title: "Setup Unit Tests",
    description: "Write tests for components using Jest and React Testing Library.",
    status: "In Progress",
  },
];

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
