/* eslint-disable no-case-declarations */
import { Action, State, Task } from "../types/types";


export const initialState: State = {
    tasks: [], // The list of tasks
    editingTaskId:  null, // No task is being edited initially
    editingTask: null, // No task details are being edited initially
  };
  


export const tasksReducer = (state:State,action:Action)=>{
    switch(action.type){
        case "ADD_TASK":

            const newTask: Task = {
            id: Date.now(),
             title:action.payload.title,
             description:action.payload.description,
             status: action.payload.status || "To-Do"
            };
    
            return  {tasks: [...state.tasks, newTask ]};

        case "START_EDITING":
                return {
                  ...state,
                  editingTaskId: action.payload.id,
                  editingTask: {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    status: action.payload.status ,
                  },
                };
              
        case "SAVE_TASK":
            const updatedTasks = state.tasks.map((task) =>
                task.id === state.editingTaskId
                  ? { ...task, ...action.payload } // Update the task with the new values
                  : task
              );
              return { ...state, tasks: updatedTasks, editingTaskId: null, editingTask: null };
        case "CANCEL_EDIT":
                return {
                  ...state,
                  editingTaskId: null,
                  editingTask: null,
                };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
            };
            

          default:
            return state;

      };

    }
