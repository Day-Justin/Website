import React, { useContext } from "react";
import { BillContext } from "./Bill";
import { useFormReset } from "../Customhooks/useFormReset"; // custom hook to reset forms to inital value
import { 
    Tooltip, 
    IconButton,
    TextField,
    Chip, Stack,
    Grid, 
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

function Fooditem(){
    const { items, setItems } = useContext(BillContext);
    const [name, nameUpdate, nameReset] = useFormReset();
    const [price, priceUpdate, priceReset] = useFormReset(0);

    const addItems = (item) =>{
        setItems([...items, item]);
    }

    const handleAdd = () =>{
        var id = items.length + 1;
        var item = {
            id: id,
            name: name,
            price: 0,
            members: [],
        }

        addItems(item);
        nameReset();
        priceReset();
    }

    const handleDelete = (item) =>{
        setItems(items.filter((it) => it.id !== item.id));
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
                onKeyDown={((ev) => {(ev.key === "Enter" && name !== "" && price !== 0) ? handleAdd() : undefined})}
                />
                <TextField 
                id="filled-basic" 
                label="Price" 
                helperText="And the total price" 
                variant="outlined" 
                value={price}
                onChange={(ev) => priceUpdate(ev.target.value)}
                onKeyDown={((ev) => {(ev.key === "Enter" && name !== "" && price !== 0) ? handleAdd() : undefined})}
                />
                <Tooltip title="add" placement="top-end">
                    <IconButton onClick={(name !== "") ? handleAdd : undefined}>
                        <AddBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
            </Grid>

            <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                    {items.map((item, key) => {
                        return(
                            <Chip label={item.name} 
                                key={key}
                                variant="outlined" 
                                onDelete={() => handleDelete(item)} />
                        );
                    })}
                </Stack>
            </Grid>

        </Grid>
    );
}

export default Fooditem;