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

function Split(props){
    const { items, group } = useContext(BillContext);
    const [rows, setRows] = useState([]);
    const [reset, setReset] = useState(false);

    const setUp = () => {
        var total;
        var splits;
        var rowS = [];
        

        group.map((member) => {
            splits = [];

            items.map((item) => {
                if(item.members.includes(member.id)){
                    var itemSplit = item.price/item.members.length;
                    if(props.showdiscount === 'true' && props.discount > 0){
                        itemSplit = itemSplit*(1-(props.discount*.01))
                    }
                    if(props.tax > 0){
                        itemSplit = itemSplit*(1+(props.tax*.01))
                    }
                    if(props.showtip === 'true' && props.tip > 0){
                        itemSplit = itemSplit*(1+(props.tip*.01))
                    }

                    splits = [...splits, itemSplit]
                } else {
                    splits = [...splits, 0]
                }
            })

            total = splits.reduce((a,v) => a = a + v, 0)

            rowS = [...rowS, { total: total, member: member, splits: splits }]

        })
        setRows(rowS)
    }

    useEffect(() => {
        setRows([]);
        setReset(!reset);
    }, [
        group, 
        items, 
        props.showdiscount, props.discount, 
        props.showtip, props.tip,
        props.tax,
        ]
    )

    useEffect(() => {
        setUp();
    }, [reset])


    if(items.length == 0){
        return(<div></div>)
    }else{
    return(
        <Paper sx={{ width: '100%', overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Total ($)</TableCell>
                        <TableCell>Name</TableCell>
                        {items.map((item) => {
                            return(
                                <TableCell>{item.name}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, key) => {
                        return(
                            <TableRow 
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.total.toFixed(2)}
                                </TableCell>
                                <TableCell align="center">{row.member.name}</TableCell>
                                {
                                    row.splits.map((split, value) => {
                                        return(
                                            <TableCell key={value} align="right">{split.toFixed(2)}</TableCell>
                                        )
                                    })
                                }

                            </TableRow>
                        )
                    })}
                    <TableRow 
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{rows.reduce((a,v) => a = a + v.total, 0).toFixed(2)}</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>

                </TableBody>

                </Table>
            </TableContainer>
        </Paper>
    );
    }
}

export default Split;