import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useTask } from '../hooks/useTasks';




const AddTaskForm = () => {
  const{state, dispatch} = useTask()
  const { editingTask, editingTaskId} = state

    // Local state for form fields, used when not editing
    const [task, setTask] = React.useState({
      title: "",
      description: "",
      status: "To-Do",
    });
     // Determine if we are editing or adding
  const isEditing = editingTaskId !== null;

  // Sync editing task with the form fields
  React.useEffect(() => {
    if (isEditing && editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    } else {
      setTask({ title: "", description: "", status: "To-Do" });
    }
  }, [isEditing, editingTask]);

  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTask((prev)=>({ ...prev, [name]: value }));
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTask((prev) => ({ ...prev, status: event.target.value as string }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isEditing) {
      // Dispatch save task action
      dispatch({ 
        type:"SAVE_TASK",
         payload:{
           id:editingTaskId,
            title:task.title, 
            description:task.description, 
            status:task.status,
          },
        });
    } else {
      //dispatch add task action
      dispatch({
        type:"ADD_TASK",
        payload:{
         title: task.title, 
         description:task.description,
         status: task.status,
        },
      
      });
    }
    //reset form after submission
    dispatch({ type: "CANCEL_EDIT"});

  

  }

  
    return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
        <form onSubmit={handleSubmit}>
        <TextField
        error={task.title.length === 0}
        variant="outlined"
        label="Title"
        value={task.title}
        onChange={handleInputChange}
        name='title'
        //sx={{mr:2}}
        fullWidth // Makes it responsive
        sx={{
          mb: 2, // Margin-bottom for spacing
          mr:2,
          maxWidth: { lg: "48%", md: "100%", sm: "100%", xs: "100%" }, // Adjust max width
        }}
          
        
        >

        </TextField>
        <TextField
         error={task.description.length === 0}//validation
        variant="outlined"
        label="Description"
        onChange={handleInputChange}
        value={task.description}
        name='description'
        fullWidth // Makes it responsive
        sx={{
          mb: 2, // Margin-bottom for spacing
          maxWidth: { lg: "48%", md: "100%", sm: "100%", xs: "100%" }, // Adjust max width
        }}

        
        >

        </TextField>
        <Select
           name="status"
           displayEmpty
           variant="outlined"
           sx={{
        
            width: "100%", // Full width on small screens
            maxWidth: { lg: "48%", md: "48%", sm: "48%", xs: "48%" }, // Adjust width
            mt: { xs: 1, sm: 0 }, // Margin-top for spacing on smaller screens
            mr:"6px",
            fontSize: { lg: "20px", md: "18px", sm: "16px", xs: "14px" }, // Responsive font size
          }}
          value={task.status}
          onChange={handleStatusChange}
        >
          <MenuItem value="To-Do">To-Do</MenuItem>
          <MenuItem value="In Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>

        <Button endIcon={ isEditing ? <EditIcon /> : <AddCircleOutlinedIcon />} 
        type="submit"
         variant="contained"
         sx={{
          width: "100%", // Full width on small screens
          padding:"14px",
          ml:"6px",
          
          maxWidth: { lg: "48%", md: "48%", sm: "48%", xs: "48%" }, // Adjust width
          mt: { xs: 1, sm: 0 }, // Margin-top for spacing on smaller screens
          fontSize: { lg: "20px", md: "18px", sm: "16px", xs: "14px" }, // Responsive font size
        }}
          
          >
        {isEditing ? "Save" : "Add Task"}

        </Button>
        {isEditing && (
          <Button variant="outlined" onClick={()=>dispatch({type:"CANCEL_EDIT"})} sx={{ padding: 2, ml: 1 }}>
            Cancel
          </Button>
        )}
        </form>


    </Box>
  )
}

export default AddTaskForm