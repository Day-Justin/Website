import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Card, IconButton, LinearProgress} from "@mui/material";
import { PlayArrow, SkipNext, Pause} from "@mui/icons-material";

class MusicPlayer extends Component{
    constructor(props){
        super(props);
    }

    pauseSong(){
        const requestOptions={
            method: 'PUT',
            header: {"Content-Type": "application/json"},
        };
        fetch("/spotify/pause-song", requestOptions);
    }

    playSong(){
        const requestOptions={
            method: 'PUT',
            header: {"Content-Type": "application/json"},
        };
        fetch("/spotify/play-song", requestOptions);
    }

    skipSong(){
        const requestOptions={
            method: 'POST',
            header: {"Content-Type": "application/json"},
        };
        fetch("/spotify/skip-song", requestOptions);
    }

    render(){
        const songProgress = (this.props.time / this.props.duration) * 100;

        return(
            <Card>
                <Grid container alignItems="center">
                    <Grid item align="center" xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" />
                    </Grid>

                    <Grid item align="center" xs={8}>
                        <Typography component="h5" variant='h5'>
                            {this.props.title}
                        </Typography>

                        <Typography color="textSecondary" variant='subtitle1'>
                            {this.props.artist}
                        </Typography>

                        <div>
                            <IconButton onClick={() => {this.props.is_playing ? this.pauseSong() : this.playSong();} }>
                                {this.props.is_playing ? <Pause /> : <PlayArrow />}
                            </IconButton>
                            <IconButton onClick={() => this.skipSong() } >
                                {this.props.votes} {" / "} {this.props.votes_required} <SkipNext /> 
                            </IconButton>
                        </div>

                    </Grid>

                </Grid>

                <LinearProgress variant="determinate" value={songProgress} />

            </Card>
        );
    }
}

export default (props) => (
    <MusicPlayer
        {...props}
        params={useParams()}
        history={useNavigate()}
    />
);