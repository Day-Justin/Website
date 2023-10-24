import React, {useState, createContext} from 'react';
import { 
    Button, 
    Grid, 
    Typography, 
    TextField, 
    FormHelperText, FormControlLabel, FormControl, FormLabel, 
    Radio, RadioGroup, 
    Collapse, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Food from './Food';
import Group from './Group';
import { useQuery } from '@tanstack/react-query';

export const BillContext = createContext();

function Bill(){

    const [group, setGroup] = useState([]);
    const [item, setItem] = useState({});
    const [items, setItems] = useState([]);
    
    const removeMember = (e) =>{
        setGroup(group.filter((name) => name !== e));
    }

    const handleItemChange = (event) =>{
        setItem(event.target.value);
    }

    const addItem = () =>{
        const newItems = [...items, item];
        setItems(newItems);
    }

    const deleteItem = (e) =>{
        setItems(items.filter((name) => name !== e));
    }

    /*
        <input onChange={handleXchange}
        <button onClick={addX}
        
        ...

        <list/
        {listX.map}
        return 
            x
                button onclick{() => deleteX(x)}

                props --> delete={deleteX}
                in comp --> onclick props.delete(x)
    */

    return (
        <BillContext.Provider value={{  
            group, setGroup, 
            items, setItems, 
            }}>
            <Grid container>
                <Grid item xs={12} align="center">
                    <Typography component="h3" variant="h3">
                        Splitting the Bill
                    </Typography>
                    <Typography component="h5" variant="h5">
                        Simple page to help you split the dinning bill amongst friends
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={3} align="center">
                            <Group />
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Food />
                        </Grid>
                        <Grid item xs={3} align="center">
                            3
                        </Grid>
                        <Grid item xs={3} align="center">
                            4
                        </Grid>

                        <Grid item xs={3} align="center">
                            
                        </Grid>


                    </Grid>
                </Grid>

            </Grid>
        </BillContext.Provider>
    );
}

export default Bill;