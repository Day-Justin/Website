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
    ListItemIcon, 
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

function Fooditem(){
    const { group, items, setItems } = useContext(BillContext);
    const [name, nameUpdate, nameReset] = useFormReset();
    const [price, priceUpdate, priceReset] = useFormReset(0);
    const [openItemId, setOpenId] = useState([]);
    const [add, setAdd] = useState(0);


    const addItems = (item) =>{
        setItems([...items, item]);
    }

    const handleAdd = () =>{
        const item = {
            id: add + 1,
            name: name,
            price: price,
            members: [],
        }

        addItems(item);
        setAdd(add + 1)
        nameReset();
        priceReset();
    }

    const handleDelete = (item) =>{
        setItems(items.filter((it) => it.id !== item.id));
    }

    const handleExpand = (id) =>{
        openItemId.includes(id) ?
        setOpenId(openItemId.filter((itemId) => itemId !== id)): // close
        setOpenId([...openItemId, id]); // open
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
                inputProps={{ inputMode: 'numeric', pattern: '\d+(?:\.\d+)?' }}
                value={price}
                onChange={(ev) => priceUpdate(ev.target.value)}
                onKeyDown={((ev) => {(ev.key === "Enter" && name !== "" && price >= 0) ? handleAdd() : undefined})}
                />
                <Tooltip title="add" placement="top-end">
                    <IconButton onClick={(name !== "" && price >=0) ? handleAdd : undefined}>
                        <AddBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
            </Grid>

            <Grid item xs={12}>
                    {items.map((item, key) => {
                        return(
                            <List key={key} id={item.id} >
                                <ListItem>
                                <IconButton onClick={() => handleDelete(item)}>
                                        <DeleteIcon />
                                </IconButton>

                                <ListItemButton onClick={() =>{ handleExpand(item.id)}}>
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
                                                icon={<Checkbox />}
                                                variant="outlined" 
                                                onClick={() => handleDelete(member)} />
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