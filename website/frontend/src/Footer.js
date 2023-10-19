import React from 'react';
import {Grid, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import GitHubIcon from '@mui/icons-material/Github';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <div className='footer'>
            <Grid container>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3" color="white" >
                        Website
                    </Typography>
                </Grid>

                <Grid item xs={3} align="center">
                    <Typography variant="h5" component="h5" color="white" >
                        About
                    </Typography>

                    <Typography color="white" display="flex" justifyContent="center">
                        <List>
                            <ListItemButton to="#" component={Link}>
                                <ListItemText primary="Info" />
                            </ListItemButton>

                            <ListItemButton to="#" component={Link}>
                                <ListItemText primary="Resume" />
                            </ListItemButton>
                        </List>
                    </Typography>
                </Grid>

                <Grid item xs={3} align="center">
                    <Typography variant="h5" component="h5" color="white" >
                        Contact
                    </Typography>

                    <Typography color="white" display="flex" justifyContent="center">
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <MailOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="dayjustin.jd@gmail.com" />
                            </ListItem>
                            
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="+1 929-444-0434" />
                            </ListItem>
                        </List>
                    </Typography>
                </Grid>

                <Grid item xs={3} align="center">
                    <Typography variant="h5" component="h5" color="white" >
                        Apps On Site
                    </Typography>

                    <Typography color="white" display="flex" justifyContent="center">
                        <List>
                            <ListItemButton to="/music" component={Link}>
                                <ListItemText primary="Music" />
                            </ListItemButton>

                            <ListItemButton to="#" component={Link}>
                                <ListItemText primary="Billing" />
                            </ListItemButton>
                        </List>
                    </Typography>
                </Grid>

                <Grid item xs={3} align="center">
                    <Typography variant="h5" component="h5" color="white" >
                        Links
                    </Typography>

                    <Typography color="white" display="flex" justifyContent="center">
                        <List>
                            <ListItemButton href="gitHub" component="a">
                                <ListItemText primary="gitHub" />
                                <ListItemIcon>
                                    <GitHubIcon />
                                </ListItemIcon>
                            </ListItemButton>

                            <ListItemButton href="LinkedIn" component="a">
                                <ListItemText primary="LinkdIn" />
                                <ListItemIcon>
                                    <LinkedInIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Typography>
                </Grid>

            </Grid>
        </div>
    );
}

export default Footer;