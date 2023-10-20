import React, {useState, useEffect} from 'react';
import { 
    Button, 
    Grid, 
    Typography, 
    TextField, 
    FormHelperText, FormControlLabel, FormControl, FormLabel, 
    Radio, RadioGroup, 
    Collapse, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Fooditem from './Fooditem';
import Groupmember from './Groupmember';
import { useQuery } from '@tanstack/react-query';

function Bill(){
    

    const [groupMember, setMember] = useState("")
    const [group, setGroup] = useState([]);
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);

    const handleMemberChange = (event) =>{
        setMember(event.target.value);
    }
    
    const addMember = () =>{
        const newGroup = [...group, groupMember];
        setGroup(newGroup);
    }

    const removeMember = (e) =>{
        setGroup(group.filter((name) => name !== e));
    }

    handleItemChange = (event) =>{
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
        <Grid container>
            <Grid item xs={12} align="center">
                <Typography component="h3" variant="h3">
                    Splitting the Bill
                </Typography>
            </Grid>
            

        </Grid>
    );
}

export default Bill;