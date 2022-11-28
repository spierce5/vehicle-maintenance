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
  Checkbox,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DescriptionIcon from "@mui/icons-material/Description";
import AppNavbar from "./AppNavbar";
import TaskGrid from "./TaskGrid";
import { Link } from "react-router-dom";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      selectionList: [],
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
    this.updateSelectionList = this.updateSelectionList.bind(this);
  }

  componentDidMount() {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }));
  }

  async remove(list) {
    await fetch(`/api/tasks/delete-tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    this.props.history.push("/tasks");
    this.setState({ tasks: this.state.tasks.filter(task => !list.includes(task)) })
  }

  updateSelectionList(list) {
    const taskList = list.map(id => this.state.tasks.find(task => task.taskId === id))
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
      currentTask: null,
      detailType: null,
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

  handleDelete(task) {
    const newState = { ...this.state };
    //newState["currentTask"] = task;
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

    return (
      <div>
        <AppNavbar />
        <Container fluid="true" sx={{ marginTop: "5px" }}>
          <Stack direction="column" spacing={2}>
            <h1>Tasks</h1>
            <TaskGrid
              tasks={this.state.tasks}
              density="compact"
              updateSelectionList={this.updateSelectionList}
            />
            <Stack direction="row" spacing={1}>
              <Fab size="medium"
                component={Link}
                to="/tasks/new">
                <AddIcon />
              </Fab>
              <Fab size="medium"
                component={Link}
                to={this.state.selectionList.length > 0 ? "/tasks/" + this.state.selectionList[0].taskId : ''}
                disabled={this.state.selectionList.length != 1}
              >
                <EditIcon />
              </Fab>
              <Fab size="medium"
                onClick={() => this.displayDetails(this.state.selectionList[0], 'INSTRUCTIONS')}
                disabled={this.state.selectionList.length !== 1}
              >
                <DescriptionIcon />
              </Fab>
              <Fab size="medium"
                onClick={this.handleDelete}
                disabled={this.state.selectionList.length < 1}
              >
                <DeleteForeverIcon />
              </Fab>
            </Stack>
          </Stack>
        </Container>
        <Dialog
          open={this.state.deleteDialogOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete these tasks?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deleteDialogOpen ? (
                <div>
                  {
                    this.state.selectionList.map(task => {
                      return (
                        <p>
                          Task: {task.taskId} <br />
                          Description: {task.description} <br />
                          Vehicle: {task.vehicle.vehicleId}<hr />
                        </p>
                      )
                    }
                    )
                  }
                  <p style={{ color: "red" }}>
                    <b>Warning! All schedules for the selected tasks will be deleted.</b>
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
              ? "Task " +
              this.state.selectionList[0].taskId +
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
                </p><hr />
                <h3>
                  Instructions
                </h3>
                <p>
                  {
                    this.state.selectionList.length === 1 ?
                      this.state.selectionList[0].instructions :
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
export default TaskList;
