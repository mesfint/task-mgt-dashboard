import React, { createContext, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { tasksReducer } from "../reducers/TasksReducer";
import { Action, State } from "../types/types";


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

export const TasksContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the hook to get initial data and persist tasks
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", initialData);

  // Initialize state with the reducer and stored tasks
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: storedTasks,
    editingTaskId: null,
    editingTask: null,
  });

  // Update localStorage whenever tasks change
  React.useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
