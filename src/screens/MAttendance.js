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
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
      overflowX: 'auto',
      flexGrow: 1,    
    },
    card: {
      minWidth: 275,
      height: window.innerHeight
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    input: {
      marginLeft: 8,
      flex: 1,
      
    },
    iconButton: {
      padding: 7,
    },
  });

class MAttendance extends Component  {

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
            <Card className={classes.card} style={{paddingTop: '10px'}}>
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h3" style={{paddingLeft:10}}>
                                Attendance
                            </Typography>
                            <br/>
                            <Typography style={{paddingLeft:30,color:"grey",fontSize:20}}>
                                Courses :
                                    <TextField 
                                        placeholder=" Select the course"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Teacher :
                                    <TextField 
                                        placeholder=" Enter your name"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Lesson :
                                    <TextField 
                                        placeholder=" Select the lesson"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Date :
                                    <TextField 
                                        placeholder=" Select the date"
                                        style={{paddingLeft:10,paddingBottom:40}}
                                    >
                                            
                                    </TextField>
                                <br/>
                            </Typography>
                            <Paper className={classes.root} style={{width:"96%",marginLeft:18}}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" style={{width:"10%"}}>No.</TableCell>
                                            <TableCell align="center" >Name</TableCell>
                                            <TableCell align="center" >Status</TableCell>                    
                                            <TableCell align="center" >Note</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table> 
                            </Paper>
                        </Grid>
                    </Grid>
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

