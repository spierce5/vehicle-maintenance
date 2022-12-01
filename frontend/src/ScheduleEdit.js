import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";

class ScheduleEdit extends Component {
  emptyItem = {
    schedId: "",
    frequency: 0,
    active: false,
    timeUnit: '',
    task: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      tasks: [],
      timeUnits: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const schedule = await (
        await fetch(`/api/schedules/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: schedule });
    }
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }));
    fetch("/api/time-units")
      .then((response) => response.json())
      .then((data) => this.setState({ timeUnits: data }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleSelectChange = (event, field) => {
    if (field === "TASK") {
      const { tasks } = this.state;
      const selectedTask = tasks.filter(function (t) {
        return t.taskId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["task"] = selectedTask;
      this.setState({ item });
    }
    if (field === "TIMEUNIT") {
      const { timeUnits } = this.state;
      const selectedTimeUnit = timeUnits.filter(function (t) {
        return t.unitId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["timeUnit"] = selectedTimeUnit;
      this.setState({ item });
    }
  };

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch("/api/schedules" + (item.schedId ? "/" + item.schedId : ""), {
      method: item.schedId ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/schedules");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.schedId ? "Edit Schedule" : "Add Schedule"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container maxWidth="md">
          {title}
          <form onSubmit={this.handleSubmit}>
            <Stack direction="row" spacing={1}>
              <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
                <TextField
                  label="Schedule ID"
                  variant="outlined"
                  name="schedId"
                  id="schedId"
                  value={item.schedId || ""}
                  disabled={true}
                  sx={{ visibility: item.schedId ? "visible" : "hidden" }}
                />
                <TextField
                  label="Frequency"
                  variant="outlined"
                  name="frequency"
                  id="frequency"
                  value={item.frequency || ""}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  id="task"
                  select
                  value={item.task.taskId}
                  label="task"
                  onChange={(e) => this.handleSelectChange(e, "TASK")}
                >
                  {this.state.tasks.map((task) => (
                    <MenuItem key={task.taskId} value={task.taskId}>
                      {task.taskId + ": " + task.description}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  id="timeUnit"
                  select
                  value={item.timeUnit.value}
                  label="Time Unit"
                  onChange={(e) => this.handleSelectChange(e, "TIMEUNIT")}
                >
                  {this.state.timeUnits.map((unit) => (
                    <MenuItem key={unit.unitId} value={unit.unitId}>
                      {unit.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Active"
                  variant="outlined"
                  name="active"
                  id="active"
                  value={item.active || ""}
                  onChange={this.handleChange}
                />
              </Stack>
              <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
                <TextField
                  label="Instructions"
                  variant="outlined"
                  name="instructions"
                  multiline={true}
                  minRows="5"
                  id="instructions"
                  value={item.instructions || ""}
                  onChange={this.handleChange}
                />
                <TextField
                  label="Notes"
                  variant="outlined"
                  name="notes"
                  multiline={true}
                  minRows="5"
                  id="notes"
                  value={item.notes || ""}
                  onChange={this.handleChange}
                />
                <Stack direction="row" spacing={1}>
                  <Button color="primary" variant="outlined" type="submit">
                    Save
                  </Button>{" "}
                  <Button
                    color="secondary"
                    variant="outlined"
                    component={Link}
                    to="/tasks"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Container>
      </div>
    );
  }
}
export default withRouter(ScheduleEdit);
