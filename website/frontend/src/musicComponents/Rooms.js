import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import Createroompage from './Createroompage';
import Musicplayer from './Musicplayer';

class Rooms extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            viewSettings: false,
            spotifyAuth: false,
            song: {}
        };
        const { roomCode } = this.props.params;
        this.roomCode = roomCode;
        this.leaveButton = this.leaveButton.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authSpotify = this.authSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
    }
    
    async componentDidMount(){
        fetch('/musicApi/get-room?code=' + this.roomCode
        ).then((response) => {
            if (!response.ok){
                this.props.history("/music");
            }
            return response.json()}
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
            //if(this.state.isHost){
            //    this.authSpotify();
            //}
        });
        //this.interval =setInterval(this.getCurrentSong, 1000); 
        // using polling method bc spotify dont have websockets
    }
/*
    async componentWillUnmount(){
        clearInterval(this.interval)
    }
*/
    authSpotify(){
        fetch('/spotify/is-auth'
        ).then((response) => response.json()
        ).then((data) => {
            this.setState({spotifyAuth: data.status});
                if(!data.status){ 
                    /*
                    if not authenticated, call endpoint to redirect url to ask to authenticate
                    and endpoint at uri will authenticate and create user creds in the backend
                    and then redirect to this page where they will be auth and skip over this fxn
                    */
                   fetch('/spotify/get-auth')
                   .then((response) => response.json())
                   .then((data) => {
                    window.location.replace(data.url);
                   });
                }
        });
    }

    getRoomDetails(){
        fetch('/musicApi/get-room?code=' + this.roomCode
        ).then((response) => {
            if (!response.ok){
                this.props.history("/music");
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

    getCurrentSong(){
        fetch('/spotify/current-song')
        .then((response) => {
            if (!response.ok){
                return{};
            }
            else {
                return response.json();
            }
        })
        .then((data) => {
            this.setState({song: data});
            console.log(data);
        });
    }

    leaveButton(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
        };
        fetch('/musicApi/leave-room', requestOptions).then((_response) => {
            this.props.history("/music");
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
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} align='center'>
                    <Typography variant="h3" component="h4">
                        This is Room {this.roomCode}
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
                                    <Musicplayer {...this.state.song} />

                    <Typography variant="h6" component="h6">
                        Guests can pause? {this.state.guestCanPause.toString()}
                    </Typography>

                    <Typography variant="h6" component="h6">
                        Votes to Skip: {this.state.votesToSkip.toString()}
                    </Typography>
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