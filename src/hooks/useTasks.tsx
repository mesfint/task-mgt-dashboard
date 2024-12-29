import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export const useTask=()=>{
    const context = useContext(TasksContext);
if(!context){
    throw new Error( "No contexts found")
}
return context;


}