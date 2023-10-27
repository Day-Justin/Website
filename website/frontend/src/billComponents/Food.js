import React, { useContext, useState} from "react";
import { BillContext } from "./Bill";
import { useFormReset } from "../Customhooks/useFormReset"; // custom hook to reset forms to inital value
import { 
    Tooltip, 
    IconButton,
    TextField,
    Grid, 
    Checkbox,
    Chip, Stack,
    ListItemText, List, ListItem,
    Collapse,
    ListItemButton,
    InputAdornment,
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

function Fooditem(){
    const { group, items, setItems } = useContext(BillContext);
    const [name, nameUpdate, nameReset] = useFormReset();
    const [price, priceUpdate, priceReset] = useFormReset();
    const [openItemId, setOpenId] = useState([]);
    const [add, setAdd] = useState(0);


    const addItems = (item) =>{
        setItems([...items, item]);
    }

    const handlePriceChange = (ev) =>{
        const re = /^[0-9]*[.,]?[0-9]*$/;
    
        if (re.test(ev.target.value)) {
            if(ev.target.value >= 0){
           priceUpdate(ev.target.value)
            }
        }
    }

    const handleAdd = () =>{
        const item = {
            id: add + 1,
            name: name,
            price: Number(price),
            members: [],
        }

        addItems(item);
        setAdd(add + 1);
        nameReset();
        priceReset();
        setOpenId([...openItemId, item.id]);
    }

    const handleDelete = (item) =>{
        setItems(items.filter((it) => it.id !== item.id));
        setOpenId(openItemId.filter((itemId) => itemId !== item.id))
    }

    const handleExpand = (id) =>{
        openItemId.includes(id) ?
        setOpenId(openItemId.filter((itemId) => itemId !== id)): // close
        setOpenId([...openItemId, id]); // open
    }

    const handleCheck = (itemId, memberId) => {
        var newItems = items;
        var item = newItems.filter((it) => it.id === itemId)[0];
        if(item.members.includes(memberId)){ // if include, remove, else add
            item.members = item.members.filter((id) => id !== memberId);
            newItems = newItems.filter((it) => it.id !== itemId);
            newItems = [...newItems, item]
            setItems(newItems);
        }else{
            item.members = [...item.members, memberId];
            newItems = newItems.filter((it) => it.id !== itemId);
            newItems = [...newItems, item]
            setItems(newItems);
        };
    }
    
    return(
        <Grid container>
            <Grid item xs={12} align="center">
                <TextField 
                id="filled-basic" 
                label="Add Food Item" 
                helperText="Add a Item from your bill" 
                variant="outlined" 
                value={name}
                onChange={(ev) => nameUpdate(ev.target.value)}
                onKeyDown={((ev) => {(ev.key === "Enter" && name !== "" && price >= 0) ? handleAdd() : undefined})}
                />
                <TextField 
                id="filled-basic" 
                label="Price" 
                helperText="And the total price" 
                variant="outlined" 
                inputProps={{ 
                    inputMode: 'numeric', 
                    pattern: '\d+(?:\.\d+)?',
                }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                value={price}
                onChange={handlePriceChange}
                onKeyDown={((ev) => {(ev.key === "Enter" && name !== "" && price > 0) ? handleAdd() : undefined})}
                />
                <Tooltip title="add" placement="top-end">
                    <IconButton onClick={(name !== "" && price > 0) ? handleAdd : undefined}>
                        <AddBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
            </Grid>

            <Grid item xs={12}>
                    {items.sort((a, b) => a.id > b.id ? 1 : -1)
                    .map((item, key) => {
                        return(
                            <List key={key} id={item.id} dense>
                                <ListItem>
                                <IconButton onClick={() => handleDelete(item)}>
                                        <DeleteIcon />
                                </IconButton>

                                <ListItemButton onClick={() => handleExpand(item.id)}>
                                    <ListItemText primary={item.name} secondary={`\$${item.price}`} />
                                    {openItemId.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                </ListItem>

                                <Collapse in={openItemId.includes(item.id)} timeout="auto" unmountOnExit>
                                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                        {group.map((member, value) => {
                                            return (
                                                <Chip 
                                                label={member.name} 
                                                key={value}
                                                icon={<Checkbox checked={items.filter((it) => it.id === item.id)[0].members.includes(member.id)} />}
                                                variant="outlined" 
                                                onClick={() => handleCheck(item.id, member.id)} />
                                            );
                                        })}
                                    </Stack>
                                </Collapse>

                            </List>
                        );
                    })}

            </Grid>

        </Grid>
    );
}

export default Fooditem;