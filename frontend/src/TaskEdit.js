import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import { TextField, Button, Stack, Container, FormControlLabel, Checkbox } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

class TaskEdit extends Component {
  emptyItem = {
    taskId: "",
    description: "",
    dateEntered: null,
    dateDue: null,
    complete: false,
    instructions: "",
    notes: "",
    type: {
      typeId: "",
    },
    vehicle: {
      vehicleId: "",
      description: "",
      year: "",
      make: "",
      model: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      vehicles: [],
      taskTypes: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const task = await (
        await fetch(`/api/tasks/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: task });
    }
    fetch("/api/vehicles")
      .then((response) => response.json())
      .then((data) => this.setState({ vehicles: data }));
    fetch("/api/task-types")
      .then((response) => response.json())
      .then((data) => this.setState({ taskTypes: data }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleCheck() {
    let currentItem = { ...this.state.item };
    currentItem["complete"] = !this.state.item.complete;
    this.setState({ item: currentItem });
  }

  handleSelectChange = (event, field) => {
    if (field === "VEHICLE") {
      const { vehicles } = this.state;
      const selectedVehicle = vehicles.filter(function (v) {
        return v.vehicleId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["vehicle"] = selectedVehicle;
      this.setState({ item });
    }
    if (field === "TASKTYPE") {
      const { taskTypes } = this.state;
      const selectedVehicle = taskTypes.filter(function (t) {
        return t.typeId === event.target.value;
      })[0];
      let item = { ...this.state.item };
      item["type"] = selectedVehicle;
      this.setState({ item });
    }
  };

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await fetch("/api/tasks" + (item.taskId ? "/" + item.taskId : ""), {
      method: item.taskId ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/tasks");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.taskId ? "Edit Task" : "Add Task"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container maxWidth="md">
          {title}
          <form onSubmit={this.handleSubmit}>
            <Stack direction="row" spacing={1}>
              <Stack direction="column" spacing={1} sx={{ width: "50%" }}>
                <TextField
                  label="Task ID"
                  variant="outlined"
                  name="taskId"
                  id="taskId"
                  value={item.taskId || ""}
                  disabled={true}
                  sx={{ visibility: item.taskId ? "visible" : "hidden" }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  id="description"
                  value={item.description || ""}
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  id="vehicle"
                  select
                  value={item.vehicle.vehicleId}
                  label="Vehicle"
                  onChange={(e) => this.handleSelectChange(e, "VEHICLE")}
                >
                  {this.state.vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.vehicleId} value={vehicle.vehicleId}>
                      {vehicle.vehicleId + ": " + vehicle.description}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  id="taskType"
                  select
                  value={item.type.typeId}
                  label="Task Type"
                  onChange={(e) => this.handleSelectChange(e, "TASKTYPE")}
                >
                  {this.state.taskTypes.map((type) => (
                    <MenuItem key={type.typeId} value={type.typeId}>
                      {type.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Date Due"
                  variant="outlined"
                  name="dateDue"
                  id="dateDue"
                  disabled={item.type.value === "Template"}
                  value={item.dateDue || ""}
                  onChange={this.handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.complete}
                      onChange={this.handleCheck}
                      disabled={item.type.value === 'Template'}

                    />
                  }
                  label="Mark As Complete"
                  name="complete"
                  sx={{ visibility: item.type.value === 'Template' ? "hidden" : "visible" }}
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
export default withRouter(TaskEdit);
