import React, { Component } from "react";
import {
  Stack,
  Container,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
      statusSelection: 'active'
    };
    this.remove = this.remove.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.closeDetails = this.closeDetails.bind(this);
    this.updateSelectionList = this.updateSelectionList.bind(this);
    this.updateStatusSelection = this.updateStatusSelection.bind(this);
  }

  componentDidMount() {
    this.fetchTasks()
    // fetch("/api/tasks")
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ tasks: data }));
  }

  fetchTasks() {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        switch (this.state.statusSelection) {
          case 'active':
            data = data.filter(task => !task.complete)
            break;
          case 'complete':
            data = data.filter(task => task.complete)
            break;
          default:
            data = data.filter(task => !task.complete)
        }

        this.setState({ tasks: data })
      });
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

  updateStatusSelection(event) {
    this.setState({ statusSelection: event.target.value })
    this.fetchTasks()
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
            <FormControl variant="standard" sx={{ m: 1, maxWidth: "20%" }}>
              <Select
                id="complete-select"
                value={this.state.statusSelection}
                onChange={(e) => this.updateStatusSelection(e)}
              >
                <MenuItem value="active">Active Tasks</MenuItem>
                <MenuItem value="complete">Completed Tasks</MenuItem>
              </Select>
            </FormControl>
            <TaskGrid
              tasks={this.state.tasks}
              density="compact"
              updateSelectionList={this.updateSelectionList}
            />
            <Stack direction="row" spacing={1}>
              <Tooltip title="Add">
                <Fab size="medium"
                  component={Link}
                  to="/tasks/new">
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length === 1 ? "Edit" : this.state.selectionList.length < 1 ? "You must select a task to edit." : "You can only edit one task at a time."}>
                <span>
                  <Fab size="medium"
                    component={Link}
                    to={this.state.selectionList.length > 0 ? "/tasks/" + this.state.selectionList[0].taskId : ''}
                    disabled={this.state.selectionList.length != 1}
                  >
                    <EditIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length === 1 ? "Details" : this.state.selectionList.length < 1 ? "You must select a task to display details." : "You can only display details for one vehicle at a time."}>
                <span>
                  <Fab size="medium"
                    onClick={() => this.displayDetails(this.state.selectionList[0], 'INSTRUCTIONS')}
                    disabled={this.state.selectionList.length !== 1}
                  >
                    <DescriptionIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length < 1 ? "You must select at least one task to delete." : "Delete"}>
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
