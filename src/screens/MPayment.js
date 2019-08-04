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
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { getUserListByPermission } from '../libs/User';
import {getPayment} from '../libs/Payment'

const months = [
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
  button: {
  margin: theme.spacing.unit,
  width: 230,
  }, 
});

class SimpleTable extends Component  {
   constructor(props) {
    super(props);
    this.state = {
      user: [],
      searchResult: [],
      payment:[],
      page: 0,
      rowsPerPage:12,
      search : '',
      open: false,
      archive: false,
      openMenu: false,
      userLevelList: [100],
      anchor: null,
      checkedB: true,
    };
  }
    state = {
        user:'',
        month: '',
        payment:[],
        checkedB: true,
      }
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
          });
          
      };

      componentDidMount() {
        getUserListByPermission(this.state.userLevelList).then((user)  => {
          
          this.setState({
            user
          })
        });
      }

      componentDidMount() {
        //window.location.reload()
        getPayment((cou_list) => {
          this.setState({
            payment: cou_list
          })
        });
      }

    render(){
      const { payment } = this.state
      console.log(this.state.payment[0])
      const { user, rowsPerPage, page, searchResult } = this.state;
      let list=[]
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, user.length - page * rowsPerPage);
        const { classes } = this.props;
        return (
           <div id="msurface" className="surface">
            <Card>
                <CardContent>
                    <Table className={classes.table} style={{color:'gray'}}>
                        <TableRow><TableCell>Lesson :</TableCell></TableRow>
                        <TableRow><TableCell>Student :  
                        <TextField
                        style={{width: '17%'}}
                        select
                        value={this.state.month}
                        onChange={this.handleChange('month')}>
                        {user.map(option => (
                        <MenuItem key={option.data.email} value={option.data.name}>
                            {option.data.name}
                        </MenuItem>
                        ))}  </TextField> </TableCell>
                        </TableRow>
                    </Table>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell align='left' width="7%">No</TableCell>
                                <TableCell align="left">Month</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Note</TableCell>
                            </TableRow>
                            
                            </TableHead>
                            <TableBody>
                            
                            {months.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index)=>(
                              <TableRow>
                              <TableCell>{page * 10 + index + 1}</TableCell>

                              <TableCell align="left" >   
                               {months[index].value}                        
                              </TableCell>
                              
                              <TableCell>
                                  <Switch
                                  style={{paddingLeft:'-20px'}}
                                  onChange={this.handleChange('checkedB')}
                                  value={this.state.checkedB}
                                  color="primary"
                                  />                                             
                              </TableCell>
                              </TableRow>
                            ))}
                              
                            </TableBody>
                        </Table>
                        <div> 
                          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen} >
                          save
                          </Button>
                          <Button variant="outlined" className={classes.button} component={Link} to="/dashboard">cancel</Button>
                        </div>
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

