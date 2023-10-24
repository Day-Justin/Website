import React, { useContext, useState } from "react";
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

function Group(){
    const { group, setGroup } = useContext(BillContext);
    const [add, setAdd] = useState(0);
    const [name, nameUpdate, nameReset] = useFormReset();

    const addMember = (member) =>{
        setGroup([...group, member]);
    }

    const handleAdd = () =>{
        const member = {
            id: add + 1,
            name: name,
            cost: 0,
        }

        addMember(member);
        setAdd(add + 1);
        nameReset();
    }

    const handleDelete = (member) =>{
        setGroup(group.filter((mem) => mem.id !== member.id));
        console.log(group);
    }

    return(
        <Grid container>
            <Grid item xs={12} align="center">
                <TextField 
                id="filled-basic" 
                label="Add member" 
                helperText="Add a (unique) member" 
                variant="outlined" 
                value={name}
                onChange={(ev) => nameUpdate(ev.target.value)}
                onKeyDown={((ev) => {(ev.key === "Enter" && name!== "") ? handleAdd() : undefined})}
                />
                <Tooltip title="add" placement="top-end">
                    <IconButton onClick={(name !== "") ? handleAdd : undefined}>
                        <AddBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
            </Grid>
            
            <Grid item xs={12} >
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {group.map((member, key) => {
                        return(
                            <Chip label={member.name} 
                                key={key}
                                variant="outlined" 
                                onClick={() => handleDelete(member)} />
                        );
                    })}
                </Stack>
            </Grid>

        </Grid>
    );
}

export default Group;