import React, { useContext, useState, useEffect} from "react";
import { BillContext } from "./Bill";
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'


function Receipt(props){
    const {  items, total, setTotal } = useContext(BillContext);
    const [subTotal, setSubTotal] = useState(0);
    const [withDiscount, setWithDiscount] = useState(0);
    const [withTax, setWithTax] = useState(0);
    const [withTip, setWithTip] = useState(0);
    const [rows, setRows] = useState([]);

    const createData = (category, amount, total) =>{
        return { category, amount, total}
    }

    const setUp = () => {
        let subttl = 0;
        items.map((item) => subttl += item.price);
        setSubTotal(subttl);
    }

    useEffect(() =>{
        setWithDiscount(
            (props.discount === 0 || props.showdiscount === 'false') ?
            subTotal :
            subTotal * (1-(props.discount*.01))
        );
    }, [subTotal, props.showdiscount, props.discount])

    useEffect(() => {
        setWithTax(
            (props.tax === 0) ?
            withDiscount :
            withDiscount * (1+(props.tax*.01))
        );
    }, [withDiscount, props.tax])

    useEffect(() => {
        setWithTip(
            (props.tip === 0 || props.showtip === 'false') ?
            withTax :
            withTax * (1+(props.tip*.01))
        );
    }, [withTax, props.showtip, props.tip])

    useEffect(() => {
        setTotal(
            withTip
        )

    }, [withTip])
    
    useEffect(() => {
    setRows([
        createData("subtotal", `\$ ${subTotal}`, subTotal.toFixed(2)),
        createData("Discount", `${props.discount*(props.showdiscount === 'true' ? 1 : 0)}%`, withDiscount.toFixed(2)),
        createData("Tax", `${props.tax ==='' ? 0 : props.tax}%`, withTax.toFixed(2)),
        createData("Tips", `${props.tip*(props.showtip === 'true' ? 1 : 0)}%`, withTip.toFixed(2)),
        createData("total","", total.toFixed(2)),
    ]);

    }, [total])


    useEffect(() => {
        setUp()
    }, [items])


    if(items.length == 0){
        return(<div></div>)
    }else{
    return(
        <div>
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Reciept</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Total ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) =>{
                        return(
                            <TableRow
                            key={row.category}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.category}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>

                        );
                    })}
                </TableBody>

            </Table>
        </TableContainer>
        </div>
    );}
}

export default Receipt;