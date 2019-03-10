import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from '@material-ui/core/IconButton';
import { getUser } from '../libs/User';

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
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  card: {
    minWidth: 275,
    height: '95%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  componentDidMount() {
    getUser((user_list) => {
      // console.log(user_list);
      this.setState({
        user: user_list
      })
    });
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div id="msurface" className="surface">
        <Card className={classes.card} style={{paddingTop: '10px',paddingRight: '0px',paddingLeft: '0px'}}>
          <CardContent>
  
            <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '20px'}}>
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <Typography variant="h5" component="h3">Users</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="secondary" className={classes.button} component={Link} to="addusers">
                    add student
                  </Button>
                </Grid>
              </Grid>
            </div>
  
            <Paper className={classes.root}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <CustomTableCell align="center">Student</CustomTableCell>
                    <CustomTableCell align="center">Username</CustomTableCell>
                    <CustomTableCell align="center">Email</CustomTableCell>
                    <CustomTableCell align="center">Password</CustomTableCell>
                    <CustomTableCell align="center">Birthday</CustomTableCell>
                    <CustomTableCell align="center">Gender</CustomTableCell>
                    <CustomTableCell align="center">Phone Number</CustomTableCell>
                    <CustomTableCell align="center">Address</CustomTableCell>
                    <CustomTableCell align="center">School</CustomTableCell>
                  </TableRow>
                </TableHead>
  
                <TableBody>
                  {
                    this.state.user.map((item) => (
                      <TableRow>
                        <CustomTableCell align="center">{item.data.name}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.username}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.email}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.password}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.birthday}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.gender}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.phone}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.address}</CustomTableCell>
                        <CustomTableCell align="center">{item.data.school}</CustomTableCell>
                      </TableRow>
                    ))
                  }
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