import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

class VehicleEdit extends Component {

    emptyItem = {
        vehicleId: '',
        description: '',
        year: '',
        make: '',
        model: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const vehicle = await (await fetch(`/api/vehicles/${this.props.match.params.id}`)).json();
            this.setState({item: vehicle});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(JSON.stringify(item));
        await fetch('/api/vehicles' + (item.vehicleId ? '/' + item.vehicleId : ''), {
            method: (item.vehicleId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/vehicles');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.vehicleId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>;
    
        return <div>
            <AppNavbar/>
            <Container maxWidth="sm">
                {title}
                <form onSubmit={this.handleSubmit}>
                    <Stack direction="column" spacing={1}>
                        <TextField label="Vehicle ID" variant="outlined" name="vehicleId" id="vehicleId" value={item.vehicleId || ''}
                            disabled={true} sx={{visibility: item.vehicleId ? "visible" : "hidden"}}/>
                        <TextField label="Description" variant="outlined" name="description" id="description" value={item.description || ''}
                                onChange={this.handleChange} />
                        <TextField label="Year" variant="outlined" name="year" id="year" value={item.year || ''}
                                onChange={this.handleChange} />
                        <TextField label="Make" variant="outlined" name="make" id="make" value={item.make || ''}
                                onChange={this.handleChange} />
                        <TextField label="Model" variant="outlined" name="model" id="model" value={item.model || ''}
                                onChange={this.handleChange} />
                        <TextField label="Notes" variant="outlined" name="notes" id="notes" value={item.notes || ''}
                                onChange={this.handleChange} />
                        <Stack direction="row" spacing={1}>
                            <Button color="primary" variant="outlined" type="submit">Save</Button>{' '}
                            <Button color="secondary" variant="outlined" component={Link} to="/vehicles">Cancel</Button>
                        </Stack>
                    </Stack>
                </form>
            </Container>
        </div>
    }
}
export default withRouter(VehicleEdit);