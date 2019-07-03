import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from "@material-ui/core/MenuItem"
import { getUserListByPermission } from "../libs/User";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import PermissionLevel from '../libs/PermissionLevel'
import Checkbox from '@material-ui/core/Checkbox'


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

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

let i=1,x=[0]
for(i=1;i<7;i++){
  x[i-1]=i
}

const permission = [
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
      label: 'Organization admin',
    },
    {
      value: PermissionLevel.SUPER_ADMIN,
      label: 'Super admin',
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
class MAttendance extends Component  {
  constructor(props){
    super(props)
    this.state = {
      staff: [],
      searchResult: [],
      page: 0,
      rowsPerPage:5,
      search : '',
      open: false,
      openMenu: false,
      staffLevelList: [200,250,300,320,350,400,450,500],
      anchor: null
    }
  }

  state = {
      checkedA: true,
      checkedB: true,
    };

  componentDidMount() { 
    getUserListByPermission(this.state.staffLevelList).then((staff) => {
      this.setState ({
        staff
      })
    })}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
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

  clickStaff = (e) => {
    this.setState({openMenu: true, anchor: e.currentTarget});
  }
  closeStaff = () => {
    this.setState({openMenu: false, anchor: null});
  }

  BtnClick = () => {
    if(this.state.search !== ""){
        let searchResult = this.state.staff.filter((item) => {
        return item.data.name.toLowerCase() === this.state.search.toLowerCase();
      });
      if (!searchResult || searchResult.length === 0){
        this.setState({searchResult: this.state.staff, open: true, search:''});        
      }
      else{
        this.setState({searchResult, search:''})
      }
      this.setState({searchResult});
    }
    else
    {
      this.setState({searchResult: this.state.staff});
    }
  }

  clickUser = (e) => {
    this.setState({openMenu: true, anchor: e.currentTarget});
  }
  closeUser = () => {
    this.setState({openMenu: false, anchor: null});
    getUserListByPermission(this.state.staffLevelList).then((staff) => {
      this.setState({staff});
    })
  }

  updateList = (staffLevel) => {
    let {staffLevelList} = this.state
    if(this.state.staffLevelList.includes(staffLevel))
      {
        staffLevelList = staffLevelList.filter(item => item!==staffLevel)
      }
    else
      {
        staffLevelList.push(staffLevel)
      }
    this.setState ({staffLevelList})
  }

  render(){
    const { classes } = this.props;
    const { staff, rowsPerPage, page, searchResult } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, staff.length - page * rowsPerPage);
    let staffList = (searchResult.length > 0 ? searchResult : staff);

    return (
      <div id="msurface" className="surface">
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
        <Card className={classes.card} style={{paddingTop: 50}}>
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        <Typography 
                          variant="h5" 
                          component="h3" 
                          style={{paddingLeft:30}}
                        >
                            Staff Attendance
                        </Typography>
                        <br/>
                    </Grid>

                    <Grid item xs={3}>
                      <Paper style={{width:'100%'}}>
                        <InputBase 
                          className={classes.input} 
                          value={this.state.search}
                          placeholder="Search Staff..."
                          onChange={(e) => {this.setState({search: e.target.value})}}
                        />
                        <IconButton 
                          className={classes.iconButton} 
                          aria-label="Search" 
                          onClick={this.BtnClick} 
                          style={{marginLeft:20}}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                    </Grid>

                    <Grid item xs={2}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}  
                        onClick={this.clickStaff}
                      >
                        Staff's level
                      </Button>
                      <StyledMenu
                        anchorEl={this.state.anchor}
                        keepMounted
                        open={this.state.openMenu}
                        onClose={this.closeUser}
                      >
                        {permission.map(option => (
                          <StyledMenuItem>
                              <Checkbox
                                checked={this.state.staffLevelList.includes(option.value)}
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
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.root} style={{width:"96%",marginLeft:19}}>
                          <Table className={classes.table}>
                              <TableBody>
                                  <TableRow>
                                      <TableCell align="center" style={{width:"10%"}}>No.</TableCell>
                                      <TableCell align="center" >Name</TableCell>
                                      {x.map((item)=>
                                          <TableCell align="center" style={{width:"12%"}}>{item}-July</TableCell>
                                      )}
                                  </TableRow>
                                      {staffList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index)=>
                                        <TableRow>
                                          <TableCell align="center" style={{width:"10%"}}>{page*5+index+1}</TableCell>
                                          <TableCell align="center" >{item.data.name}</TableCell>
                                          {x.map((option)=>
                                            <TableCell>
                                              <Switch
                                                checked={this.state.checkedB}   
                                                onChange={this.handleChange('checkedB')}
                                                value={this.state.checkedB}
                                                color="primary"
                                              /> 
                                            </TableCell>
                                          )}
                                        </TableRow>
                                      )}
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
                                    count={staff.length}
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

