import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormHelperText, 
    FormControlLabel, FormControl, Radio, RadioGroup, FormLabel,
    Collapse, Alert} from "@mui/material";

class Createroompage extends Component{
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        updateCallBack: () => {},
    }

    constructor(props){
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            msg: "",
        };

        // binding method to class to get access to object elements
        this.votesChange = this.votesChange.bind(this);
        this.guestCanPauseChange = this.guestCanPauseChange.bind(this);
        this.roomCreation = this.roomCreation.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
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

    updateRoom(){
        const requestOptions ={
            method: "PATCH",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                rm_code: this.props.roomCode,
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };
        fetch('/api/update-room', requestOptions
        ).then((response) => {
            if(response.ok){
                this.setState({msg : "Room Update Sucessful"})
            }
            else{
                this.setState({msg : "Room Update Failed"})
            }
            this.props.updateCallBack();
        }
        );
    }

    render(){
        const update = this.props.update;

        return (
        <Grid container >
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4" >
                    {!update && "Create a Room"}
                </Typography>

                <Grid item xs={12} align="center">
                    <Collapse in={this.state != ""}>
                            {this.state.msg != "" &&
                                <Alert 
                                    severity="info" 
                                    onClose={() => {this.setState({msg: ""})}}>
                                    {this.state.msg}
                                </Alert>
                            }
                    </Collapse>
                </Grid>

                <div style={{padding: "20px"}}>
                    <FormControl component="fieldset">
                        <label align="center">
                            Guest Control    
                        </label>                    
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.guestCanPauseChange}>
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
                            defaultValue={this.state.votesToSkip}
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
                {update ?
                    (<div style={{padding: "20px"}}>
                        <Button color="secondary" variant="contained" onClick={this.updateRoom}>
                            Update Room
                        </Button>
                    </div>) :
                        (<div style={{padding: "20px"}}>
                        <Button color="secondary" variant="contained" onClick={this.roomCreation}>
                            Create A Room
                        </Button>
                    </div>)
                }   

                {!update &&
                    (<div style={{padding: "20px"}}>
                        <Button color="secondary" variant="contained" to="/" component={Link}> 
                            Go Back
                        </Button>
                    </div>)
                }
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