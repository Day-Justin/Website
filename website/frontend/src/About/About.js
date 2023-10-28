import React from 'react';
import { 
    Grid, Typography,
    Link, Button,
} from '@mui/material';
import { Link as link } from 'react-router-dom';

function About(){

    return(
        <Grid container alignItems="center">
            <Grid item xs={12} align="center">
                <Typography component="h3" variant='h3'>
                    Introduction
                </Typography>
                <Typography component="body1" variant="body1">
                    <p>
                        Hi, I'm Justin, a recent graduate from Queens College with bachelor's in Computer Science.<br />
                        I currently reside in Bayside, Queens, NY.<br />
                        Recently I've grown interested in cyber security after taking a class in cryptoraphy, <br />
                        and now I'm currently working towards a CompTia Security+ certification.
                    </p>
                    <p>
                        Currently looking for positions as a software developer, software engineer, or cyber security analyst.<br />
                        Though I have no professional experience, I believe that my willingness and ability to learn<br />
                        and my problem solving skills developed from school and real life situations, <br />
                        will make me a great fit for any team or position.
                    </p>
                </Typography>
            </Grid>
            
            <Grid container alignItems="center">
                <Grid item xs={6} align="center">
                    <Typography component="h5" variant="h5">
                        Some links to find out more about me.
                    </Typography>
                    <Typography component="body1" variant="body1">
                        <p>
                            My LinkedIn profile: 
                            <Link href="https://www.linkedin.com/in/justin-day-192605164/" target="_blank" rel="noopener noreferrer" underline='hover'> LinkedIn</Link>
                        </p>
                        <p>
                            My gitHub with repo of classwork and personal projects: 
                            <Link href="https://github.com/Day-Justin" target="_blank" rel="noopener noreferrer" underline='hover'> GitHub</Link>
                        </p>
                    </Typography>
                    <Button to="/resume" component={ link } variant="outlined">See My Resume</Button>
                </Grid>

                <Grid item xs={6} align="center">
                    <Grid item xs={6} align="center">
                        <Typography component="h5" variant="h5">
                            My Contact information
                        </Typography>

                        <Typography component="body1" variant='body1'>
                            <p>
                                My Email (preferred): <br />
                                dayjustin.jd@gmail.com
                            </p>
                            <p>
                                My cell (Please try to text first): <br />
                                +1 (929) 444-0434 
                            </p>
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>
    );
}

export default About;