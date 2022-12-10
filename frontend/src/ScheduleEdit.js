import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { TextField, Button, Stack, Container, MenuItem, FormControlLabel, Checkbox } from "@mui/material";

class ScheduleEdit extends Component {
  emptyItem = {
    schedId: "",
    frequency: 0,
    active: false,
    nextExecutionDate: "",
    timeUnit: {
      unitId: 1
    },
    task: {
      taskId: 1
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      tasks: [],
      timeUnits: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const schedule = await (
        await fetch(`/api/schedules/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: schedule });
      console.log(schedule)
    }
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((task) => task.type.value === 'Template')
        this.setState({ tasks: data })
      });
    fetch("/api/time-units")
      .then((response) => response.json())
      .then((data) => this.setState({ timeUnits: data }));
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item: item });
  }

  handleCheck() {
    let currentItem = { ...this.state.item };
    currentItem["active"] = !this.state.item.active;
    this.setState({ item: currentItem });
  }

  handleSelectChange = (event, field) => {
    if (field === "TASK") {
      const { tasks } = this.state;
      const selectedTask = tasks.filter(function (t) {
        return t.taskId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["task"] = selectedTask;
      this.setState({ item: item });
    }
    if (field === "TIMEUNIT") {
      const { timeUnits } = this.state;
      const selectedTimeUnit = timeUnits.filter(function (t) {
        return t.unitId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["timeUnit"] = selectedTimeUnit;
      this.setState({ item: item });
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
        <Container maxWidth="sm">
          {title}
          <form onSubmit={this.handleSubmit}>
            <Stack direction="column" spacing={1}>
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
                variant="outlined"
                id="task"
                select
                required={true}
                value={item.task.taskId}
                label="Task"
                onChange={(e) => this.handleSelectChange(e, "TASK")}
              >
                {this.state.tasks.map((task) => (
                  <MenuItem key={task.taskId} value={task.taskId}>
                    {task.taskId + ": " + task.description}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Frequency"
                  variant="outlined"
                  name="frequency"
                  id="frequency"
                  type="number"
                  required={true}
                  inputProps={{ pattern: '[1]*' }}
                  value={item.frequency || ""}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  id="timeUnit"
                  select
                  required={true}
                  value={item.timeUnit.unitId}
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
                  variant="outlined"
                  id="nextExecutionDate"
                  name="nextExecutionDate"
                  required={true}
                  helperText="YYYY-MM-DD"
                  value={item.nextExecutionDate || ""}
                  label="Next Execution Date"
                  onChange={this.handleChange}
                />
              </Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.active}
                    onChange={this.handleCheck}
                  />
                }
                label="Active"
                name="active"
              />
              <Stack direction="row" spacing={1}>
                <Button color="primary" variant="outlined" type="submit">
                  Save
                </Button>{" "}
                <Button
                  color="secondary"
                  variant="outlined"
                  component={Link}
                  to="/schedules"
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Container>
      </div>
    );
  }
}
export default withRouter(ScheduleEdit);
