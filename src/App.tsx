//import './App.css'

import React from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/types';

export const dummyTasks:Task[] = [
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
  }
 

];




function App() {
  const[formData, setFormData]= React.useState({title:"",description:""})
const [tasks,setTasks] = React.useState<Task[]>(dummyTasks || []);

console.log("Parent tasks state-App:", tasks);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

       const newTask: Task = {
        id: Date.now(),
         title: formData.title,
         description: formData.description,
         status: 'To-Do'
        }
      
        // Update state with the new task
        setTasks((prev) => ([...prev, newTask ]));
            // Make an API request or perform any necessary actions with the form data
    console.log(tasks);

    // Reset the form fields
    setFormData({ title: '', description: '' });
  },[formData]);



  return (
    <>
      <AddTaskForm onAddTask={handleSubmit} onChange={handleInputChange} formData={formData} />
      <TaskList tasks={tasks}/>

       
    </>
  )
}

export default App
