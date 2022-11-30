import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VehicleList from "./VehicleList";
import VehicleEdit from "./VehicleEdit";
import TaskList from "./TaskList";
import TaskEdit from "./TaskEdit";
import Options from "./Options";
import ScheduleList from "./ScheduleList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0063cc",
    },
    secondary: {
      main: "#424242",
    },
  },
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="app"></div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/vehicles" exact component={VehicleList} />
            <Route path="/vehicles/:id" exact component={VehicleEdit} />
            <Route path="/tasks" exact component={TaskList} />
            <Route path="/tasks/:id" exact component={TaskEdit} />
            <Route path="/options" exact component={Options} />
            <Route path="/schedules" exact component={ScheduleList} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
