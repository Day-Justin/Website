import React from 'react'
import { useToggle } from './../Customhooks/useToggle';
import { useGetApi } from '../Customhooks/useGetApi';
import { Link as link } from 'react-router-dom';
import {
    Grid, Typography, Box,
    Button, Link,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PetsIcon from '@mui/icons-material/Pets';

function Homepage(){
    const [catFact, toggle] = useToggle();
    const [catData, catRefetch] = useGetApi('https://catfact.ninja/fact', ["cat"]);

    return(
        <Grid container alignItems="cener">
            <Grid item xs={12} align="center">
                <Typography component="h1" variant='h1'>
                    Homepage
                </Typography>

                <Typography component="h4" variant='h4'>
                    Welcome to my website. Below you'll find some useful links.
                </Typography>

            </Grid>

            <Grid container alignItems="center">
                <Grid item xs={6} align="center" alignContent="center" >
                    <Typography component="h5" variant='h5'>
                        Some information about me, and a resume.
                    </Typography>
                    
                    <Typography component="h6" variant='h6'>
                        <p>Info on me:  <Link to="about/" component={ link } underline="hover">  About Me</Link></p>
                        <p> My resume:  <Link to="resume/" component={ link } underline="hover">  My Resume</Link> </p>
                        <p>
                            Check out the source code for this website:
                            <Link href="https://github.com/Day-Justin/Website" target="_blank" rel="noopener noreferrer" underline='hover'> Source code</Link>
                        </p>

                    </Typography>

                </Grid>

                <Grid item xs={6} align="center">
                    <Typography component='h5' variant='h5'>
                        Some projects that are hosted on this site
                    </Typography>

                    <Typography component="h6" variant="h6" sx={{ wordBreak: "break-word" }}>
                            <p><Link to="music/" component={ link } underline='hover'>Music room Home</Link></p>
                            <p>
                                A room for music playing where guest have limited control over the host's music.<br />
                                Tried using spotify as music player but the spotify api isn't really friendly for small/home devs.<br />
                                Looking to try youtube next.<br />
                            </p>
                            <p><Link to="bill/" component={ link } underline='hover'>Split the dinner Bill</Link></p>
                            <p>
                                A interactive page that will help you split the bills amongst others.<br />
                                Just put in some names and then items with total price.<br />
                                Takes into account things like if there was a discount or any tipping.<br />
                                But there is always taxes.<br />
                            </p>
                    </Typography>

                </Grid>

            </Grid>

            <Grid item xs={12} align="center">
                <Typography component="h4" variant='h4'>Get a cat fact</Typography>
                <Button 
                    onClick={toggle} 
                    variant="outlined" 
                    endIcon={
                        catFact ?
                        <VisibilityIcon /> : 
                        <VisibilityOffIcon />
                    }
                >
                    {catFact ? "Hide Cat Facts" : "Show Cat Facts"}
                </Button>
                {catFact && 
                    <div>
                        <p>{catData?.fact}</p>
                        <Button onClick={catRefetch} endIcon={<PetsIcon />}>Get Another</Button>
                    </div>
                }
            </Grid>

        </Grid>
    );
}

export default Homepage;