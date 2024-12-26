import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Task } from "../types/types";


interface TasksProps{
    tasks:Task[] ,
    onDelete:(id:number)=>void
}

const other = {
    pageSize:5,
    rowsPerPageOptions:[5],
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    checkboxSelection:true,
    
  };

const TaskList = ({tasks,onDelete}:TasksProps) => {
    //const[grid,setGrid] = React.useState(false)
    //const [data,setData]  = React.useState<Task[]>(tasks || [])


    if (!Array.isArray(tasks)) {
      console.error("Tasks prop is not an array:", tasks);
      return null; // Avoid rendering invalid tasks
    }
    

    // React.useEffect(() => {
    //   if (Array.isArray(tasks)) {
    //     setData(tasks);
    //   } else {
    //     //console.error("Tasks prop is not an array:", tasks);
    //     setData([])
    //   }
    // }, [tasks]);
    

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
          { field: 'edit', headerName: "Edit", width: 120,sortable: false,renderCell:()=><EditOutlinedIcon sx={{color:"blue",cursor:"pointer"}}/> },
          { field: 'delete', headerName: "Delete", width: 120,sortable: false,renderCell:(params)=><DeleteForeverOutlinedIcon  onClick={() => onDelete(Number(params.row.id))} sx={{color:"red",cursor:"pointer"}}/> },
        ]}
        rows={tasks.map((task, index) => ({
          ...task,
          id: task.id ? task.id.toString() : index.toString(), // Fallback to index if id is missing
        }))}
      />
    </Box>
    </>
  )
}

export default TaskList