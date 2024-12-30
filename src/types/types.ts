
export interface Task{
    id:number,
    title:string,
    description:string,
    status: string
}

export interface TaskContextType{
    addTask:(title:string,description:string,status:string)=>void
    tasks:Task[],
    startEditing:(id: number, title: string,description:string,status:string)=>void;
    saveTask:(title: string, description: string, status: string)=>void;
    cancelEdit:()=>void;
    deleteTask:(id:number)=>void;
    isEditing: boolean;
    editingTask: Task | null;
}

export type Action =
  | { type: "ADD_TASK"; payload: { title: string; description: string; status: string } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "START_EDITING"; payload: { id: number; title: string; description: string; status: string } }
  | { type: "SAVE_TASK"; payload: { id: number; title: string; description: string; status: string } }
  | { type: "CANCEL_EDIT" }
  
export interface State {
    editingTaskId: number | null;
    tasks: Task[],
    editingTask: Task | null;
}


