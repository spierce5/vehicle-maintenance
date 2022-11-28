import React, { Component } from "react";
import {
  Stack,
  ButtonGroup,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DescriptionIcon from "@mui/icons-material/Description";
import AppNavbar from "./AppNavbar";
import VehicleGrid from "./VehicleGrid";
import { Link } from "react-router-dom";

class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      selectionList: [],
      deleteDialogOpen: false,
      currentVehicle: null,
      detailsOpen: false,
    };
    this.remove = this.remove.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.updateSelectionList = this.updateSelectionList.bind(this);
  }

  componentDidMount() {
    fetch("/api/vehicles")
      .then((response) => response.json())
      .then((data) => this.setState({ vehicles: data }));
  }

  async remove(list) {
    await fetch(`/api/vehicles/delete-vehicles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    this.props.history.push("/vehicles");
    this.setState({ vehicles: this.state.vehicles.filter(vehicle => !list.includes(vehicle)) })
  }

  updateSelectionList(list) {
    const taskList = list.map(id => this.state.vehicles.find(vehicle => vehicle.vehicleId === id))
    this.setState({ selectionList: taskList });
  }

  displayDetails() {
    this.setState({
      detailsOpen: true,
    });
  }

  closeDetails() {
    this.setState({
      detailsOpen: false,
      currentVehicle: null,
    });
  }

  handleDialogClose(choice) {
    if (choice === "DELETE") {
      this.remove(this.state.selectionList);
    }
    this.setState({
      deleteDialogOpen: false,
    });
  }

  handleDelete(vehicle) {
    this.setState({
      currentVehicle: vehicle,
      deleteDialogOpen: true,
    });
  }

  render() {
    const { vehicles, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const vehicleList = vehicles.map((vehicle) => {
      return (
        <TableRow key={vehicle.vehicleId}>
          <TableCell style={{ whiteSpace: "nowrap" }}>
            {vehicle.vehicleId}
          </TableCell>
          <TableCell>{vehicle.description}</TableCell>
          <TableCell>{vehicle.year}</TableCell>
          <TableCell>{vehicle.make}</TableCell>
          <TableCell>{vehicle.model}</TableCell>
          <TableCell>
            <IconButton onClick={() => this.displayNotes(vehicle)}>
              <DescriptionIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <ButtonGroup>
              <IconButton
                color="success"
                component={Link}
                to={"/vehicles/" + vehicle.vehicleId}
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => this.handleDelete(vehicle)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ButtonGroup>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid="true" sx={{ marginTop: "5px" }}>
          <Stack direction="column" spacing={2}>
            <h1>Vehicles</h1>
            <VehicleGrid
              vehicles={this.state.vehicles}
              density="compact"
              updateSelectionList={this.updateSelectionList}
            />
            <Stack direction="row" spacing={1}>
              <Tooltip title="Add">
                <Fab size="medium"
                  component={Link}
                  to="/vehicles/new">
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length === 1 ? "Edit" : this.state.selectionList.length < 1 ? "You must select a vehicle to edit." : "You can only edit one vehicle at a time."}>
                <span>
                  <Fab size="medium"
                    component={Link}
                    to={this.state.selectionList.length > 0 ? "/vehicles/" + this.state.selectionList[0].vehicleId : ''}
                    disabled={this.state.selectionList.length !== 1}
                  >
                    <EditIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length === 1 ? "Notes" : this.state.selectionList.length < 1 ? "You must select a vehicle to display notes." : "You can only display notes for one vehicle at a time."}>
                <span>
                  <Fab size="medium"
                    onClick={() => this.displayDetails(this.state.selectionList[0], 'INSTRUCTIONS')}
                    disabled={this.state.selectionList.length !== 1}
                  >
                    <DescriptionIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length < 1 ? "You must select a vehicle to delete." : "Delete"}>
                <span>
                  <Fab size="medium"
                    onClick={this.handleDelete}
                    disabled={this.state.selectionList.length < 1}
                  >
                    <DeleteForeverIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Stack>
            {/* <TableContainer>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableCell width="15%">
                    <b>Vehicle ID</b>
                  </TableCell>
                  <TableCell width="30%">
                    <b>Description</b>
                  </TableCell>
                  <TableCell width="15%">
                    <b>Year</b>
                  </TableCell>
                  <TableCell width="15%">
                    <b>Make</b>
                  </TableCell>
                  <TableCell width="15%">
                    <b>Model</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Notes</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{vehicleList}</TableBody>
            </Table>
          </TableContainer> */}
          </Stack>
        </Container>
        <Dialog
          open={this.state.deleteDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete these vehicles?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deleteDialogOpen ? (
                <div>
                  {
                    this.state.selectionList.map(vehicle => {
                      return (
                        <p>
                          Vehicle: {vehicle.description} <br />
                          Year: {vehicle.year} <br />
                          Make: {vehicle.make} <br />
                          Model: {vehicle.model} <hr />
                        </p>
                      )
                    }
                    )
                  }
                  <p style={{ color: "red" }}>
                    <b>
                      Warning! All tasks and schedules for these vehicles will be
                      deleted.
                    </b>
                  </p>
                </div>
              ) : (
                ""
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose("CANCEL")}>
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogClose("DELETE")} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={this.closeDetails}
          open={this.state.detailsOpen}
          aria-labelledby="notes-dialog-title"
          maxWidth="sm"
          fullWidth={true}
        >
          <DialogTitle id="notes-dialog-title">
            {this.state.selectionList.length === 1
              ? "Vehicle " +
              this.state.selectionList[0].vehicleId +
              " - " +
              this.state.selectionList[0].description
              : ""}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom sx={{ whiteSpace: "pre-wrap" }}>
              <div>
                <h3>
                  Notes
                </h3><br />
                <p>
                  {
                    this.state.selectionList.length === 1 ?
                      this.state.selectionList[0].notes :
                      ''
                  }
                </p>
              </div>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.closeDetails}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default VehicleList;
