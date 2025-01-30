import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTask } from '../../hooks/useTasks';




// ... imports remain the same ...

const AddTaskForm = () => {
  const { state, dispatch, validateForm } = useTask();
  const { editingTask, editingTaskId } = state;
  
  const [task, setTask] = useState({
      title: '',
      description: '',
      status: 'To-Do'
  });

  const [errors, setErrors] = useState({
      title: '',
      description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = editingTaskId !== null;

  useEffect(() => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTask(prev => ({
          ...prev,
          [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name as keyof typeof errors]) {
          setErrors(prev => ({
              ...prev,
              [name]: ''
          }));
      }
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
      setTask(prev => ({
          ...prev,
          status: e.target.value
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);  // Set loading state immediately
      
      const { isValid, errors: validationErrors } = validateForm(task.title, task.description);
      setErrors(validationErrors);

      if (isValid) {
          try {
              if (isEditing) {
                  dispatch({
                      type: "SAVE_TASK",
                      payload: {
                          id: editingTaskId,
                          title: task.title,
                          description: task.description,
                          status: task.status
                      }
                  });
                  dispatch({ type: "CANCEL_EDIT" });
              } else {
                  dispatch({
                      type: "ADD_TASK",
                      payload: {
                          title: task.title,
                          description: task.description,
                          status: task.status
                      }
                  });
              }

              setTask({
                  title: '',
                  description: '',
                  status: 'To-Do'
              });
          } finally {
        // Add a small delay before enabling the button
            setTimeout(() => {
                setIsSubmitting(false);
            }, 100);          }
      } else {
          setIsSubmitting(false);
      }
  };

  const buttonStyles = {
      padding: "14px",
      width: "100%",
      maxWidth: { lg: "48%", md: "48%", sm: "48%", xs: "100%" },
      fontSize: { lg: "20px", md: "18px", sm: "16px", xs: "14px" },
      transition: "width 0.3s ease",
  };

  return (
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:20}}>
          <form onSubmit={handleSubmit} role="form">
              <TextField
                  error={!!errors.title}
                  helperText={errors.title}
                  variant="outlined"
                  label="Title"
                  value={task.title}
                  onChange={handleInputChange}
                  name='title'
                  fullWidth
                  sx={{
                      mb: 2,
                      mr: 2,
                      maxWidth: { lg: "48%", md: "100%", sm: "100%", xs: "100%" },
                  }}
              />
              
              <TextField
                  error={!!errors.description}
                  helperText={errors.description}
                  variant="outlined"
                  label="Description"
                  onChange={handleInputChange}
                  value={task.description}
                  name='description'
                  fullWidth
                  sx={{
                      mb: 2,
                      maxWidth: { lg: "48%", md: "100%", sm: "100%", xs: "100%" },
                  }}
              />

              <Select
                  name="status"
                  displayEmpty
                  variant="outlined"
                  sx={{
                      width: "100%",
                      maxWidth: { lg: "48%", md: "48%", sm: "100%", xs: "100%" },
                      mt: { xs: 1, sm: 0 },
                      mb: 2,
                      fontSize: { lg: "20px", md: "18px", sm: "16px", xs: "14px" },
                  }}
                  value={task.status}
                  onChange={handleStatusChange}
              >
                  <MenuItem value="To-Do">To-Do</MenuItem>
                  <MenuItem value="In Progress">In-Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
              </Select>

              <Button 
                  type="submit"
                  role="button"
                  variant="contained"
                  disabled={isSubmitting}
                  endIcon={isEditing ? <EditIcon /> : <AddCircleOutlinedIcon />}
                  sx={buttonStyles}
                  data-testid="submit-button"  // Add test ID for easier selection

              >
                  {isEditing ? "Save" : "Add Task"}
              </Button>

              {isEditing && (
                  <Button 
                      variant="outlined"
                      onClick={() => dispatch({type: "CANCEL_EDIT"})}
                      disabled={isSubmitting}
                      sx={{
                          ...buttonStyles,
                          ml: { md: 2 },
                          mt: { xs: 1, sm: 0 }
                      }}
                  >
                      Cancel
                  </Button>
              )}
          </form>
      </Box>
  );
};

export default AddTaskForm;