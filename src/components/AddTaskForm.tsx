import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Task } from "../types/types"



const AddTaskForm = () => {
    const[formData, setFormData]= useState<Task>({
        id:0,
        title:"",
        description:"",
        status:'In Progress'

    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
           const newTask: Task = {
            id: Date.now(),
             title: formData.title,
             description: formData.description,
             status: formData.status
            }
          
            // Update state with the new task
            setFormData((prevState) => ({
                ...prevState,
                newTask
            }));
                // Make an API request or perform any necessary actions with the form data
        console.log(formData);
    
        // Reset the form fields
        setFormData({ id:0,title: '', description: '', status:'In Progress' });
      };

  
   
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form onSubmit={handleSubmit}>
        <TextField
        variant="outlined"
        label="title"
        value={formData.title}
        onChange={handleInputChange}
        name='title'
        
        >

        </TextField>
        <TextField
        variant="outlined"
        label="description"
        onChange={handleInputChange}
        value={formData.description}
        name='description'
        
        >

        </TextField>

        <Button type="submit" variant="contained" sx={{padding:2, ml:3}}>Add Task</Button>
        </form>


    </Box>
  )
}

export default AddTaskForm