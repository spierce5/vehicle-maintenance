import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VehicleList from "./VehicleList";
import VehicleEdit from "./VehicleEdit";
import TaskList from "./TaskList";
import TaskEdit from "./TaskEdit";
import Options from "./Options";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/vehicles" exact component={VehicleList} />
          <Route path="/vehicles/:id" exact component={VehicleEdit} />
          <Route path="/tasks" exact component={TaskList} />
          <Route path="/tasks/:id" exact component={TaskEdit} />
          <Route path="/options" exact component={Options} />
        </Switch>
      </Router>
    );
  }
}

export default App;
