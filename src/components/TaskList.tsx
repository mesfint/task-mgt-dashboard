import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTask } from '../hooks/useTasks';

// Define your initial data
// const initialTasks: Task[] = [
//   {
//     id: 1,
//     title: "Complete React Context Integration",
//     description: "Implement Context API with useReducer for state management.",
//     status: "To-Do",
//   },
//   {
//     id: 2,
//     title: "Setup Unit Tests",
//     description: "Write tests for components using Jest and React Testing Library.",
//     status: "In Progress",
//   },
// ];


const other = {
    pageSize:5,
    rowsPerPageOptions:[5],
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = () => {
  const{state,dispatch} = useTask()
    
  
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
         rows={state.tasks.map((task, index) => ({
          ...task,
          id: task.id ? task.id : index, // Fallback to index if id is missing
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