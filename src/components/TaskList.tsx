import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTask } from '../hooks/useTasks';




const other = {
    pageSize:5,
    rowsPerPageOptions:[5],
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = () => {
  const{tasks,startEditing,deleteTask} = useTask()
    
  
    return (
    <>
       
       
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
          { 
            field: 'edit', 
            headerName: "Edit",
             width: 120,
             sortable: false,
             renderCell:(params)=>
             <EditOutlinedIcon
             onClick={() =>
              startEditing(
                Number(params.row.id),
                params.row.title,
                params.row.description,
                params.row.status || 'To-Do'
              )
            }
              
              sx={{color:"blue",cursor:"pointer"}}/> },
          { field: 'delete', headerName: "Delete", width: 120,sortable: false,renderCell:(params)=><DeleteForeverOutlinedIcon  onClick={() => deleteTask(Number(params.row.id))} sx={{color:"red",cursor:"pointer"}}/> },
        ]}
        //rows={tasks}
         rows={tasks.map((task, index) => ({
          ...task,
          id: task.id ? task.id.toString() : index.toString(), // Fallback to index if id is missing
          title: task.title,
          description: task.description,
          status: task.status,
        }))}
      />
    </Box>
    </>
  )
}

export default TaskList