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
  Fab,
  Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import AppNavbar from "./AppNavbar";
import ScheduleGrid from "./ScheduleGrid";
import { Link } from "react-router-dom";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      selectionList: [],
      deleteDialogOpen: false
    };
    this.remove = this.remove.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateSelectionList = this.updateSelectionList.bind(this);
  }

  componentDidMount() {
    fetch("/api/schedules")
      .then((response) => response.json())
      .then((data) => this.setState({ schedules: data }));
  }

  async remove(list) {
    await fetch(`/api/schedules/delete-schedules`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    this.props.history.push("/schedules");
    this.setState({ tasks: this.state.schedules.filter(schedule => !list.includes(schedule)) })
  }

  updateSelectionList(list) {
    const scheduleList = list.map(id => this.state.schedules.find(schedule => schedule.schedId === id))
    this.setState({ selectionList: scheduleList });
  }

  handleDialogClose(choice) {
    if (choice === "DELETE") {
      this.remove(this.state.selectionList);
    }
    this.setState({
      deleteDialogOpen: false,
    });
  }

  handleDelete() {
    const newState = { ...this.state };
    newState["deleteDialogOpen"] = true;
    this.setState(newState);
  }

  render() {
    const { schedules, isLoading } = this.state;
    /*
        schedules.sort(function (a, b) {
          if (a.dateEntered === b.dateEntered) {
            return 0;
          } else if (a.dateEntered < b.dateEntered) {
            return 1;
          } else {
            return -1;
          }
        });
        */

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar />
        <Container fluid="true" sx={{ marginTop: "5px" }}>
          <Stack direction="column" spacing={2}>
            <h1>Schedules</h1>
            <ScheduleGrid
              schedules={this.state.schedules}
              density="compact"
              updateSelectionList={this.updateSelectionList}
            />
            <Stack direction="row" spacing={1}>
              <Tooltip title="Add">
                <Fab size="medium"
                  component={Link}
                  to="/schedules/new">
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length === 1 ? "Edit" : this.state.selectionList.length < 1 ? "You must select a schedule to edit." : "You can only edit one schedule at a time."}>
                <span>
                  <Fab size="medium"
                    component={Link}
                    to={this.state.selectionList.length > 0 ? "/schedules/" + this.state.selectionList[0].schedId : ''}
                    disabled={this.state.selectionList.length !== 1}
                  >
                    <EditIcon />
                  </Fab>
                </span>
              </Tooltip>
              <Tooltip title={this.state.selectionList.length < 1 ? "You must select at least one schedule to delete." : "Delete"}>
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
            {"Are you sure you want to delete these schedules?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.deleteDialogOpen ? (
                <div>
                  {
                    this.state.selectionList.map(schedule => {
                      return (
                        <p>
                          Schedule: {schedule.schedId} <br />
                          Task: {schedule.task.description} <br />
                          Frequency: {schedule.frequency}<br />
                          Time Unit: {schedule.timeUnit.value}<hr />
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
      </div>
    );
  }
}
export default TaskList;
