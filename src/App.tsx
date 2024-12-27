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
  const[formData, setFormData]= React.useState({title:"",description:"",status:""})
  const [removeTasks, setRemoveTasks] = React.useState<number | null>(null)
  const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
    const [tasks, setTasks] = React.useState<Task[]>(() => {
  const savedTasks = localStorage.getItem("tasks");
  const cleanData = savedTasks ? JSON.parse(savedTasks) : [];
  return Array.isArray(cleanData) ? cleanData : [];

  
});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

       const newTask: Task = {
        id: Date.now(),
         title: formData.title,
         description: formData.description,
         status: formData.status
        }
      
        // Update state with the new task
        setTasks((prev) => ([...prev, newTask ]));
       //Store Tasks in LS

    // Reset the form fields
    setFormData({ title: '', description: '',status:'' });
  },[formData]);

  React.useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))     

  },[tasks])

  const startEditing = (id: number, title: string,description:string,status:string)=>{
    setEditingTaskId(id);
    //setEditingTask(task);
    setFormData({ title, description,status });


  }
  //Update the Task state
  const saveTask=()=>{
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, title: formData.title, description: formData.description, status: formData.status }
        : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setFormData({ title: "", description: "", status: "To-Do" });

  }
  const cancleEdit = ()=>{
    setEditingTaskId(null);
    setFormData({title:"", description:"",status:"TO-DO"})
 
  }

//delete tasks
  const deleteTask=(id:number)=>{
    const del = tasks.filter((task)=>task.id !==id)
    setTasks(del)
    setRemoveTasks(null)
    
  }

  return (
    <>
      <AddTaskForm
      onAddTask={editingTaskId ? saveTask: handleSubmit}
      onChange={handleInputChange}
       formData={formData}
       isEditing={editingTaskId !== null}
       onCancle={cancleEdit}
       

       
       />
      <TaskList 
      tasks={tasks}
       onDelete={deleteTask}
       onStartEditing={startEditing}
 
       
           />

       
    </>
  )
}

export default App
