import { Box, Button, TextField } from "@mui/material"


const AddTaskForm = () => {
  
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form>
        <TextField
        variant="outlined"
        label="task"
        
        >

        </TextField>

        </form>
        <Button variant="contained" sx={{padding:2, ml:3}}>Add Task</Button>


    </Box>
  )
}

export default AddTaskForm