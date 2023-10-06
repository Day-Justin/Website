import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormLabel } from "@mui/material";

class Createroompage extends Component{
    defaultVotes = 2;

    constructor(props){
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        // binding method to class to get access to object elements
        this.votesChange = this.votesChange.bind(this);
        this.guestCanPauseChange = this.guestCanPauseChange.bind(this);
        this.roomCreation = this.roomCreation.bind(this);
    }

    votesChange(e){
        this.setState({
            votesToSkip: e.target.value, 
        });
    }

    guestCanPauseChange(e){
        this.setState({
            guestCanPause: e.target.value == "true" ? true : false,
        });
    }

    roomCreation(){
        const requestOptions ={
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions
        ).then((response) => response.json()
        ).then((data) => this.props.history('/rooms/' + data.rm_code)
        );
    }

    render(){
        return (
        <Grid container >
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4" >
                    Create A Room
                </Typography>

                <div style={{padding: "20px"}}>
                <FormControl component="fieldset">
                    <label align="center">
                        Guest Control    
                    </label>                    
                    <RadioGroup row defaultValue="true" onChange={this.guestCanPauseChange}>
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary" />} 
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />

                        <FormControlLabel
                            value="false" 
                            control={<Radio color="secondary" />} 
                            label="No Control"
                            labelPlacement="bottom"
                        />

                    </RadioGroup>
                </FormControl>
                </div>

                <div style={{padding: "20px"}}>
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number" 
                        defaultValue={this.defaultVotes}
                        inputProps={{min: 1, style: {textAlign: "center"}}}
                        onChange={this.votesChange}
                    />
                    <label align="center">
                        Votes Required
                    </label>
                </FormControl>
                </div>
            </Grid>

            <Grid item xs={12} align="center">
                <div style={{padding: "20px"}}>
                <Button color="secondary" variant="contained" onClick={this.roomCreation}>
                    Create A Room
                </Button>
                </div>

                <div style={{padding: "20px"}}>
                <Button color="primary" variant="contained" to="/" component={Link}> 
                    Go Back
                </Button>
                </div>
            </Grid>

        </Grid>
        );
    }
}

export default (props) => (
    <Createroompage
        {...props}
        history={useNavigate()}
    />
);