import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useTask } from '../hooks/useTasks';




const AddTaskForm = () => {
  const{addTask,cancelEdit,saveTask,isEditing,editingTask} = useTask()
  const [task, setTask] = React.useState(editingTask || { title: "", description: "", status: "" });

 // Sync `editingTask` with the local form state
 React.useEffect(() => {
  if (isEditing && editingTask) {
    setTask(editingTask);
  }
}, [editingTask, isEditing]);
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isEditing) {
      saveTask(task.title, task.description, task.status);
    } else {
      addTask(task.title, task.description, task.status);
    }
    setTask({ title: "", description: "", status: "" });

  

  }

  
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form onSubmit={handleSubmit}>
        <TextField
        error={task.title.length === 0}
        variant="outlined"
        label="title"
        value={task.title}
        onChange={handleInputChange}
        name='title'
        sx={{mr:2}}
        
        >

        </TextField>
        <TextField
         error={task.description.length === 0}//validation
        variant="outlined"
        label="description"
        onChange={handleInputChange}
        value={task.description}
        name='description'
        sx={{ml:2}}

        
        >

        </TextField>
        <Select
           name="status"
           displayEmpty
           variant="outlined"
           sx={{ mr: 2,ml:2 ,pl:1}}
          value={task.status}
          onChange={handleInputChange}
        >
          <MenuItem value="To-Do">To-Do</MenuItem>
          <MenuItem value="In Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>

        <Button endIcon={ isEditing ? <EditIcon /> : <AddCircleOutlinedIcon />} type="submit" variant="contained" sx={{padding:2, ml:3}}>
        {isEditing ? "Save" : "Add Task"}

        </Button>
        {isEditing && (
          <Button variant="outlined" onClick={cancelEdit} sx={{ padding: 2, ml: 1 }}>
            Cancel
          </Button>
        )}
        </form>


    </Box>
  )
}

export default AddTaskForm