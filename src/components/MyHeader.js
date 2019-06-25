import React, {Component} from 'react';
import '../Projj.css';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import ClassroomIcon from '@material-ui/icons/MeetingRoom';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getCurrentUser, userLogout } from '../libs/User';
import { Redirect } from 'react-router-dom';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
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
        // marginLeft: 12,
        // marginRight: 20,
        marginRight: theme.spacing.unit * 2,
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

    const gtheme = createMuiTheme({
      palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
      },
      typography: { useNextVariants: true },
    });

class MyHeader extends Component {

    state = {
        open: false,
        logout: false,
        openMenu: false
      };
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
        if (this.props.updateDrawerState)
          this.props.updateDrawerState(true);
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
        if (this.props.updateDrawerState)
          this.props.updateDrawerState(false);
      };

      clickAccount = (e) => {
        this.setState({openMenu: true, anchor: e.currentTarget});
      }
      closeAccount = () => {
        this.setState({openMenu: false, anchor: null});
      }
      onLogout = () => {
        userLogout().then((status) => {
          this.setState({logout: true});
        })
        .catch((err) => {
          console.log(err);
        })
      }

      render() {        
        const { classes, theme } = this.props;
        const { open, logout } = this.state;
        const user = getCurrentUser();
        if (logout)
        {
          return (
            <Redirect to="/login" />
          );
        }
        else
        {
          if (this.props.show)
          {
            return(
              <div className={classes.root}>
                  <CssBaseline />
                    <MuiThemeProvider theme={gtheme}>
                        <AppBar
                            position="fixed"
                            className={classNames(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}
                            color="primary"
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
                        <Grid item xs={2}>
                          <Typography variant="h6" color="inherit" noWrap component={ Link } to='/dashboard' id="title">
                          STEAM LAB 
                          </Typography>
                        </Grid>
                        <Grid item xs={10} style={{width: '90%'}}>
                          <Grid container
                            direction="row"
                            justify="flex-end"
                          >
                            <Grid item xs={3}>
                              {
                                user ? (
                                  <>
                                    <Button 
                                      aria-controls="simple-menu" aria-haspopup="true"
                                      onClick={this.clickAccount}>
                                      {user.email}
                                    </Button>
                                    <Menu
                                      anchorEl={this.state.anchor}
                                      keepMounted
                                      open={this.state.openMenu}
                                      onClose={this.closeAccount}
                                    >
                                      <MenuItem style={{width: '140px'}} onClick={this.onLogout}>Logout</MenuItem>
                                    </Menu>
                                  </>
                                ) : (
                                  <Button color="inherit" component={ Link } to='/login' id="Login">
                                    Login
                                  </Button>
                                )
                              }                         
                            </Grid>
                          </Grid>
                        </Grid>
                    </Toolbar>
                    </AppBar>
                  </MuiThemeProvider>
                  <MuiThemeProvider theme={gtheme}>            
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
                      {/* <ListItem button key="Student">
                          <ListItemIcon><PersonIcon /></ListItemIcon>
                          <ListItemText primary="Student" />
                      </ListItem>
                      <ListItem button key="Teacher">
                          <ListItemIcon><GroupIcon /></ListItemIcon>
                          <ListItemText primary="Teacher" />
                      </ListItem> */}
                      {[{text: 'Users',icon: <PersonIcon />,link: '/users'},
                      {text: 'Teacher',icon: <GroupIcon />,link: '/teacher'},
                      {text: 'Classroom',icon: <ClassroomIcon />,link: '/classroom'},
                      {text: 'Courses',icon: <AssignmentIcon />,link: '/courses'},
                      {text: 'Attendance',icon: <BarChartIcon />,link: '/attendance'},
                      {text: 'Payment',icon: <AttachMoneyIcon />,link: '/payment'},
                      ].map((item, index) => (
                          <ListItem button key={item.text} component={ Link } to={item.link}>
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText>{item.text}</ListItemText>
                          </ListItem>
                      ))}
                    </List>
                    <Divider />
                    <List>
                        {[{text: 'Settings',link: '/settings'},{text: 'Feedback',link: '/feedback'}].map((item, index) => (
                        <ListItem button key={item.text} component={Link} to={item.link}>
                            <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <FeedbackIcon />}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={this.onLogout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>                  
                    </Drawer>
                  </MuiThemeProvider>
              </div>    
            );   
          }
          else
            return null; 
        }
    }
}
  
export default withStyles(styles, { withTheme: true })(MyHeader);
