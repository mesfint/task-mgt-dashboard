//import './App.css'

import { Box, Typography } from '@mui/material';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { TasksProvider } from "./context/TasksContext";



//   {
//     id: 1,
//     title: "Complete React Context Integration",
//     description: "Implement Context API with useReducer for state management.",
//     status: "To-Do", // Other statuses: "In Progress", "Completed"
//   },
//   {
//     id: 2,
//     title: "Setup Unit Tests",
//     description: "Write tests for components using Jest and React Testing Library.",
//     status: "In Progress",
//   }
 

// ];




function App() {

  return (
    <TasksProvider>
    <Box style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Typography sx={{ textAlign: "center" }}>Task Manager</Typography>
      <AddTaskForm />
      <TaskList />
    </Box>
  </TasksProvider>
  )
}

export default App
