import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Projj.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import BookIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Button } from '@material-ui/core';


const styles = theme => ({
    root: {
      color: theme.palette.text.primary,
      display: 'flex',
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
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
  });

function SimpleCard(props) {
    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;
    console.log("Simple Card");

    class PersistentDrawerLeft extends React.Component {
        state = {
          open: false,
        };
      
        handleDrawerOpen = () => {
          this.setState({ open: true });
        };
      
        handleDrawerClose = () => {
          this.setState({ open: false });
        };
      
        render() {
          const { classes, theme } = this.props;
          const { open } = this.state;
      
        return(
            <div className={classes.root}>
                <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    Persistent drawer
                    </Typography>
                </Toolbar>
                </AppBar>
                <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                </Drawer>
                <main>
                    <div class="first">
                        <Grid container spacing={40}>
                            <Button>
                                <Grid item>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <PersonIcon className={classes.icon} />
                                            <p id="name">users</p>
                                        </CardContent>
                                    </Card>        
                                </Grid>
                            </Button>
                            <Button>
                                <Grid item>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <GroupIcon className={classes.icon} />
                                            <p id="name">teacher</p>
                                        </CardContent>
                                    </Card>        
                                </Grid>
                            </Button>
                            <Button>
                                <Grid item>
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
                                <Grid item>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <BarChartIcon className={classes.icon} />
                                            <p id="name">attendence</p>
                                        </CardContent>
                                    </Card>        
                                </Grid>
                            </Button>
                            <Button>
                                <Grid item>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <AttachMoneyIcon className={classes.icon} />
                                            <p id="name">payment</p>
                                        </CardContent>
                                    </Card>        
                                </Grid>
                            </Button>
                            <Button>
                                <Grid item>
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
                </main>
            </div>    
        );
    }



SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(SimpleCard);