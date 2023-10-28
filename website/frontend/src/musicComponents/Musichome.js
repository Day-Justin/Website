import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Grid, Button, ButtonGroup, Typography } from "@mui/material";

export default class Musichome extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Music
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/music/join" component={ Link }>
                            Join a existing room
                        </Button>

                        <Button color="primary" to="/music/create" component={ Link }>
                            Create a new room
                        </Button>

                    </ButtonGroup>
                </Grid>

                <Grid item xs={12} align="center">
                    <Typography variant="h5" component="h5">
                        <div>Disclaimer!</div>
                        <div>Development of music playing functions have halted.</div>
                        <div>However, room creation works perfectly fine.</div>
                    </Typography>
                </Grid>

            </Grid>
        );
    }
}
