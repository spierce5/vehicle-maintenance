import React, { Component } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Toolbar,
  AppBar,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
      menuOpen: true,
    });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Tooltip title="Home">
              <IconButton
                color="inherit"
                edge="start"
                sx={{ mr: 2 }}
                component={Link}
                to="/"
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
            <IconButton
              onClick={this.handleClick}
              size="small"
              sx={{ ml: 2, flexGrow: 0 }}
              aria-controls={this.state.menuOpen ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={this.state.menuOpen ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu
              id="menu"
              anchorEl={this.state.anchorEl}
              open={open}
              onClose={this.handleClose}
              onClick={this.handleClose}
            >
              <MenuItem>
                <IconButton
                  color="inherit"
                  style={{ backgroundColor: "transparent" }}
                  component={Link}
                  to="/options"
                >
                  <SettingsIcon />
                  Options
                </IconButton>
              </MenuItem>
              <MenuItem>
                <IconButton
                  color="error"
                  style={{ backgroundColor: "transparent" }}
                  href="/logout"
                >
                  <Logout />
                  Logout
                </IconButton>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
