import React from 'react';
import '../Projj.css';
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
function Dashboard(props) {
    const { classes } = props;
    //console.log("Simple Card");
    
    return (
        <MuiThemeProvider theme={theme}>
        <div id="main">
            <div className="first">
                <Grid container spacing={40}>
                    <Button component={Link} to="/users" lg={4} xs={12}>
                        <Grid item className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
                                    <PersonIcon className={classes.icon} />
                                    <p id="name">users</p>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Button>
                    <Button component={Link} to="/teacher" lg={4} xs={12}>
                        <Grid item className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
                                    <GroupIcon className={classes.icon} />
                                    <p id="name">teacher</p>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Button>
                    <Button component={Link} to="/courses" lg={4} xs={12}>
                        <Grid item className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
                                    <BookIcon className={classes.icon} />
                                    <p id="name">courses</p>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Button>
                    <Button component={Link} to="/attendance" lg={4} xs={12}>
                        <Grid item  className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
                                    <BarChartIcon className={classes.icon} />
                                    <p id="name">attendance</p>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Button>
                    <Button component={Link} to="/payment" lg={4} xs={12}>
                        <Grid item className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
                                    <AttachMoneyIcon className={classes.icon} />
                                    <p id="name">payment</p>
                                </CardContent>
                            </Card>        
                        </Grid>
                    </Button>
                    <Button component={Link} to="/feedback" lg={4} xs={12}>
                        <Grid item className="dis-content">
                            <Card className={classes.card}>
                                <CardContent align='center'>
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


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(Dashboard);