import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const month = [
    {
      value: 'January',
      label: 'January',
    },
    {
      value: 'Febuary',
      label: 'Febuary',
    },
    {
      value: 'March',
      label: 'March',
    },
    {
      value: 'April',
      label: 'April',
    },
    {
      value: 'May',
      label: 'May',
    },
    {
      value: 'June',
      label: 'June',
    },
    {
      value: 'July',
      label: 'July',
    },
    {
      value: 'August',
      label: 'August',
    },
    {
      value: 'September',
      label: 'September',
    },
    {
      value: 'October',
      label: 'October',
    },
    {
      value: 'November',
      label: 'November',
    },
    {
      value: 'December',
      label: 'December',
    },

  ];




const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class MPayment extends Component  {
    constructor(props){
        super(props)
    }
    handleChange = month => event => {
        this.setState({
          [month]: event.target.value,
          });
      };
      state = {
        month: '',
      }
    render(){
        const { classes } = this.props;
        return (
            <div id="msurface" className="surface">
            <Card>
                <CardContent>
                    <Table className={classes.table} style={{color:'gray'}}>
                        <TableRow><TableCell>Lesson :</TableCell></TableRow>
                        <TableRow><TableCell>Teacher :</TableCell></TableRow>
                        <TableRow><TableCell>Month :  
                        <TextField
                        style={{width: '17%'}}
                        select
                        value={this.state.month}
                        onChange={this.handleChange('month')}>
                        {month.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}  </TextField> </TableCell>
                        </TableRow>
                    </Table>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell align='left'>No</TableCell>
                                <TableCell align="left">Student</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Note</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell align='left'>No</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </CardContent>
            </Card>
            </div>
        );
    }
}

MPayment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MPayment);

