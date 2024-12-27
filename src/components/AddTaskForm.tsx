import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { FormEvent } from "react";

interface AddTaskProps{
  onAddTask:(e:FormEvent<HTMLFormElement>)=>void 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
  formData:{title:string,description:string,status:string}
  isEditing:boolean,
  onCancle:()=>void
  onSave:()=>void,  
}


const AddTaskForm = ({onAddTask,onChange,formData,isEditing,onCancle,onSave}:AddTaskProps) => {

  
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form onSubmit={onAddTask}>
        <TextField
        variant="outlined"
        label="title"
        value={formData.title}
        onChange={onChange}
        name='title'
        sx={{mr:2}}
        
        >

        </TextField>
        <TextField
        variant="outlined"
        label="description"
        onChange={onChange}
        value={formData.description}
        name='description'
        sx={{ml:2}}
        
        >

        </TextField>
        <Select
           name="status"
           displayEmpty
           variant="outlined"
           sx={{ mr: 2,ml:2 ,pl:1}}
          value={formData.status}
          onChange={onChange}
        >
          <MenuItem value="to-to">To-Do</MenuItem>
          <MenuItem value="In Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>

        <Button endIcon={ isEditing ? <EditIcon /> : <AddCircleOutlinedIcon />} type="submit" variant="contained" sx={{padding:2, ml:3}}>
        {isEditing ? "Save" : "Add Task"}

        </Button>
        {isEditing && (
          <Button variant="outlined" onClick={onCancle} sx={{ padding: 2, ml: 1 }}>
            Cancel
          </Button>
        )}
        </form>


    </Box>
  )
}

export default AddTaskForm