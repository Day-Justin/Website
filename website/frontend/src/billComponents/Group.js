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

function Group(){
    const { group, setGroup } = useContext(BillContext);
    const [name, nameUpdate, nameReset] = useFormReset();

    const addMember = (member) =>{
        setGroup([...group, member]);
    }

    const handleAdd = () =>{
        var id = group.length + 1;
        var member = {
            id: id,
            name: name,
            cost: 0,
        }

        addMember(member);
        nameReset();
    }

    const handleDelete = (member) =>{
        setGroup(group.filter((mem) => mem.id !== member.id));
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
            
            <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                    {group.map((member, key) => {
                        return(
                            <Chip label={member.name} 
                                key={key}
                                variant="outlined" 
                                onDelete={() => handleDelete(member)} />
                        );
                    })}
                </Stack>
            </Grid>

        </Grid>
    );
}

export default Group;