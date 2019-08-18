import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { getUserListByPermission } from '../libs/User';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArchiveIcon from '@material-ui/icons/Archive';
import BookIcon from '@material-ui/icons/Book';
import { Tooltip } from '@material-ui/core';
import { setUserArchive } from '../libs/User'
import {Menu, MenuItem} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import PermissionLevel from '../libs/PermissionLevel';

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

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
    // height: window.innerHeight
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

const permission = [
  {
    value: PermissionLevel.GUEST,
    label: 'Guest',
  },
  {
    value: PermissionLevel.STUDENTS,
    label: 'Students',
  },
  {
    value: PermissionLevel.PARENTS,
    label: 'Parents',
  },
  {
    value: PermissionLevel.TEACHER,
    label: 'Teacher',
  },
  {
    value: PermissionLevel.OPERATOR,
    label: 'Operator',
  },
  {
    value: PermissionLevel.COORDINATOR,
    label: 'Coordinator',
  },
  {
    value: PermissionLevel.FINANCE,
    label: 'Finance',
  },
  {
    value: PermissionLevel.BRANCH_ADMIN,
    label: 'Branch Admin',
  },
  {
    value: PermissionLevel.ORGANIZATION_ADMIN,
    label: 'Organization Admin',
  },
  {
    value: PermissionLevel.SUPER_ADMIN,
    label: 'Super Admin',
  },
];
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
class MUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      searchResult: [],
      page: 0,
      rowsPerPage:5,
      search : '',
      open: false,
      archive: false,
      openMenu: false,
      userLevelList: [100],
      anchor: null
    };
  }

  componentDidMount() {
    let permissionList = this.state.userLevelList;
    if (this.props.permission)
    {
      if (Array.isArray(this.props.permission))
        permissionList = this.props.permission;
      else
        permissionList = [this.props.permission];
      this.setState({userLevelList: permissionList});
    }
    getUserListByPermission(permissionList).then((user)  => {
      // console.log(user_list);
      this.setState({
        user
      })
    });
  }
  
  handleArchive = (item) => {
    setUserArchive(
      item.id,
      !item.data.archive
    )
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clickUser = (e) => {
    this.setState({openMenu: true, anchor: e.currentTarget});
  }
  closeUser = () => {
    this.setState({openMenu: false, anchor: null});
    getUserListByPermission(this.state.userLevelList).then((user) => {
      this.setState({user});
    })
  }

  BtnClick = () => {
    if(this.state.search !== ""){
        let searchResult = this.state.user.filter((item) => {
        return item.data.name.toLowerCase() === this.state.search.toLowerCase();
      });
      if (!searchResult || searchResult.length === 0){
        this.setState({searchResult: this.state.user, open: true, search:''});        
      }
      else{
        this.setState({searchResult, search:''})
      }
      this.setState({searchResult});
    }
    else
    {
      this.setState({searchResult: this.state.user});
    }
  }

  updateList = (userLevel) => {
    let {userLevelList} = this.state;
    if (userLevelList.includes(userLevel))
    {
      // Remove for array if already checked
      // Using array.filter
      userLevelList = userLevelList.filter(item => item !== userLevel);
    }
    else
    {
      userLevelList.push(userLevel);      
    }
    this.setState({userLevelList});
  }

	getRole = (level) => {
		let role = permission.filter((item) => item.value === level);
		if (role && role.length > 0)
		{
			return role[0].label;
		}
		return 'Unknown';
  }

	render() {
    const { classes } = this.props;
    const { user, rowsPerPage, page, searchResult } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, user.length - page * rowsPerPage);
    let userList = (searchResult.length > 0 ? searchResult : user);
    let title = ( this.props.title ? this.props.title : "Users");
    return (
      <div>
        <div>
         <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">NOT FOUND!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Try to search again..
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      <div id="msurface">
        <Card className={classes.card} style={{paddingTop: '10px',paddingBottom: 50}}>
          <CardContent>
            <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '20px'}}>
              <Grid container spacing={24}>
                <Grid item xs={5}>
                  <Typography variant="h5" component="h3">{title}</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Paper style={{width:'100%'}}>
                    <InputBase 
                      className={classes.input} 
                      value={this.state.search}
                      placeholder={"Search " + title + " ..."}
                      onChange={(e) => {this.setState({search: e.target.value})}}
                    />
                    <IconButton 
                      className={classes.iconButton} 
                      aria-label="Search" 
                      onClick={this.BtnClick} 
                      style={{marginLeft:12}}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item xs={4} >
                {
                  this.props.permission ? null : (
                   
                      <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}  
                        onClick={this.clickUser}
                        style={{marginLeft:100,marginRight:10}}                 
                      >
                        Role Filter
                      </Button>
                    
                  )}
                  <StyledMenu
                    anchorEl={this.state.anchor}
                    keepMounted
                    open={this.state.openMenu}
                    onClose={this.closeUser}
                  >
                    {permission.map(option => (
                      <StyledMenuItem>
                          <Checkbox
                            checked={this.state.userLevelList.includes(option.value)}
                            onChange={()=>this.updateList(option.value)}
                            key={option.value}
                            color="primary"
                            inputProps={{
                              'aria-label': option.label,
                            }}
                          />
                          {option.label}
                      </StyledMenuItem>
                    ))}
                  </StyledMenu>
            
                  {this.props.permission ? 
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    style={{marginLeft:200}} 
                    className={classes.button} 
                    component={Link} to="addusers">
                  {"+ " + title }
                  </Button>
                  :
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button} 
                    component={Link} to="addusers">
                  {"+ " + title }
                  </Button>
                  }
                  
                </Grid>
              </Grid>
            </div>
  
            <Paper className={classes.root}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >Name</TableCell>
                    <TableCell align="center" >Email</TableCell>
                    <TableCell align="center" >Role</TableCell>                    
                    <TableCell align="center" >Phone Number</TableCell>
                    <TableCell align="center" style={{width:"18%"}} >Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                    <TableRow key={item.data.email}>
                      <CustomTableCell align="center" >{item.data.name}</CustomTableCell>
                      <CustomTableCell align="center" >{item.data.email}</CustomTableCell>
                      <CustomTableCell align="center" >{this.getRole(item.data.permission)}</CustomTableCell>
                      <CustomTableCell align="center" >{item.data.phone}</CustomTableCell>
                      <CustomTableCell align="center">
                        <div>
                        <Tooltip title='view'>
                          <IconButton aria-label="Delete" className={classes.margin} component={Link} to={"viewuser/" + item.id}>
                            <VisibilityIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                          <Tooltip title='archive'>
                            <IconButton aria-label="Delete" className={classes.margin} onClick={()=>this.handleArchive(item)}>
                              <ArchiveIcon className={classes.icon} />
                            </IconButton>
                          </Tooltip>
                        <Tooltip title='lesson'>
                          <IconButton aria-label="Delete" className={classes.margin} component={Link} to={"studentschedule/" }>
                            <BookIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                        </div>
                        </CustomTableCell>
                    </TableRow>
                  ))
                  }
                  {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10]}
                      colSpan={9}
                      count={user.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      ActionsComponent={TablePaginationActionsWrapped}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

}

MUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MUsers);