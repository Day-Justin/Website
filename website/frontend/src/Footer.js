import React from 'react';
import {Grid, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import GitHubIcon from '@mui/icons-material/Github';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FaceIcon from '@mui/icons-material/Face';
import ArticleIcon from '@mui/icons-material/Article';
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
                            <ListItemButton to="about/" component={Link}>
                                <ListItemText primary="About" />
                                <FaceIcon />
                            </ListItemButton>

                            <ListItemButton to="resume/" component={Link}>
                                <ListItemText primary="Resume" />
                                <ArticleIcon />
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
                                <MusicNoteIcon color="primary"/>
                            </ListItemButton>

                            <ListItemButton to="bill/" component={Link}>
                                <ListItemText primary="Split Bill" />
                                <ReceiptIcon />
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
                            <ListItemButton href="https://github.com/Day-Justin" target="_blank" rel="noopener noreferrer" component="a">
                                <ListItemText primary="gitHub" />
                                <ListItemIcon>
                                    <GitHubIcon />
                                </ListItemIcon>
                            </ListItemButton>

                            <ListItemButton href="https://www.linkedin.com/in/justin-day-192605164/" target="_blank" rel="noopener noreferrer" component="a">
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