import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';

class Rooms extends Component{
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        const { roomCode } = this.props.params;
        this.roomCode = roomCode;
        this.leaveButton = this.leaveButton.bind(this);
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

    leaveButton(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.history("/");
        });
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

                    {this.state.isHost &&
                    <Typography variant="h6" component="h6">
                        You're the Host 
                    </Typography>}
                </Grid>

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