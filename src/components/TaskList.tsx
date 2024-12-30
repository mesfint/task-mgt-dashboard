import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box, Card, CardContent, Grid2, IconButton, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import CustomeTypography from "../CustomeTypography";
import { useTask } from '../hooks/useTasks';




const other = {
    pageSize:5,
    rowsPerPageOptions:[5],
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = () => {
  const{state,dispatch} = useTask()
  const[gridView, setGridView] = React.useState(false)

  const toggleView=()=>{
    setGridView((prev)=>!prev)
  }
    if(!state.tasks.length){
      
      <CustomeTypography 
                   
      fontSize={{lg:24,md:20,sm:16,xs:14}} 
      sx={{color:"#734950"}}>
       No Tasks found.
        </CustomeTypography>
    }
  
    return (
  <>

        <Box sx={{display:"flex", justifyContent:"center" ,alignItemste:"center", mb:2}}>
        <IconButton onClick={toggleView}>
          {gridView ? <FormatListBulletedIcon /> : <GridViewIcon />}
        </IconButton>
        </Box>
      
     {!gridView && (  
      <Grid2 item xs={12} sm={6} md={4} lg={3}> 
        <Box
        sx={{
          display:"flex",
          justifyContent:"center",
           flexDirection:"column",
           height:"100%",
           width: "100%", // Full width on small screens
           maxWidth: { lg: "100%", md: "80%", sm: "100%", xs: "100%" }, // Adjust width
           mt: { xs: 1, sm: 0 }, // Margin-top for spacing on smaller screens
           fontSize: { lg: "20px", md: "16px", sm: "14px", xs: "10px" }, // Responsive font size
             
            }}
      style={{
       
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        padding:"15px",
        width:"100%"
      }}
    >
      <DataGrid
      
       sx={{
         width: "100%", }}
        columns={[
          { field: 'id', headerName: "ID", width: 90, hideable: false },
          { field: 'title', headerName: "Title", width: 100,sortable: false,filterable: false,hideable: false,},
          { field: 'description', headerName: "Description", width: 100, hideable: false },
          { field: 'status', headerName: "Status", width: 100,sortable: true,filterable: true,hideable: false },
          { 
            field: 'edit', 
            headerName: "Edit",
             width: 120,
             sortable: false,
             renderCell:(params)=>
             <EditOutlinedIcon
             onClick={() =>
              dispatch({ 
                type: "START_EDITING",
                payload: {
                  id: Number(params.row.id),
                  title: params.row.title,
                  description: params.row.description,
                  status: params.row.status || 'To-Do'
                }
              })
             }
              sx={{color:"blue",cursor:"pointer"}}/>,
          },
          { field: 'delete', headerName: "Delete", width: 120,sortable: false,renderCell:(params)=><DeleteForeverOutlinedIcon  onClick={() => dispatch({type:"DELETE_TASK",payload:{id:Number(params.row.id)}})} sx={{color:"red",cursor:"pointer"}}/> },
        ]}
        //rows={tasks}
         rows={state.tasks.map((task) => ({
          ...task,
          id: task.id ? task.id : Math.random(), // Fallback to index if id is missing
          title: task.title,
          description: task.description,
          status: task.status,
        }))}
        
      />
    </Box>
    </Grid2>
    )}
     {gridView && (
        <Grid2
        container
        spacing={2}
          sx={{
            padding:"15px",
            justifyContent: "center",
          }}
        >
          {state.tasks.map((task) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={task.id}>

            <Card  sx={{  padding: 2 }}>
              <CardContent>
              <CustomeTypography 
                   
                  fontSize={{lg:24,md:20,sm:16,xs:14}} 
                  sx={{color:"#734950"}}>
                    {task.title}
                    </CustomeTypography>
                <Typography variant="body2" color="textSecondary">
                  {task.description}
                </Typography>
                <CustomeTypography 
                   
                fontSize={{lg:24,md:20,sm:16,xs:14}} 
                sx={{color:"textSecondary"}}>
                Status: {task.status}
                  </CustomeTypography>
              
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    mt: 2,
                  }}
                >
                  <IconButton
                    onClick={() =>
                      dispatch({
                        type: "START_EDITING",
                        payload: {
                          id: task.id,
                          title: task.title,
                          description: task.description,
                          status: task.status,
                        },
                      })
                    }
                  >
                    <EditOutlinedIcon sx={{ color: "blue" }} />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      dispatch({ type: "DELETE_TASK", payload: { id: task.id } })
                    }
                  >
                    <DeleteForeverOutlinedIcon sx={{ color: "red" }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
};
export default TaskList