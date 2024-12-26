import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from 'react';
import { Tasks } from "../types/types";


interface TasksProps{
    tasks:Tasks 
}

const other = {
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = ({tasks}:TasksProps) => {
    const[grid,setGrid] = React.useState(false)

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
          { field: 'id',  hideable: false },
          {
            field: 'title',
            sortable: false,
            filterable: false,
            hideable: false,
          },
          { field: 'description', hideable: false },
          { field: 'status', sortable: true,filterable: true,hideable: false },
        ]}
        rows={tasks}
        {...other}
      />
    </Box>
    </>
  )
}

export default TaskList