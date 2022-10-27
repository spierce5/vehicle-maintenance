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
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DescriptionIcon from "@mui/icons-material/Description";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      deleteDialogOpen: false,
      currentTask: null,
      detailsOpen: false,
      detailType: "NOTES",
    };
    this.remove = this.remove.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
  }

  componentDidMount() {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }));
  }

  async remove(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedTasks = [...this.state.tasks].filter((i) => i.taskId !== id);
      this.setState({ tasks: updatedTasks });
    });
  }

  displayDetails(task, type) {
    this.setState({
      detailsOpen: true,
      currentTask: task,
      detailType: type,
    });
  }

  closeDetails() {
    this.setState({
      detailsOpen: false,
      currentTask: null,
      detailType: null,
    });
  }

  handleDialogClose(choice) {
    if (choice === "DELETE") {
      this.remove(this.state.currentTask.taskId);
    }
    this.setState({
      deleteDialogOpen: false,
    });
  }

  handleDelete(task) {
    const newState = { ...this.state };
    newState["currentTask"] = task;
    newState["deleteDialogOpen"] = true;
    this.setState(newState);
  }

  render() {
    const { tasks, isLoading } = this.state;

    tasks.sort(function (a, b) {
      if (a.dateEntered === b.dateEntered) {
        return 0;
      } else if (a.dateEntered < b.dateEntered) {
        return 1;
      } else {
        return -1;
      }
    });

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const taskList = tasks.map((task) => {
      return (
        <TableRow key={task.taskId}>
          <TableCell style={{ whiteSpace: "nowrap" }}>{task.taskId}</TableCell>
          <TableCell>{task.description}</TableCell>
          <TableCell>{task.type.value}</TableCell>
          <TableCell>
            {task.vehicle.vehicleId + ": " + task.vehicle.description}
          </TableCell>
          <TableCell>{task.dateEntered}</TableCell>
          <TableCell>{task.dateDue}</TableCell>
          <TableCell>
            <IconButton
              onClick={() => this.displayDetails(task, "INSTRUCTIONS")}
            >
              <DescriptionIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton onClick={() => this.displayDetails(task, "NOTES")}>
              <DescriptionIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <ButtonGroup>
              <IconButton
                color="success"
                component={Link}
                to={"/tasks/" + task.taskId}
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => this.handleDelete(task)}>
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
        <Container fluid="true">
          <Stack direction="row">
            <h3>Tasks</h3>
            <IconButton color="success" component={Link} to="/tasks/new">
              <PersonAddAlt1Icon />
            </IconButton>
          </Stack>
          <TableContainer>
            <Table className="mt-4">
              <TableHead>
                <TableRow>
                  <TableCell width="15%">
                    <b>Task ID</b>
                  </TableCell>
                  <TableCell width="20%">
                    <b>Description</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Type</b>
                  </TableCell>
                  <TableCell width="15%">
                    <b>Vehicle</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Date Entered</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Date Due</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Instructions</b>
                  </TableCell>
                  <TableCell width="10%">
                    <b>Notes</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{taskList}</TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Dialog
          open={this.state.deleteDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deleteDialogOpen ? (
                <p>
                  Task: {this.state.currentTask.taskId} <br />
                  Description: {this.state.currentTask.description} <br />
                  Vehicle: {this.state.currentTask.vehicle.vehicleId}
                </p>
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
            {this.state.currentTask
              ? this.state.detailType
                  .toLowerCase()
                  .replace(/(^\w{1})/g, (l) => l.toUpperCase()) +
                " for task " +
                this.state.currentTask.taskId +
                " - " +
                this.state.currentTask.description
              : ""}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom sx={{ whiteSpace: "pre-wrap" }}>
              <p>
                {this.state.currentTask
                  ? this.state.currentTask[this.state.detailType.toLowerCase()]
                  : ""}
              </p>
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
export default TaskList;
