import React, { Component, useEffect } from "react";
import "./App.css";
import "./Home.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { Button, styled, Tooltip } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const OvalButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "min(2vw,20px)",
  padding: "6px 12px",
  border: "4px solid",
  borderRadius: "90px",
  width: "15vw",
  maxWidth: "150px",
  minWidth: "90px",
  aspectRatio: "1/1",
  lineHeight: 1.5,
  textAlign: "center",
  color: theme.palette.secondary.main,
  backgroundColor: "#EEEEEE",
  borderColor: theme.palette.primary.main,
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
}));

class Home extends Component {
  componentDidMount() { }

  render() {
    return (
      <div className="main">
        <AppNavbar className="header" />
        <Tooltip title="Vehicles" placement="bottom-start"><OvalButton id="vehicle-button" component={Link} to="/vehicles"><DirectionsCarIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
        <Tooltip title="Maintenance Tasks" placement="bottom-start"><OvalButton id="task-button" component={Link} to="/tasks"><AssignmentIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
        <Tooltip title="Schedules" placement="bottom-start"><OvalButton id="schedule-button" ><CalendarMonthIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
      </div>
    );
  }
}
export default Home;