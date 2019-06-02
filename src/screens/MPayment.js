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
import Switch from '@material-ui/core/Switch';
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

class SimpleTable extends Component  {
    constructor(props){
        super(props)
    }
      state = {
        month: '',
        checkedB: true,
      }
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
          });
      };
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
                            
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Switch
                                        style={{paddingLeft:'-20px'}}
                                        onChange={this.handleChange('checkedB')}
                                        value={this.state.checkedB}
                                        color="primary"
                                        />                                                      
                                    </TableCell>
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

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

