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
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
    // await fetch(`/api/tasks/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // }).then(() => {
    //   let updatedTasks = [...this.state.tasks].filter((i) => i.taskId !== id);
    //   this.setState({ tasks: updatedTasks });
    // });
    await fetch(`/api/tasks/delete-tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    this.props.history.push("/tasks");
    this.setState({tasks: this.state.tasks.filter(task => !list.includes(task))})
  }

  updateSelectionList(list) {
    const taskList = list.map( id => this.state.tasks.find(task => task.taskId === id))
    this.setState({ selectionList: taskList });
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

    // const taskList = tasks.map((task) => {
    //   return (
    //     <TableRow key={task.taskId}>
    //       <TableCell align="left" style={{ whiteSpace: "nowrap" }}>
    //         <Checkbox></Checkbox>
    //         <a href={"/tasks/" + task.taskId}>{task.taskId}</a>
    //       </TableCell>
    //       <TableCell>{task.description}</TableCell>
    //       <TableCell>{task.type.value}</TableCell>
    //       <TableCell>
    //         {task.vehicle.vehicleId + ": " + task.vehicle.description}
    //       </TableCell>
    //       <TableCell>{task.dateEntered}</TableCell>
    //       <TableCell>{task.dateDue}</TableCell>
    //       <TableCell>
    //         <IconButton
    //           onClick={() => this.displayDetails(task, "INSTRUCTIONS")}
    //         >
    //           <DescriptionIcon />
    //         </IconButton>
    //       </TableCell>
    //       <TableCell>
    //         <IconButton onClick={() => this.displayDetails(task, "NOTES")}>
    //           <DescriptionIcon />
    //         </IconButton>
    //       </TableCell>
    //       <TableCell>
    //         <ButtonGroup>
    //           <IconButton
    //             color="success"
    //             component={Link}
    //             to={"/tasks/" + task.taskId}
    //           >
    //             <ModeEditIcon />
    //           </IconButton>
    //           <IconButton color="error" onClick={() => this.handleDelete(task)}>
    //             <DeleteForeverIcon />
    //           </IconButton>
    //         </ButtonGroup>
    //       </TableCell>
    //     </TableRow>
    //   );
    // });

    return (
      <div>
        <AppNavbar />
        <Container fluid="true">
          <Stack direction="column" spacing={2}>
            <Stack direction="row">
              <h3>Tasks</h3>
              <IconButton color="success" component={Link} to="/tasks/new">
                <PersonAddAlt1Icon />
              </IconButton>
            </Stack>
            <TaskGrid
              tasks={this.state.tasks}
              density="compact"
              updateSelectionList={this.updateSelectionList}
            />
            {/*TODO:: Set up mass deletion window */}
            <ButtonGroup>
              <Button
                disabled={this.state.selectionList.length != 1}
                color="secondary"
                variant="contained"
                component={Link}
                to={"/tasks/" + this.state.selectionList[0]}
              >
                Edit
              </Button>
              <Button 
                color="error" 
                variant="contained" 
                disabled={this.state.selectionList.length < 1} 
                onClick={this.handleDelete}
                >
                Delete
              </Button>
            </ButtonGroup>
            {/* 
            Replaced with TaskGrid
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
          </TableContainer> */}
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
                    this.state.selectionList.map( task => {
                      return (
                      <p>
                        Task: {task.taskId} <br />
                        Description: {task.description} <br />
                        Vehicle: {task.vehicle.vehicleId}<hr/>
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
