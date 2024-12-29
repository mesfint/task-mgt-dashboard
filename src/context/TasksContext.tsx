import React, { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task, TaskContextType } from '../types/types';



export const TasksContext= createContext<TaskContextType | undefined>(undefined)



export const TasksProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks",[]);
const [editingTaskId, setEditingTaskId] = React.useState<number | null>(null);
const [editingTask, setEditingTask] = React.useState<Task | null>(null);


const addTask=(title:string,description:string,status:string)=>{

      const newTask: Task = {
            id: Date.now(),
             title,
             description,
             status: "To-Do"
            }
    
              setTasks([...tasks, newTask ]);

      };

      const startEditing=(id: number, title: string,description:string,status:string)=>{
            setEditingTaskId(id);
            setEditingTask({ id, title, description, status });
            console.log("editingID",editingTaskId)


      }
      

      const saveTask = (title: string, description: string, status: string) => {
            const updatedTasks = tasks.map((task) =>
              task.id === editingTaskId ? { ...task, title, description, status } : task
            );
            setTasks(updatedTasks);
            setEditingTaskId(null); // Reset
            setEditingTask(null); // Reset
          };

      const cancelEdit = ()=>{
            setEditingTaskId(null);
            setEditingTask(null);

            
         
          } 
      const deleteTask = (id: number) => {
            setTasks(tasks.filter((task) => task.id !== id));
          };
            
      const isEditing = editingTaskId !== null;

    
       return (
       
       <TasksContext.Provider value= {{ tasks,addTask,startEditing,isEditing,editingTask,saveTask,deleteTask,cancelEdit}}>
            {children}

       </TasksContext.Provider>
       )
};
