
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