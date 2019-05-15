/**
*
* SimpleTable
*
*/

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './style.scss';

function SimpleTable(props) {
    return (
        <Paper>
            <Table className="simpleTable-table-element">
                <TableHead className="simpleTable-tableHead">
                    <TableRow className="simpleTable-tableRow" style={{ textTransform: 'capitalize' }}>
                        {props.config.map((column, index) => <TableCell key={index} className="simpleTable-tableCell" align={column.align || 'left'}>{column.key}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody className="simpleTable-tableBody">
                    {props.data.map((rowData, index) => (
                        <TableRow key={index} className="simpleTable-tableRow">
                            {props.config.map((column, index2) => (
                                <TableCell
                                    className="simpleTable-tableCell"
                                    key={index2}
                                    align={column.align || 'left'}
                                >{rowData[column.key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {

};

export default SimpleTable;
