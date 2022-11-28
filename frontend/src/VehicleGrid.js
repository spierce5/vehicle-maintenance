import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "vehicleId",
    headerName: "Vehicle ID",
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
    field: "make",
    headerName: "Make",
    flex: 0.5,
    editable: false,
  },
  {
    field: "model",
    headerName: "Model",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 0.5,
  },
  {
    field: "year",
    headerName: "Year",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 0.5,
  }
];

const getRows = (vehicles) => {
  let result = vehicles.map((vehicle) => {
    return {
      id: vehicle.vehicleId,
      vehicleId: vehicle.vehicleId,
      description: vehicle.description,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
    };
  });
  return result;
};

export default function TaskGrid({ vehicles, updateSelectionList }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={getRows(vehicles)}
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
