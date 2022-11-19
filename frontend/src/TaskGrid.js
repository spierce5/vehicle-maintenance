import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "taskId",
    headerName: "Task ID",
    flex: 0.5,
    editable: false,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1.5,
    editable: false,
  },
  {
    field: "type",
    headerName: "Type",
    type: "number",
    flex: 1,
    editable: false,
  },
  {
    field: "vehicle",
    headerName: "Vehicle",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
  },
  {
    field: "dateEntered",
    headerName: "Date Entered",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
  },
  {
    field: "dateDue",
    headerName: "Date Due",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
  },
  {
    field: "instructions",
    headerName: "Instructions",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 0.5,
  },
  {
    field: "notes",
    headerName: "Notes",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 0.5,
  },
];

// TODO:: Remove Instructions, notes and add buttons

const getRows = (tasks) => {
  let result = tasks.map((task) => {
    return {
      id: task.taskId,
      taskId: task.taskId,
      description: task.description,
      type: task.type.value,
      vehicle: task.vehicle.description,
      dateEntered: task.dateEntered,
      dateDue: task.dateDue,
      instructions: task.instructions,
      notes: task.notes,
    };
  });
  return result;
};

// const taskList = tasks.map((task) => {
//     return (
//       <TableRow key={task.taskId}>
//         <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
//           <Checkbox></Checkbox>
//           <a href={"/tasks/" + task.taskId}>{task.taskId}</a>
//         </TableCell>
//         <TableCell>{task.description}</TableCell>
//         <TableCell>{task.type.value}</TableCell>
//         <TableCell>
//           {task.vehicle.vehicleId + ": " + task.vehicle.description}
//         </TableCell>
//         <TableCell>{task.dateEntered}</TableCell>
//         <TableCell>{task.dateDue}</TableCell>
//         <TableCell>
//           <IconButton
//             onClick={() => this.displayDetails(task, "INSTRUCTIONS")}
//           >
//             <DescriptionIcon />
//           </IconButton>
//         </TableCell>
//         <TableCell>
//           <IconButton onClick={() => this.displayDetails(task, "NOTES")}>
//             <DescriptionIcon />
//           </IconButton>
//         </TableCell>
//         <TableCell>
//           <ButtonGroup>
//             <IconButton
//               color="success"
//               component={Link}
//               to={"/tasks/" + task.taskId}
//             >
//               <ModeEditIcon />
//             </IconButton>
//             <IconButton color="error" onClick={() => this.handleDelete(task)}>
//               <DeleteForeverIcon />
//             </IconButton>
//           </ButtonGroup>
//         </TableCell>
//       </TableRow>
//     );
//   });

export default function TaskGrid({ tasks }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={getRows(tasks)}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
