import React, {Component} from 'react';
import '../Projj.css';
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
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SettingsIcon from '@material-ui/icons/Settings';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


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

    const gtheme = createMuiTheme({
      palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
      },
      typography: { useNextVariants: true },
    });

class MyHeader extends React.Component {

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
                <MuiThemeProvider theme={theme}>
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
                    <Typography variant="h6" color="inherit" noWrap component={ Link } to='/' id="title">
                    STEAM LAB
                    </Typography>
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
                  {[{text: 'Users',icon: <PersonIcon />,link: '/users'},{text: 'Teacher',icon: <GroupIcon />,link: '/teacher'},{text: 'Courses',icon: <AssignmentIcon />,link: '/courses'},{text: 'Attendence',icon: <BarChartIcon />,link: '/attendence'},
                  {text: 'Payment',icon: <AttachMoneyIcon />,link: '/payment'}].map((item, index) => (
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
                </Drawer>
              </MuiThemeProvider>
          </div>    
        );
    }
}

// PersistentDrawerLeft.propTypes = {
//     classes: PropTypes.object.isRequired,
//     theme: PropTypes.object.isRequired,
//   };
  
export default withStyles(styles, { withTheme: true })(MyHeader);