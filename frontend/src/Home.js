import React, { Component, useEffect } from "react";
import "./App.css";
import "./Home.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { Container, Button, styled } from "@mui/material";

const OvalButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "min(2vw,20px)",
  padding: "6px 12px",
  border: "4px solid",
  borderRadius: "90px",
  width: "15vw",
  maxWidth: "150px",
  minWidth: "60px",
  aspectRatio: "1/1",
  lineHeight: 1.5,
  textAlign: "center",
  backgroundColor: "#EEEEEE",
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
  componentDidMount() {}

  render() {
    return (
      <div className="main">
        <AppNavbar className="header" />
        <canvas id="line1" width="600" height="600"></canvas>
        <Container maxWidth="md" className="section-list">
          <OvalButton id="vehicles" component={Link} to="/vehicles">
            Vehicles
          </OvalButton>
          <Container className="bottom-row">
            <OvalButton id="tasks" component={Link} to="/tasks">
              Maintenance Tasks
            </OvalButton>
            <OvalButton id="schedules">Schedules</OvalButton>
          </Container>
        </Container>
      </div>
    );
  }
}
export default Home;
