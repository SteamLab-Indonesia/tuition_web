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
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { styles, theme } from '../styles';

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
                            <Grid item component={Link} to="/users" class="dis-content" lg={4} xs={12}>
                                <Card className={classes.card} >
                                    <CardContent>
                                        <PersonIcon className={classes.icon} />
                                        <p id="name">users</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/teacher" class="dis-content" lg={4} xs={12}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <GroupIcon className={classes.icon} />
                                        <p id="name">teacher</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/courses" class="dis-content" lg={4} xs={12}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <BookIcon className={classes.icon} />
                                        <p id="name">courses</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                    {/* </Grid>
                </div>

                <div class="second">
                    <Grid container spacing={40}> */}
                        <Button>
                            <Grid item component={Link} to="/attendance" class="dis-content" lg={4} xs={12}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <BarChartIcon className={classes.icon} />
                                        <p id="name">attendance</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/payment" class="dis-content" lg={4} xs={12}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <AttachMoneyIcon className={classes.icon} />
                                        <p id="name">payment</p>
                                    </CardContent>
                                </Card>        
                            </Grid>
                        </Button>
                        <Button>
                            <Grid item component={Link} to="/feedback" class="dis-content" lg={4} xs={12}>
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