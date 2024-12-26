//import './App.css'
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

export const dummyTasks = [
  {
    id: 1,
    title: "Complete React Context Integration",
    description: "Implement Context API with useReducer for state management.",
    status: "To-Do", // Other statuses: "In Progress", "Completed"
  },
  {
    id: 2,
    title: "Setup Unit Tests",
    description: "Write tests for components using Jest and React Testing Library.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Refactor TaskList Component",
    description: "Optimize TaskList using React.memo and useCallback.",
    status: "To-Do",
  },
  {
    id: 4,
    title: "Deploy to Netlify",
    description: "Publish the app and ensure it's mobile-friendly.",
    status: "Completed",
  },
  {
    id: 5,
    title: "Add Dark Mode Feature",
    description: "Integrate a toggle button to switch between light and dark themes.",
    status: "In Progress",
  },
];




function App() {


  return (
    <>
      <AddTaskForm />
      <TaskList tasks={dummyTasks}/>

       
    </>
  )
}

export default App
