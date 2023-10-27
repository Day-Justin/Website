import React, {useState, createContext} from 'react';
import { useFormReset, useGetApi } from '../Customhooks/useFormReset';
import { 
    Button, 
    Stack,
    Grid, 
    Switch,
    Collapse,
    Typography, 
    TextField, InputAdornment,
    List, ListItem, ListItemText} from '@mui/material';
import { Link } from 'react-router-dom';
import Food from './Food';
import Group from './Group';
import Receipt from './Recipt';
import Split from './Split';
//import Receipt from '@mui/icons-material/Receipt';

export const BillContext = createContext();

function Bill(){

    const [group, setGroup] = useState([]);
    const [items, setItems] = useState([]);
    const [showDiscount, setShowDiscount] = useState(false);
    const [showTip, setShowTip] = useState(false);
    const [discount, discountUpdate, discountReset] = useFormReset();
    const [tip, tipUpdate, tipReset] = useFormReset();
    const [tax, taxUpdate, taxReset] = useFormReset();
    const [total, setTotal] = useState(0);

    const handleReset = () => {
        setGroup([]);
        setItems([]);
        setShowDiscount(false);
        setShowTip(false)
        discountReset();
        tipReset();
        taxReset();
    }
    
    const handleDiscountChange = (ev) =>{
        const re = /^[0-9]*[.,]?[0-9]*$/;
    
        if (re.test(ev.target.value)) {
            if(ev.target.value >= 0 && ev.target.value<= 100){
           discountUpdate(ev.target.value)
            }
        }
    }
    const handleTipChange = (ev) =>{
        const re = /^[0-9]*[.,]?[0-9]*$/;
    
        if (re.test(ev.target.value)) {
            if(ev.target.value >= 0 && ev.target.value<= 100){
                tipUpdate(ev.target.value)
            }
        }
    }
    const handleTaxChange = (ev) =>{
        const re = /^[0-9]*[.,]?[0-9]*$/;
    
        if (re.test(ev.target.value)) {
            if(ev.target.value >= 0 && ev.target.value<= 100){
                taxUpdate(ev.target.value)
            }
        }
    }

    return (
        <BillContext.Provider value={{  
            group, setGroup, 
            items, setItems, 
            total, setTotal,
            }}>
            <Grid container>
                <Grid item xs={12} align="center">
                    <Typography component="h3" variant="h3">
                        Splitting the Bill
                    </Typography>
                    <Typography component="h5" variant="h5">
                        Simple page to help you split the dinning bill amongst friends
                    </Typography>
                    <div style={{ padding: "20px" }} />
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
                            <Stack direction="column" spacing={1}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText id="discount" primary="Discounts?" />
                                        <Switch 
                                            edge="end"
                                            onChange={() => setShowDiscount(!showDiscount)}
                                            checked={showDiscount}
                                        />
                                    </ListItem>
                                    <Collapse in={showDiscount} timeout="auto" unmountOnExit>
                                        <TextField 
                                            id="filled-basic" 
                                            label="Discount"
                                            helperText="By percent" 
                                            variant="outlined" 
                                            sx={{ m: 1, width: '15ch'}}
                                            inputProps={{ inputMode: 'numeric', pattern: '\d+(?:\.\d+)?' }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                                             }}                            
                                            value={discount}
                                            onChange={handleDiscountChange}
                                        />
                                    </Collapse>

                                    <TextField 
                                    id="filled-basic" 
                                    label="Tax Rate" 
                                    helperText="By percent" 
                                    variant="outlined" 
                                    sx={{ m: 1, width: '15ch'}}
                                    inputProps={{ inputMode: 'numeric', pattern: '\d+(?:\.\d+)?' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                                     }}                            
                                    value={tax}
                                    onChange={handleTaxChange}
                                />

                                    <ListItem>
                                        <ListItemText id="tips" primary="Tips?" />
                                        <Switch 
                                            edge="end"
                                            onChange={() => setShowTip(!showTip)}
                                            checked={showTip}
                                        />
                                    </ListItem>
                                    <Collapse in={showTip} timeout="auto" unmountOnExit>
                                        <TextField 
                                            id="filled-basic" 
                                            label="Tips" 
                                            helperText="By percent" 
                                            variant="outlined" 
                                            sx={{ m: 1, width: '15ch'}}
                                            inputProps={{ inputMode: 'numeric', pattern: '\d+(?:\.\d+)?' }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                                             }}                            
                                            value={tip}
                                            onChange={handleTipChange}
                                        />
                                    </Collapse>

                                </List>
                                
                            </Stack>
                        </Grid>
                        
                        <Grid item xs={3} align="center">           
                                <div style={{ padding: "20px" }}>
                                    <Button variant="outlined" color="primary" onClick={handleReset}>
                                        RESET
                                    </Button>
                                </div>
                        </Grid>

                        <Grid item xs={3} align="center">
                            
                        </Grid>


                    </Grid>
                </Grid>

                <Grid item xs={6} >
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12} className="receipt">
                            <Receipt
                            discount={discount}
                            showdiscount={showDiscount.toString()}
                            tip={tip}
                            showtip={showTip.toString()}
                            tax={tax}
                            />
                        </Grid>
                        
                        <Grid item xs={12} className="split" alignItems="center">
                        <div style={{ padding: "20px" }} />
                            <Split 
                                discount={discount}
                                showdiscount={showDiscount.toString()}
                                tip={tip}
                                showtip={showTip.toString()}
                                tax={tax}
                            />
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        </BillContext.Provider>
    );
}

export default Bill;