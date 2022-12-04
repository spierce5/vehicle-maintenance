import React, { Component } from "react";
import "./App.css";
import "./Home.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { Button, styled, Tooltip } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import $ from 'jquery';

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

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}));

const getTriangle = () => {

  let width = $("#vehicle-button").position().left - $("#task-button").position().left;
  let height = $("#task-button").position().top - $("#vehicle-button").position().top;
  let hypotenuse = Math.round(Math.sqrt((Math.pow(width, 2)) + (Math.pow(height, 2))));

  // horizontal shift at line end caused by rotation = (1 - cos(angle)) * 1/2 length
  // cos(angle) = width/hypotenuse
  const originX = $("#vehicle-button").position().left + ($("#vehicle-button").width() / 2);
  let rotateOffsetX = (-($("#line1").width() / 2) * (1 - (width / hypotenuse)));
  let buttonOffsetX = (-originX + $("#task-button").position().left + ($("#task-button").width() / 2))
  let offsetX = rotateOffsetX + buttonOffsetX

  // vertical shift at line end caused by rotation = sin(angle) * 1/2 length
  // sin(angle) = height / hypotenuse
  let rotateOffsetY = (-($("#line1").width() / 2) * (height / hypotenuse))
  let buttonOffsetY = ($("#task-button").height() / 2);
  let offsetY = rotateOffsetY + buttonOffsetY

  $("#line1").width(hypotenuse);
  $("#line1").css({ 'transform': 'translate(' + offsetX + 'px, ' + offsetY + 'px) rotate(' + -Math.atan(height / width) + 'rad)' });

  // horizontal shift at line end caused by rotation = (1 - cos(angle)) * 1/2 length
  // cos(angle) = width/hypotenuse
  rotateOffsetX = (-($("#line2").width() / 2) * (1 - (width / hypotenuse)));
  buttonOffsetX = (-originX) + $("#vehicle-button").position().left + ($("#vehicle-button").width() / 2)
  offsetX = rotateOffsetX + buttonOffsetX

  // vertical shift at line end caused by rotation = sin(angle) * 1/2 length
  // sin(angle) = height / hypotenuse
  rotateOffsetY = (-($("#line2").width() / 2) * (height / hypotenuse));
  buttonOffsetY = ($("#schedule-button").height() / 2)
  offsetY = rotateOffsetY + buttonOffsetY

  $("#line2").width(hypotenuse);
  $("#line2").css({ 'transform': 'translate(' + offsetX + 'px, ' + offsetY + 'px) rotate(' + Math.atan(height / width) + 'rad)' })

  $("#line3").width($("#schedule-button").position().left - $("#task-button").position().left)
  $("#line3").css({ 'transform': 'translate(-50%, ' + $("#schedule-button").height() / 2 + 'px)' })
}


class Home extends Component {
  componentDidMount() {
    getTriangle()
    $(window).resize(function () {
      getTriangle()
    });
  }

  render() {
    return (
      <div className="main">
        <AppNavbar className="header" />
        <StyledDiv id="line1" className="line" />
        <StyledDiv id="line2" className="line" />
        <StyledDiv id="line3" className="line" />
        <Tooltip title="Vehicles" placement="bottom-start"><OvalButton id="vehicle-button" component={Link} to="/vehicles"><DirectionsCarIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
        <Tooltip title="Maintenance Tasks" placement="bottom-start"><OvalButton id="task-button" component={Link} to="/tasks"><AssignmentIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
        <Tooltip title="Schedules" placement="bottom-start"><OvalButton id="schedule-button" component={Link} to="/schedules"><CalendarMonthIcon fontSize="large" className="icon" /></OvalButton></Tooltip>
      </div>
    );
  }
}
export default Home;