import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from 'react';
import { Task } from "../types/types";


interface TasksProps{
    tasks:Task[] 
}

const other = {
    pageSize:5,
    rowsPerPageOptions:[5],
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = ({tasks}:TasksProps) => {
    const[grid,setGrid] = React.useState(false)
    const [data,setData]  = React.useState<Task[]>(tasks || [])
    console.log("Received tasks prop-List:", tasks); 
    console.log("data",data)

    React.useEffect(() => {
      if (Array.isArray(tasks)) {
        setData(tasks);
      } else {
        console.error("Tasks prop is not an array:", tasks);
        setData([])
      }
    }, [tasks]);
    

const shoGridView=()=>{
    setGrid((prev)=>!prev)


}    
  return (
    <>
        <Box sx={{ display:"flex", justifyContent:"center",alignItems:"center"}}>
            <IconButton onClick={shoGridView}>
                <FormatListBulletedIcon sx={{ml:12}} />
                </IconButton>
                <IconButton>
                <GridViewIcon  />
            </IconButton>

        </Box>
       
        <Box
        sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
      style={{
       
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        padding:"15px",
      }}
    >
      <DataGrid
        columns={[
          { field: 'id', headerName: "ID", width: 90, hideable: false },
          { field: 'title', headerName: "Title", width: 150,sortable: false,filterable: false,hideable: false,},
          { field: 'description', headerName: "Description", width: 300, hideable: false },
          { field: 'status', headerName: "Status", width: 150,sortable: true,filterable: true,hideable: false },
        ]}
        rows={data}
        {...other}
      />
    </Box>
    </>
  )
}

export default TaskList