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
import Switch from '@material-ui/core/Switch';

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

class MAttendance extends Component  {
    constructor(props){
        super(props)
    }

    state = {
        checkedA: true,
        checkedB: true,
      };
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render(){
        const { classes } = this.props;
        console.log(this.state.checkedB)
        return (
            <div id="msurface" className="surface">
            <Card>
                <CardContent>
                    <Table className={classes.table} style={{color:'gray'}}>
                        <TableRow><TableCell>Courses :</TableCell></TableRow>
                        <TableRow><TableCell>Lessons :</TableCell></TableRow>
                        <TableRow><TableCell>Teacher :</TableCell></TableRow>
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
                                        checked={this.state.checkedB}
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

MAttendance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MAttendance);

