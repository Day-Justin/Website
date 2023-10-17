import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate} from "react-router-dom";

class Roomjoinpage extends Component{
    constructor(props){
        super(props);
        this.state ={
            roomCode: "",
            error: "",
        };

        // binding method to class to get access to object elements
        this.textFieldChange = this.textFieldChange.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    textFieldChange(e){
        this.setState({
            roomCode: e.target.value,    
        });
    }

    joinRoom() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: this.state.roomCode,
          }),
        };
        fetch("/musicApi/join-room", requestOptions)
          .then((response) => {
            if (response.ok) {
              this.props.history(`/music/rooms/${this.state.roomCode}`);
            } else {
              this.setState({ error: "Room not found." });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    render(){
        return (
            <Grid container >
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join Room
                    </Typography>

                    <div style={{padding: "20px"}}>
                    <TextField 
                        error
                        label="code"
                        placeholder="Enter Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.textFieldChange}
                    />
                    </div>

                    <div style={{padding: "20px"}}>
                    <Button variant="contained" color="secondary" to="/" onClick={this.joinRoom}>
                        Join Room
                    </Button>
                    </div>

                    <div style={{padding: "20px"}}>
                    <Button variant="contained" color="primary" to="/music" component={Link}>
                        Go Back
                    </Button>
                    </div>
                </Grid>

            </Grid>
        );
    }
}

export default (props) => (
    <Roomjoinpage
        {...props}
        history={useNavigate()}
    />
);