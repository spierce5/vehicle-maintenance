import React, { Component } from "react";
import "./App.css";
import "./Home.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Button,
  styled,
} from "@mui/material";

const OvalButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "min(2vw,20px)",
  padding: "6px 12px",
  border: "1px solid",
  borderRadius: "90px",
  height: "15vw",
  width: "15vw",
  maxHeight: "150px",
  maxWidth: "150px",
  lineHeight: 1.5,
  textAlign: "center",
  backgroundColor: "#FAFAFA",
  borderColor: "#0063cc",
  "&:hover": {
    backgroundColor: "#FAFAFA",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

class Home extends Component {
  render() {
    return (
      <div className="main">
        <AppNavbar className="header" />
        <Container maxWidth="md" className="section-list">
          <OvalButton className="vehicles" component={Link} to="/vehicles">
            Vehicles
          </OvalButton>
          <Container className="bottom-row">
            <OvalButton className="tasks" component={Link} to="/tasks">
              Maintenance Tasks
            </OvalButton>
            <OvalButton className="schedules">Schedules</OvalButton>
          </Container>
        </Container>
      </div>
    );
  }
}
export default Home;
