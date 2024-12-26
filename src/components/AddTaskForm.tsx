import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, FormEvent } from "react"

interface AddTaskProps{
  onAddTask:(e:FormEvent<HTMLFormElement>)=>void 
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void
  formData:{title:string,description:string}
}


const AddTaskForm = ({onAddTask,onChange,formData}:AddTaskProps) => {

  
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form onSubmit={onAddTask}>
        <TextField
        variant="outlined"
        label="title"
        value={formData.title}
        onChange={onChange}
        name='title'
        
        >

        </TextField>
        <TextField
        variant="outlined"
        label="description"
        onChange={onChange}
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