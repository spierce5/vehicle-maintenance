import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "schedId",
    headerName: "Schedule ID",
    flex: 0.5,
    editable: false,
  },
  {
    field: "task",
    headerName: "Task",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    flex: 1,
  },
  {
    field: "frequency",
    headerName: "Frequency",
    flex: 0.5,
    sortable: false,
    editable: false,
  },
  {
    field: "timeUnit",
    headerName: "Time Units",
    flex: 0.5,
    editable: false,
  },
  {
    field: "active",
    headerName: "Active",
    description: "This column has a value getter and is not sortable.",
    flex: 0.5,
  }
];

const getRows = (schedules) => {
  let result = schedules.map((schedule) => {
    return {
      id: schedule.schedId,
      schedId: schedule.schedId,
      frequency: schedule.frequency,
      timeUnit: schedule.timeUnit.value,
      active: schedule.active,
      task: schedule.task.description
    };
  });
  return result;
};

export default function ScheduleGrid({ schedules, updateSelectionList }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={getRows(schedules)}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => updateSelectionList(ids)}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
