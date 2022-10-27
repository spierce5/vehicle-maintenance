import React, { Component } from 'react';
import './App.css';
import './Home.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

class Home extends Component {
    render() {
        return (
            <div className='main'>
                <AppNavbar className='header'/>
                <Container  maxWidth="xs" className='section-list'>
                    <Paper elevation={8}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton divider={true} component={Link} to="/vehicles">
                                    <ListItemText primary="Vehicles" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/tasks">
                                    <ListItemText primary="Maintenance Tasks" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>
                </Container>
            </div>
        );
    }
}
export default Home;