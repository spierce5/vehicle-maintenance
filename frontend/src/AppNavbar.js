import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Toolbar, AppBar, Button, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Tooltip title="Options" placement="bottom" arrow="true">
              <IconButton color="inherit" component={Link} to="/options">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
