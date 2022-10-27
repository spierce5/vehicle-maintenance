import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import {
  TextField,
  Button,
  Container,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeUnits: [],
      taskTypes: [],
      currentObjectSelection: "task-types",
      editorOpen: false,
      currentValue: {
        value: "",
        description: "",
      },
      newValue: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    fetch("/api/time-units")
      .then((response) => response.json())
      .then((data) => this.setState({ timeUnits: data }));
    fetch("/api/task-types")
      .then((response) => response.json())
      .then((data) => this.setState({ taskTypes: data }));
  }

  handleClick(event) {
    let selection = event.currentTarget.getAttribute("name");
    this.setState({
      currentObjectSelection: selection,
    });
  }

  openEditor(value, editType) {
    const newVal = editType === "NEW" ? true : false;
    this.setState({
      editorOpen: true,
      currentValue: value,
      newValue: newVal,
    });
  }

  handleChange(event) {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.getAttribute("name");
    let currentValue = { ...this.state.currentValue };
    currentValue[name] = value;
    this.setState({ currentValue });
  }

  async handleSubmit(event) {
    /* TODO:  Rewrite for task types and time units */
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
    const title = <h2>Options</h2>;
    const detailHeaderText = () => {
      return this.state.currentObjectSelection
        .replace("-", " ")
        .replace(/(^\w{1})|(\s\w{1})/g, (l) => l.toUpperCase());
    };
    const detailHeader = <h3>{detailHeaderText()}</h3>;
    const valueType = this.state.currentObjectSelection
      .replace(/(-\w{1})/g, (l) => l.toUpperCase())
      .replace("-", "");
    const values = this.state[valueType];
    const valueId = () => {
      switch (this.state.currentObjectSelection) {
        case "task-types":
          return "typeId";
        case "time-units":
          return "unitId";
        default:
          return "typeId";
      }
    };
    const valueList = values.map((value) => {
      return (
        <TableRow key={value[valueId()]}>
          <TableCell style={{ whiteSpace: "nowrap" }}>{value.value}</TableCell>
          <TableCell>{value.description}</TableCell>
          <TableCell>
            <ButtonGroup>
              <IconButton
                color="success"
                onClick={() => this.openEditor(value, "EDIT")}
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => this.handleDelete(value)}
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
        <Container maxWidth="lg">
          {title}
          <Stack direction="row">
            <Container maxWidth="xs">
              <List>
                <ListItem
                  name="task-types"
                  disablePadding
                  divider={true}
                  selected={this.state.currentObjectSelection === "task-types"}
                  onClick={this.handleClick}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <TextFieldsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Task Types" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  divider={true}
                  selected={this.state.currentObjectSelection === "time-units"}
                >
                  <ListItemButton name="time-units" onClick={this.handleClick}>
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Time Units" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Container>
            <Container maxWidth="md">
              <Stack direction="row">
                {detailHeader}
                <IconButton
                  color="success"
                  onClick={() => this.openEditor({}, "NEW")}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
              <TableContainer>
                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableCell width="40%">
                        <b>Value</b>
                      </TableCell>
                      <TableCell width="50%">
                        <b>Description</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{valueList}</TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Stack>
          <Dialog
            open={this.state.editorOpen}
            onClose={() => this.setState({ editorOpen: false })}
          >
            <DialogTitle>
              {this.state.newValue
                ? "Add " + detailHeaderText().slice(0, -1)
                : "Edit"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="value"
                name="value"
                label="Value"
                value={this.state.currentValue.value || ""}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                value={this.state.currentValue.description || ""}
                onChange={this.handleChange}
                multiline
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ editorOpen: false })}>
                Cancel
              </Button>
              <Button onClick={() => this.setState({ editorOpen: false })}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    );
  }
}
export default withRouter(Options);
