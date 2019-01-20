import React, { Component } from 'react';
import '../Projj.css';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import BookIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import { Link } from "react-router-dom";


const styles = theme => ({
    root: {
      color: theme.palette.text.primary,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 70,
    },
    card: {
        minWidth: 300,
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

    const theme = createMuiTheme({
        palette: {
          //type: 'dark', // Switching the dark mode on is a single property value change.
          primary: blue,
          secondary: pink,
        },
        typography: { useNextVariants: true },
      });

//export default class Dashboard extends Component {
    //render() {
    function SimpleCard(props) {
        const { classes } = props;
        console.log("Simple Card");
        
        return (
            <MuiThemeProvider theme={theme}>
            <div id="main">
                <div class="first">
                    <Grid container spacing={40}>
                        <Button>
                            <Grid item component={Link} to="/users" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <PersonIcon className={classes.icon} />
                                        <p id="name">users</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/teacher" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <GroupIcon className={classes.icon} />
                                        <p id="name">teacher</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/courses" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <BookIcon className={classes.icon} />
                                        <p id="name">courses</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                    </Grid>
                </div>

                <div class="second">
                    <Grid container spacing={40}>
                        <Button>
                            <Grid item component={Link} to="/attendence" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <BarChartIcon className={classes.icon} />
                                        <p id="name">attendance</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/payment" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <AttachMoneyIcon className={classes.icon} />
                                        <p id="name">payment</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/feedback" class="dis-content">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <FeedbackIcon className={classes.icon} />
                                        <p id="name">feedback</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                    </Grid>
                </div>
            </div>
            </MuiThemeProvider>
        )        
    }


SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(SimpleCard);