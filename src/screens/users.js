import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import '../users.css';
import '../Projj.css'
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 160
  },
  table: {
    minWidth: 500,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, birth, clazz, idnum, address, gol) {
  id += 1;
  return { id, name, birth, clazz, idnum, address, gol };
}

const rows = [
  createData('Student 1', '01/11/2002','XI-Science-10', 89182 , 'Jl. Sutomo No.32A', 'O'),
  createData('Student 2', '13/04/2002','XI-Science-09', 89183 , 'Jl. Sutomo No.32B', 'A'),
  createData('Student 3', '30/03/2002','XI-Science-11', 89184 , 'Jl. Sutomo No.32C', 'B'),
  createData('Student 4', '21/07/2002','XI-Science-12', 89185 , 'Jl. Sutomo No.32D', 'AB'),
  createData('Student 5', '12/05/2002','XI-Science-10', 89186 , 'Jl. Sutomo No.32E', 'A'),
  
];

function CustomizedTable(props) {
  const { classes } = props;

return (
  <div class='surface' id='surfaceuser'>
    <Paper className={classes.root} >
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <CustomTableCell>Student</CustomTableCell>
            <CustomTableCell align="center">Birth</CustomTableCell>
            <CustomTableCell align="center">Class</CustomTableCell>
            <CustomTableCell align="center">ID Number</CustomTableCell>
            <CustomTableCell align="center">Address</CustomTableCell>
            <CustomTableCell align="center">Gol.Darah</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.birth}</CustomTableCell>
              <CustomTableCell align="right">{row.clazz}</CustomTableCell>
              <CustomTableCell align="right">{row.idnum}</CustomTableCell>
              <CustomTableCell align="right">{row.address}</CustomTableCell>
              <CustomTableCell align="right">{row.gol}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <div class='button'>
      <a> <Button variant="contained" color="primary" className={classes.button} 
      component={Link} to="addusers">Add a student
      </Button></a>
    </div>
  </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);