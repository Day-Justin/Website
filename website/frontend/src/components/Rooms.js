import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import Createroompage from './Createroompage';

class Rooms extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            viewSettings: false,
        };
        const { roomCode } = this.props.params;
        this.roomCode = roomCode;
        this.leaveButton = this.leaveButton.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
    }
    
    async componentDidMount(){
        fetch('/api/get-room?code=' + this.roomCode
        ).then((response) => {
            if (!response.ok){
                this.props.history("/");
            }
            return response.json()}
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    getRoomDetails(){
        fetch('/api/get-room?code=' + this.roomCode
        ).then((response) => {
            if (!response.ok){
                this.props.history("/");
            }
            return response.json()}
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    leaveButton(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.history("/");
        });
    }

    showSettings(value) {
        this.setState({
            viewSettings: value
        });
    }

    renderSettings(){ // using Createroompage to update because it has already has nice forms
        return(
            <Grid item xs={12} align="center"> 
                <Createroompage 
                    update={true} 
                    votesToSkip={this.state.votesToSkip} 
                    guestCanPause={this.state.guestCanPause} 
                    roomCode={this.roomCode} 
                    updateCallBack={this.getRoomDetails}
                />
            </Grid>
    );}

    renderSettingsButton(){
        return(
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={() => this.showSettings(!this.state.viewSettings)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    render(){
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography variant="h3" component="h4">
                        This is Room {this.roomCode}
                    </Typography>

                    <Typography variant="h6" component="h6">
                        Guests can pause? {this.state.guestCanPause.toString()}
                    </Typography>

                    <Typography variant="h6" component="h6">
                        Votes to Skip: {this.state.votesToSkip.toString()}
                    </Typography>

                    {this.state.isHost ?
                    (<Typography variant="h6" component="h6">
                        You're the Host 
                    </Typography>) :
                    (<Typography variant="h6" component="h6">
                        Welcome Guest 
                    </Typography>)
                    }
                </Grid>

                {this.state.isHost ? this.renderSettingsButton() : null}
                
                {(this.state.isHost && this.state.viewSettings) && this.renderSettings()}

                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.leaveButton}>
                        Leave Room
                    </Button>
                </Grid>

            </Grid>
            /*
            <div>
                <h3>
                    Room: {this.roomCode}
                </h3>
                <p>
                    Votes: {this.state.votesToSkip.toString()}
                </p>
                <p>
                    Guest: {this.state.guestCanPause.toString()}
                </p>
                <p>
                    Host: {this.state.isHost.toString()}
                </p>
            </div>
            */
        );
    }
}

export default (props) => (
    <Rooms
        {...props}
        params={useParams()}
        history={useNavigate()}
    />
);