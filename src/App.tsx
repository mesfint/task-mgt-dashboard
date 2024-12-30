//import './App.css'

import { Box, Typography } from '@mui/material';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { TasksProvider } from "./context/TasksContext";








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
