import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Toolbar, AppBar, Button, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <IconButton color="inherit" component={Link} to="/options">
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
